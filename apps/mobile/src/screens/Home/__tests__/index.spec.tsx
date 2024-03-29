import React from 'react'
import Home from '@/screens/Home'

import renderer, { ReactTestRenderer } from 'react-test-renderer'

describe('Home', () => {
	let wrapper: ReactTestRenderer

	beforeEach(() => {
		wrapper = renderer.create(<Home />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
