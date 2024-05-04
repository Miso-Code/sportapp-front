import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'

import CreateAppointment from '../createAppointment'

jest.mock('expo-router')

describe('CreateAppointment', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<CreateAppointment />)
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

		expect(router.push).toHaveBeenCalledWith(
			'premium/createVirtualAppointment'
		)
		expect(router.push).toHaveBeenCalledWith(
			'premium/createInPersonAppointment'
		)
	})
})
