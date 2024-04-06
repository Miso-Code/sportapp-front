import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import Training from '../training'

describe('Training', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Training />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})
})
