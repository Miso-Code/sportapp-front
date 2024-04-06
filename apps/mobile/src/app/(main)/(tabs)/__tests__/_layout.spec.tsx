import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import TabLayout from '../_layout'
jest.mock('expo-router')

describe('TabLayout', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<TabLayout />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})
})
