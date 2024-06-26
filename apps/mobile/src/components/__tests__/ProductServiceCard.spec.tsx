import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import ProductServiceCard from '../ProductServiceCard'

jest.mock('dayjs')

describe('ProductServiceCard', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<ProductServiceCard
				title='Test'
				description='Test description'
				price={100}
				priceFrequency='monthly'
				category='Test category'
				image='test.jpg'
			/>
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call onPress', () => {
		const onPress = jest.fn()
		component.update(
			<ProductServiceCard
				onPress={onPress}
				title='Test'
				description='Test description'
				price={100}
				priceFrequency='monthly'
				category='Test category'
				image='test.jpg'
			/>
		)
		component.root.props.onPress()
		expect(onPress).toHaveBeenCalled()
	})
})
