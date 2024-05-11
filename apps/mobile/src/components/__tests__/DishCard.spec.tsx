import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import DishCard from '../DishCard'

jest.mock('dayjs')

describe('DishCard', () => {
	let component: ReactTestRenderer
	beforeEach(() => {
		component = renderer.create(
			<DishCard
				title='title'
				weekday='monday'
				category='category'
				calories={100}
				protein={100}
				carbs={100}
				fats={100}
			/>
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})
})
