import EventCard from '..'
import { render, RenderResult } from '@testing-library/react'
import { CustomEvent, EventTypes } from '../../../../CustomCalendar/interfaces'

describe('EventCard', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const selectedValue: CustomEvent = {
			type: EventTypes.EVENT,
			title: 'title',
			id: 'id',
			start: new Date(2024, 9, 1, 0, 0, 0, 0),
			end: new Date(2024, 9, 1, 0, 0, 0, 0),
			description: 'description'
		}
		wrapper = render(<EventCard selectedValue={selectedValue} />)
	})

	it('should render', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
