import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import AppLayout from '../_layout'
jest.mock('expo-router/stack')

describe('AppLayout', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<AppLayout />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})
})
