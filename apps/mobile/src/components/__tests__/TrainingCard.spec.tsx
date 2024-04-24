import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import TrainingCard from '../TrainingCard'

jest.mock('dayjs')

describe('TrainingCard', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<TrainingCard
				date={new Date()}
				trainingSession={{
					training_plan_session_id: '1',
					weekday: 'monday',
					start_time: '10:00 AM',
					warm_up: 0.35,
					cardio: 0.7,
					strength: 0.525,
					cool_down: 0.175,
					user_id: '1'
				}}
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
				trainingSession={{
					training_plan_session_id: '1',
					weekday: 'monday',
					start_time: '10:00 AM',
					warm_up: 0.35,
					cardio: 0.7,
					strength: 0.525,
					cool_down: 0.175,
					user_id: '1'
				}}
				date={future}
			/>
		)

		expect(
			component.root.findByProps({ testID: 'chip' }).props.children
		).toBe('training.upcoming')
	})
})
