import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'

import Premium from '..'

jest.mock('expo-router')

describe('Premium', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Premium />)
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

		expect(router.push).toHaveBeenCalledWith('premium/createAppointment')
		expect(router.push).toHaveBeenCalledWith('premium/appointments')
	})
})
