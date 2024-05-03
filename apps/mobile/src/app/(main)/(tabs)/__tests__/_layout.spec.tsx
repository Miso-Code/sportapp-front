import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import TabLayout from '../_layout'
import { Tabs, useSegments } from 'expo-router'
import { useUserStore } from '@sportapp/stores'
import { ESubscription } from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'
jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn()
}))

describe('TabLayout', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.PREMIUM
				}
			},
			getProfile: jest.fn()
		})

		component = renderer.create(<TabLayout />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should not show header on segments length gte 3', () => {
		;(useSegments as jest.Mock).mockReturnValue([
			{ title: 1 },
			{ title: 2 },
			{ title: 3 },
			{ title: 4 }
		])
		act(() => {
			component.update(<TabLayout />)
		})
		const headers = component.root.findAllByProps({ testID: 'header' })
		expect(headers).toHaveLength(0)
	})

	it('should show header on segments length lte 3', () => {
		;(useSegments as jest.Mock).mockReturnValue([
			{ title: 1 },
			{ title: 2 }
		])
		act(() => {
			component.update(<TabLayout />)
		})
		const header = component.root.findByProps({ testID: 'header' }) // This is mocked, see apps/mobile/src/config/test/__mocks__/expo-router/index.tsx
		expect(header).toBeTruthy()
	})

	it('should not show the premium tab when user is not premium', () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.FREE
				}
			},
			getProfile: jest.fn()
		})
		act(() => {
			component.update(<TabLayout />)
		})
		const [premiumTab] = component.root
			.findAllByType(Tabs.Screen)
			.filter((tab) => tab.props.name === 'premium')
		expect(premiumTab.props.options.href).toBeNull()
	})
})
