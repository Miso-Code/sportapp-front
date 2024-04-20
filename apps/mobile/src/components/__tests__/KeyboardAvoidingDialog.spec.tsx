import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { Text } from 'react-native-paper'
import { Keyboard } from 'react-native'

import KeyboardAvoidingDialog from '../KeyboardAvoidingDialog'

jest.mock('react-native-safe-area-context', () => ({
	useSafeAreaInsets: () => ({
		bottom: 0,
		top: 0,
		right: 0,
		left: 0
	}),
	SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children
}))

jest.mock('react-native/Libraries/Utilities/Platform', () => ({
	OS: 'ios',
	select: jest.fn()
}))
jest.mock('react-native/Libraries/Components/Keyboard/Keyboard', () => ({
	addListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
	removeListener: jest.fn()
}))

describe('KeyboardAvoidingDialog', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<KeyboardAvoidingDialog visible={true} onDismiss={jest.fn()}>
				<Text testID='content'>Test</Text>
			</KeyboardAvoidingDialog>
		)
	})

	afterEach(() => {
		component.unmount()
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render content', () => {
		const [content] = component.root.findAllByProps({ testID: 'content' })
		expect(content.props.children).toBe('Test')
	})

	it('should render dialog', () => {
		const dialog = component.root.findByProps({ testID: 'dialog' })
		expect(dialog.props.visible).toBe(true)
	})

	it('should not render content if not visible', () => {
		act(() => {
			component.update(
				<KeyboardAvoidingDialog visible={false} onDismiss={jest.fn()}>
					<Text testID='content'>Test</Text>
				</KeyboardAvoidingDialog>
			)
		})
		const dialogContentWrapper = component.root.findByProps({
			testID: 'dialog-backdrop'
		})
		expect(
			dialogContentWrapper.props.style[1].opacity._animation?._toValue // since this is an animated value we check the destiny value
		).toBe(0)
	})

	it('should update bottom style prop when keyboard is shown', () => {
		const keyboardEvent = {
			startCoordinates: { screenY: 100, height: 100 },
			endCoordinates: {
				screenY: 0,
				height: 100
			}
		}
		act(() => {
			component.update(
				<KeyboardAvoidingDialog visible={true} onDismiss={jest.fn()}>
					<Text testID='content'>Test</Text>
				</KeyboardAvoidingDialog>
			)
		})
		act(() => {
			;(Keyboard.addListener as jest.Mock).mock.calls[0][1](keyboardEvent)
		})
		const dialog = component.root.findByProps({
			testID: 'dialog'
		})
		expect(dialog.props.style.bottom).toBe(50)
	})

	it('should update bottom style prop to 0 when keyboard is hide', () => {
		const keyboardEvent = {
			startCoordinates: { screenY: 0, height: 100 },
			endCoordinates: {
				screenY: 100,
				height: 100
			}
		}
		act(() => {
			component.update(
				<KeyboardAvoidingDialog visible={true} onDismiss={jest.fn()}>
					<Text testID='content'>Test</Text>
				</KeyboardAvoidingDialog>
			)
		})
		act(() => {
			;(Keyboard.addListener as jest.Mock).mock.calls[0][1](keyboardEvent)
		})
		const dialog = component.root.findByProps({
			testID: 'dialog'
		})
		expect(dialog.props.style.bottom).toBe(0)
	})

	it('should remove all listeners on unmount', () => {
		act(() => {
			component.update(
				<KeyboardAvoidingDialog visible={true} onDismiss={jest.fn()}>
					<Text testID='content'>Test</Text>
				</KeyboardAvoidingDialog>
			)
			component.unmount()
		})
		for (const listener of (Keyboard.addListener as jest.Mock).mock
			.results) {
			expect(listener.value.remove).toHaveBeenCalled()
		}
	})
})
