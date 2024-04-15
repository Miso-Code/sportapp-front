import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

jest.mock('expo-router')
jest.mock('react-native-paper', () => ({
	...jest.requireActual('react-native-paper'),
	Provider: jest.fn(({ children }) => children)
}))

import DefaultLayout from '../_layout'

describe('DefaultLayout', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<DefaultLayout />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})
})
