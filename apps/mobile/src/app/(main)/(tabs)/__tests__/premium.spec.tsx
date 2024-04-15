import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import Premium from '../premium'

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
})
