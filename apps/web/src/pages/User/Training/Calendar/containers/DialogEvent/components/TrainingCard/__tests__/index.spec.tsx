import { render, RenderResult } from '@testing-library/react'
import SessionCard from '..'
import { CustomEvent, EventTypes } from '../../../../CustomCalendar/interfaces'

describe('SessionCard', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const selectedValue: CustomEvent = {
			type: EventTypes.TRAINING,
			title: 'title',
			id: 'id',
			start: new Date(2024, 9, 1, 0, 0, 0, 0),
			end: new Date(2024, 9, 1, 0, 0, 0, 0),
			description: 'description',
			warm_up: 1,
			cardio: 1,
			strength: 1,
			capacity: 1
		}
		wrapper = render(<SessionCard selectedValue={selectedValue} />)
	})

	it('should render', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
