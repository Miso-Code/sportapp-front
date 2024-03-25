import 'react-native'
import React from 'react'
import App from '@/App'

import renderer, { ReactTestRenderer } from 'react-test-renderer'

describe('<App />', () => {
	let wrapper: ReactTestRenderer

	beforeEach(() => {
		wrapper = renderer.create(<App />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})
})
