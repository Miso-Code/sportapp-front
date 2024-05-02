import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'

import Profile from '..'
import { Avatar } from 'react-native-paper'
import { useUserStore } from '@sportapp/stores'

jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn()
}))

describe('Profile', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.clearAllMocks()
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					first_name: 'John',
					last_name: 'Doe'
				}
			}
		})
		component = renderer.create(<Profile />)
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
			act(() => listItem.props.onPress?.())
		}

		expect(router.navigate).toHaveBeenCalledWith('profile/personalProfile')
		expect(router.navigate).toHaveBeenCalledWith('profile/sportsProfile')
		expect(router.navigate).toHaveBeenCalledWith(
			'profile/nutritionalProfile'
		)
		expect(router.navigate).toHaveBeenCalledWith('profile/settings')
	})

	it('should render user avatar', () => {
		const avatar = component.root.findByType(Avatar.Text)
		expect(avatar.props.label).toBe('JD')
	})

	it('should not render user avatar when user is undefined', () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: undefined
		})
		act(() => component.update(<Profile />))
		const avatars = component.root.findAllByType(Avatar.Text)
		expect(avatars.length).toBe(0)
	})
})
