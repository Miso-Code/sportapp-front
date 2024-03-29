import React from 'react'
import TestComponent from '@components/TestComponent'

import renderer, { ReactTestRenderer } from 'react-test-renderer'

describe('TestComponent', () => {
	let wrapper: ReactTestRenderer

	beforeEach(() => {
		wrapper = renderer.create(<TestComponent />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
