import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import TrainingCard from '../TrainingCard'

jest.mock('dayjs')

describe('TrainingCard', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<TrainingCard
				title='Test'
				description='Test description'
				date={new Date()}
			/>
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render today chip', () => {
		expect(
			component.root.findByProps({ testID: 'chip' }).props.children
		).toBe('training.today')
	})

	it('should change the chip on a future date', () => {
		const future = new Date()
		future.setFullYear(future.getFullYear() + 1)
		component.update(
			<TrainingCard
				title='Test'
				description='Test description'
				date={future}
			/>
		)

		expect(
			component.root.findByProps({ testID: 'chip' }).props.children
		).toBe('training.upcoming')
	})
})
