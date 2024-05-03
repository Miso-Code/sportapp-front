import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import { router } from 'expo-router'

import TrainingLayout from '../_layout'
jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn()
}))

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

	it('should render 5 components with header', () => {
		const header = component.root.findAllByProps({ testID: 'header' })
		expect(header.length).toBe(10) // react native makes it two per instance
	})

	it('should navigate back on back button press', () => {
		const [back] = component.root.findAllByProps({ testID: 'back' })
		back.props.onPress()
		expect(router.back).toHaveBeenCalled()
	})
})
