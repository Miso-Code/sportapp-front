import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import EventCard from '../EventCard'

jest.mock('dayjs')

describe('EventCard', () => {
	let component: ReactTestRenderer
	let spy: jest.SpyInstance

	beforeEach(() => {
		const mockedDate = new Date(1996, 6, 19)

		spy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)
		component = renderer.create(
			<EventCard
				date={new Date().toISOString()}
				title='title'
				description='description'
			/>
		)
	})

	afterEach(() => {
		spy.mockRestore()
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
			<EventCard
				date={future.toISOString()}
				title='title'
				description='description'
			/>
		)

		expect(
			component.root.findByProps({ testID: 'chip' }).props.children
		).toBe('training.today')
	})
})
