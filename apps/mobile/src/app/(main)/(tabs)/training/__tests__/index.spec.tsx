import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'

import Training from '..'
import { useUserStore } from '@sportapp/stores'
import { ESubscription } from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'

jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn()
}))

describe('Training', () => {
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
		component = renderer.create(<Training />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call router.push when list item is pressed and item has onPress', () => {
		const listItems = component.root.findAllByProps({ testID: 'list-item' })

		for (const listItem of listItems) {
			listItem.props.onPress?.()
		}

		expect(router.push).toHaveBeenCalledWith('training/sportSession')
		expect(router.push).toHaveBeenCalledWith('training/sportSessionHistory')
		expect(router.push).toHaveBeenCalledWith('training/servicesAndProducts')
	})

	it('should not render preferentials list item when user is not premium', () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.FREE
				}
			},
			getProfile: jest.fn()
		})
		act(() => component.update(<Training />))
		const listItems = component.root.findAllByProps({ testID: 'list-item' })

		const preferentialsItem = listItems.find(
			(item) => item.props.title === 'training.preferentials'
		)

		expect(preferentialsItem).toBeUndefined()
	})
})
