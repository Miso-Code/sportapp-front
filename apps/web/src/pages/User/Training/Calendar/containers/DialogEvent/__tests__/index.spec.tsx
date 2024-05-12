import { DialogEvent } from '..'
import { render, RenderResult } from '@testing-library/react'
import { CustomEvent, EventTypes } from '../../CustomCalendar/interfaces'

describe('DialogEvent', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const selectedValue: CustomEvent = {
			type: EventTypes.EVENT,
			title: 'title',
			id: 'id',
			start: new Date('2021-09-01T00:00:00.000Z'),
			end: new Date('2021-09-01T00:00:00.000Z'),
			description: 'description'
		}
		wrapper = render(
			<DialogEvent
				onClose={jest.fn()}
				selectedValue={selectedValue}
				open={true}
			/>
		)
	})

	it('should render', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with training type', () => {
		const selectedValue: CustomEvent = {
			type: EventTypes.TRAINING,
			title: 'title',
			id: 'id',
			start: new Date('2021-09-01T00:00:00.000Z'),
			end: new Date('2021-09-01T00:00:00.000Z'),
			description: 'description',
			warm_up: 1,
			cardio: 1,
			strength: 1,
			capacity: 1
		}
		wrapper.rerender(
			<DialogEvent
				onClose={jest.fn()}
				selectedValue={selectedValue}
				open={true}
			/>
		)
		expect(wrapper.container).toMatchSnapshot()
	})
})
