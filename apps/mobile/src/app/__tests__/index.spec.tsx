import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import Index from '../index'

jest.mock('expo-router', () => ({
	router: {
		navigate: jest.fn()
	},
	useRootNavigationState: jest.fn().mockReturnValue({ key: 'key' })
}))

describe('Index', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Index />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a progress indicator', () => {
		expect(
			component.root.findByProps({ testID: 'progressBar' })
		).toBeTruthy()
	})
})
