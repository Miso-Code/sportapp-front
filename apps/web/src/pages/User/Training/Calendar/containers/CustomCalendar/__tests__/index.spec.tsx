import CustomCalendar from '..'
import { render, RenderResult } from '@testing-library/react'

jest.mock('react-big-calendar', () => ({
	Calendar: () => <div>Calendar</div>,
	dateFnsLocalizer: () => jest.fn()
}))

describe('CustomCalendar', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<CustomCalendar events={[]} onSelectEvent={jest.fn()} />
		)
	})

	it('should render', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
