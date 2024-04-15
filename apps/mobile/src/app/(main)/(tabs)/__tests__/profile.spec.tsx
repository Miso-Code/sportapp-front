import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import Profile from '../profile'

describe('Profile', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Profile />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})
})
