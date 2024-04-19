import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import { useAlertStore } from '@sportapp/stores'

import AppLayout from '../_layout'

jest.mock('expo-router/stack')
jest.mock('react-native-paper', () => ({
	...jest.requireActual('react-native-paper'),
	PaperProvider: jest.fn(({ children }) => children)
}))

jest.mock('@sportapp/stores', () => ({
	useAlertStore: jest.fn(() => ({
		alert: undefined,
		setAlert: jest.fn()
	}))
}))

jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: () => ({
		bottom: 0,
		top: 0,
		right: 0,
		left: 0
	}),
	SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children
}))

describe('AppLayout', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<AppLayout />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render an snackbar on alert', () => {
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			alert: {
				message: 'test',
				type: 'info'
			},
			setAlert: jest.fn()
		})
		component.update(<AppLayout />)
		const [snack] = component.root.findAllByProps({ testID: 'alert' })
		expect(snack).toBeDefined()
	})

	it('should unset alert on snackbar dismiss', () => {
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			alert: {
				message: 'test',
				type: 'info'
			},
			setAlert: jest.fn()
		})
		component.update(<AppLayout />)
		const [snack] = component.root.findAllByProps({ testID: 'alert' })
		snack.props.onDismiss()
		expect(useAlertStore().setAlert).toHaveBeenCalledWith(undefined)
	})

	it('should unset alert on snackbar action', () => {
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			alert: {
				message: 'test',
				type: 'info',
				action: {
					label: 'test',
					onPress: jest.fn()
				}
			},
			setAlert: jest.fn()
		})
		component.update(<AppLayout />)
		const [snack] = component.root.findAllByProps({ testID: 'alert' })
		snack.props.onIconPress()
		expect(useAlertStore().setAlert).toHaveBeenCalledWith(undefined)
	})

	it('should not render an snackbar on no alert', () => {
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			alert: undefined,
			setAlert: jest.fn()
		})
		component.update(<AppLayout />)
		const snack = component.root.findAllByProps({ testID: 'alert' })
		expect(snack).toHaveLength(0)
	})
})
