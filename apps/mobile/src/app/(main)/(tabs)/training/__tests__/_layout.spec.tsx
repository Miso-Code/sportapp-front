import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import { router } from 'expo-router'

import TrainingLayout from '../_layout'
jest.mock('expo-router')

describe('TrainingLayout', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<TrainingLayout />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a header', () => {
		const header = component.root.findByProps({ testID: 'header' })
		expect(header).toBeTruthy()
	})

	it('should navigate back on back button press', () => {
		const back = component.root.findByProps({ testID: 'back' })
		back.props.onPress()
		expect(router.back).toHaveBeenCalled()
	})
})
