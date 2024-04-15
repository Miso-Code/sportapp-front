import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import Notifications from '../notifications'

describe('Notifications', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Notifications />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})
})
