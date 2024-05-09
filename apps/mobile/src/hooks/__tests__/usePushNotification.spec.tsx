import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'
import { Button, Text, View, Platform } from 'react-native'

import { usePushNotification } from '../usePushNotifications'

import messaging from '@react-native-firebase/messaging'
import { useAlertStore } from '@sportapp/stores'

jest.mock('@react-native-firebase/messaging', () => {
	const mockMessaging = jest.fn().mockReturnValue({
		requestPermission: jest.fn(),
		getToken: jest.fn(),
		onMessage: jest.fn(),
		setBackgroundMessageHandler: jest.fn(),
		onNotificationOpenedApp: jest.fn(),
		getInitialNotification: jest.fn()
	})

	;(mockMessaging as any).AuthorizationStatus = {
		NOT_DETERMINED: -1,
		DENIED: 0,
		AUTHORIZED: 1,
		PROVISIONAL: 2,
		EPHEMERAL: 3
	}

	return {
		__esModule: true,
		default: mockMessaging
	}
})

jest.mock('react-native', () => {
	const permissions = jest.requireActual('react-native').PermissionsAndroid

	permissions.request = jest.fn().mockReturnValue(permissions.RESULTS.GRANTED)

	const text = jest.requireActual('react-native').Text
	const view = jest.requireActual('react-native').View
	const button = jest.requireActual('react-native').Button
	return {
		PermissionsAndroid: permissions,
		Platform: {
			...jest.requireActual('react-native').Platform,
			OS: 'android'
		},
		Text: text,
		View: view,
		Button: button
	}
})

jest.mock('@sportapp/stores', () => ({
	useAlertStore: jest.fn().mockReturnValue({
		addHiddenAlertToHistory: jest.fn()
	})
}))

describe('usePushNotifications', () => {
	let component: ReactTestRenderer
	let callback = jest.fn()

	const TestComponent = () => {
		const { isPermissionsGranted, subscribe, getToken } =
			usePushNotification()
		return (
			<View>
				<Text>
					{isPermissionsGranted
						? 'Permissions Granted'
						: 'Permissions Denied'}
				</Text>
				<Button title='Subscribe' onPress={() => subscribe(callback)} />
				<Button title='Get Token' onPress={() => getToken()} />
			</View>
		)
	}

	beforeEach(async () => {
		Platform.OS = 'android'
		act(() => {
			component = create(<TestComponent />)
		})

		// Wait for the async effects to complete
		await act(async () => {
			await Promise.resolve()
		})
	})

	afterEach(() => {
		component.unmount()
	})

	it('should be false by default', () => {
		const [text] = component.root.findAllByType(Text)
		expect(text.props.children).toBe('Permissions Denied')
	})

	it('should request permissions on getToken', async () => {
		const [, button] = component.root.findAllByType(Button)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		const [text] = component.root.findAllByType(Text)
		expect(text.props.children).toBe('Permissions Granted')
	})

	it('should setup notification listeners on subscribe', async () => {
		const [button] = component.root.findAllByType(Button)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		expect(messaging().onMessage).toHaveBeenCalled()
		expect(messaging().setBackgroundMessageHandler).toHaveBeenCalled()
		expect(messaging().onNotificationOpenedApp).toHaveBeenCalled()
		expect(messaging().getInitialNotification).toHaveBeenCalled()
	})

	it('should call the callback on message', async () => {
		const [button] = component.root.findAllByType(Button)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		const message = {
			notification: {
				title: 'Test',
				body: 'Test'
			},
			data: {
				priority: 'warning'
			}
		}

		const onMessage = (messaging().onMessage as jest.Mock).mock.calls[0][0]
		const onBackgroundMessage = (
			messaging().setBackgroundMessageHandler as jest.Mock
		).mock.calls[0][0]
		const onNotificationOpened = (
			messaging().onNotificationOpenedApp as jest.Mock
		).mock.calls[0][0]
		const onInitialNotification = (
			messaging().getInitialNotification as jest.Mock
		).mockReturnValue(message)

		await act(async () => {
			onMessage(message)
			onBackgroundMessage(message)
			onNotificationOpened(message)
			onInitialNotification()
			await Promise.resolve()
		})

		expect(callback).toHaveBeenCalledWith('Test', 'Test', 'warning')
	})

	it('should call the callback on message info', async () => {
		const [button] = component.root.findAllByType(Button)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		const message = {
			notification: {
				title: 'Test',
				body: 'Test'
			},
			data: {
				priority: 'info'
			}
		}

		const onMessage = (messaging().onMessage as jest.Mock).mock.calls[0][0]
		const onBackgroundMessage = (
			messaging().setBackgroundMessageHandler as jest.Mock
		).mock.calls[0][0]
		const onNotificationOpened = (
			messaging().onNotificationOpenedApp as jest.Mock
		).mock.calls[0][0]
		;(messaging().getInitialNotification as jest.Mock).mockReturnValue(
			message
		)

		await act(async () => {
			onMessage(message)
			onBackgroundMessage(message)
			onNotificationOpened(message)
			await Promise.resolve()
		})

		expect(callback).toHaveBeenCalledWith('Test', 'Test', 'info')
		expect(useAlertStore().addHiddenAlertToHistory).toHaveBeenCalledTimes(5)
		expect(useAlertStore().addHiddenAlertToHistory).toHaveBeenCalledWith({
			type: 'info',
			message: 'Test: Test'
		})
	})

	it('should request permissions on ios', async () => {
		Platform.OS = 'ios'
		;(messaging().requestPermission as jest.Mock).mockReturnValue(
			messaging.AuthorizationStatus.AUTHORIZED
		)

		act(() => {
			component.update(<TestComponent />)
		})

		await act(async () => {
			await Promise.resolve()
		})

		const [, button] = component.root.findAllByType(Button)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		const [text] = component.root.findAllByType(Text)
		expect(text.props.children).toBe('Permissions Granted')
	})

	it('should request permissions on ios provisional', async () => {
		Platform.OS = 'ios'
		;(messaging().requestPermission as jest.Mock).mockReturnValue(
			messaging.AuthorizationStatus.PROVISIONAL
		)

		act(() => {
			component.update(<TestComponent />)
		})

		await act(async () => {
			await Promise.resolve()
		})

		const [, button] = component.root.findAllByType(Button)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		const [text] = component.root.findAllByType(Text)
		expect(text.props.children).toBe('Permissions Granted')
	})
})
