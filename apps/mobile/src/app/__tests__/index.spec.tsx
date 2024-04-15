import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'
import { useAuthStore } from '@sportapp/stores'

import Index from '../index'

jest.mock('expo-router')
jest.mock('@sportapp/stores', () => ({
	useAuthStore: jest.fn().mockReturnValue({ isAuth: true })
}))

jest.mock('@sportapp/stores', () => ({
	useAuthStore: jest.fn().mockReturnValue({ isAuth: true })
}))

describe('Index', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Index />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a progress indicator', () => {
		expect(
			component.root.findByProps({ testID: 'progressBar' })
		).toBeTruthy()
	})

	it('should navigate to profile when user is authenticated', () => {
		expect(router.navigate).toHaveBeenCalledWith('profile')
	})

	it('should navigate to login when user is not authenticated', () => {
		;(useAuthStore as unknown as jest.Mock).mockReturnValueOnce({
			isAuth: false
		})
		act(() => {
			component.update(<Index />)
		})
		expect(router.navigate).toHaveBeenCalledWith('login')
	})
})
