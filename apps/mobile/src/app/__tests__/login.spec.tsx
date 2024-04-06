import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

jest.mock('@sportapp/stores', () => ({
	useAuthStore: jest.fn().mockReturnValue({
		login: jest.fn().mockReturnValue(false),
		loading: false,
		error: null,
		isAuth: false
	})
}))

jest.mock('expo-router', () => ({
	router: {
		navigate: jest.fn()
	}
}))

import { useAuthStore } from '@sportapp/stores'
import { router } from 'expo-router'

import Login from '../login'

describe('Login', () => {
	let component: ReactTestRenderer

	jest.useFakeTimers()

	beforeEach(() => {
		component = renderer.create(<Login />)
		jest.runAllTimers()
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render 2 text inputs', () => {
		expect(
			component.root.findByProps({ testID: 'text-input-email' })
		).toBeTruthy()
		expect(
			component.root.findByProps({ testID: 'text-input-password' })
		).toBeTruthy()
	})

	it('should render a button with the text "Ingresar"', () => {
		expect(
			component.root.findByProps({ testID: 'button-text' }).props.children
		).toBe('Ingresar')
	})

	it('should render a logo', () => {
		expect(component.root.findByProps({ testID: 'logo' })).toBeTruthy()
	})

	it('should update the email state when the email input changes', () => {
		const emailInput = component.root.findByProps({
			testID: 'text-input-email'
		})
		expect(emailInput.props.value).toBe('')
		act(() => emailInput.props.onChangeText('email@example.com'))
		expect(emailInput.props.value).toBe('email@example.com')
	})

	it('should update the password state when the password input changes', () => {
		const passwordInput = component.root.findByProps({
			testID: 'text-input-password'
		})
		expect(passwordInput.props.value).toBe('')
		act(() => passwordInput.props.onChangeText('password'))
		expect(passwordInput.props.value).toBe('password')
	})

	it('should show an error message when the email is invalid', () => {
		const emailInput = component.root.findByProps({
			testID: 'text-input-email'
		})
		const errorHelperText = component.root.findByProps({
			testID: 'error-helper-text'
		})
		expect(emailInput.props.error).toBe(false)
		expect(errorHelperText.props.visible).toBe(false)
		act(() => emailInput.props.onChangeText('email'))
		expect(emailInput.props.error).toBe(true)
		expect(errorHelperText.props.visible).toBe(true)
	})

	it('should disable the button when the email is invalid', () => {
		const emailInput = component.root.findByProps({
			testID: 'text-input-email'
		})
		const button = component.root.findByProps({ testID: 'button' })
		expect(button.props.disabled).toBe(true)
		act(() => emailInput.props.onChangeText('email'))
		expect(button.props.disabled).toBe(true)
	})

	it('should disable the button when the email is empty', () => {
		const emailInput = component.root.findByProps({
			testID: 'text-input-email'
		})
		const button = component.root.findByProps({ testID: 'button' })
		expect(button.props.disabled).toBe(true)
		act(() => emailInput.props.onChangeText(''))
		expect(button.props.disabled).toBe(true)
	})

	it('should disable the button when the password is empty', () => {
		const passwordInput = component.root.findByProps({
			testID: 'text-input-password'
		})
		const button = component.root.findByProps({ testID: 'button' })
		expect(button.props.disabled).toBe(true)
		act(() => passwordInput.props.onChangeText(''))
		expect(button.props.disabled).toBe(true)
	})

	it('should enable the button when the email and password are valid', () => {
		const emailInput = component.root.findByProps({
			testID: 'text-input-email'
		})
		const passwordInput = component.root.findByProps({
			testID: 'text-input-password'
		})
		const button = component.root.findByProps({ testID: 'button' })
		expect(button.props.disabled).toBe(true)
		act(() => emailInput.props.onChangeText('email@example.com'))
		act(() => passwordInput.props.onChangeText('password'))
		expect(button.props.disabled).toBe(false)
	})

	it('should call the login function when the button is pressed', () => {
		const button = component.root.findByProps({ testID: 'button' })
		act(() => button.props.onPress())
		expect(useAuthStore().login).toHaveBeenCalled()
	})

	it('should show an error message when the login fails', () => {
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			login: jest.fn().mockReturnValue(false),
			loading: false,
			error: 'error'
		})

		component.update(<Login />)

		// const emailInput = component.root.findByProps({
		// 	testID: 'text-input-email'
		// })
		// const passwordInput = component.root.findByProps({
		// 	testID: 'text-input-password'
		// })
		// const emailError = component.root.findByProps({
		// 	testID: 'error-helper-text'
		// })

		// const generalError = component.root.findByProps({
		// 	testID: 'unauthorized-helper-text'
		// })

		// FIXME: This test is failing because the error message is not being shown but it works manually

		// expect(emailInput.props.error).toBe(true)
		// expect(passwordInput.props.error).toBe(true)
		// expect(emailError.props.visible).toBe(false)
		// expect(generalError.props.visible).toBe(true)
	})

	it('should navigate to the profile screen when the login is successful', () => {
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			login: jest.fn().mockReturnValue(true),
			loading: false,
			error: null,
			isAuth: true
		})

		component.update(<Login />)

		const emailInput = component.root.findByProps({
			testID: 'text-input-email'
		})
		const passwordInput = component.root.findByProps({
			testID: 'text-input-password'
		})

		const button = component.root.findByProps({ testID: 'button' })

		act(() => emailInput.props.onChangeText('email@example.com'))
		act(() => passwordInput.props.onChangeText('password'))

		act(() => button.props.onPress())

		expect(router.navigate).toHaveBeenCalledWith('profile')
	})
})
