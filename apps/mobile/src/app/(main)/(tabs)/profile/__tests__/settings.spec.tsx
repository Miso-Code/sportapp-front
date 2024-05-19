import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import Settings from '../settings'
import { router } from 'expo-router'
import { useAuthStore, useUserStore } from '@sportapp/stores'
import { List } from 'react-native-paper'

jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useAuthStore: jest.fn(),
	useUserStore: jest.fn()
}))

describe('Settings', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.clearAllMocks()
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			logout: jest.fn(),
			clearState: jest.fn()
		})
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			clearState: jest.fn()
		})
		component = renderer.create(<Settings />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render 2 setting options', () => {
		const listItems = component.root.findAllByType(List.Item)
		expect(listItems).toHaveLength(2)
	})

	it('should go to language settings on language setting press', () => {
		const [languageSetting] = component.root.findAllByType(List.Item)
		act(() => languageSetting.props.onPress())
		expect(router.push).toHaveBeenCalledWith('profile/language')
	})

	it('should call logout on logout press', () => {
		const [, logoutSetting] = component.root.findAllByType(List.Item)
		act(() => logoutSetting.props.onPress())
		expect(useAuthStore().logout).toHaveBeenCalled()
	})

	it('should redirect to login on logout press', () => {
		const [, logoutSetting] = component.root.findAllByType(List.Item)
		act(() => logoutSetting.props.onPress())
		expect(router.push).toHaveBeenCalledWith('login')
	})

	it('should clear auth and user state on logout press', () => {
		const [, logoutSetting] = component.root.findAllByType(List.Item)
		act(() => logoutSetting.props.onPress())
		expect(useAuthStore().clearState).toHaveBeenCalled()
		expect(useUserStore().clearState).toHaveBeenCalled()
	})
})
