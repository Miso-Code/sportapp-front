import { useNavigate } from 'react-router-dom'
import CalendarTrainingPage from '..'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'

jest.mock('@sportapp/stores', () => ({
	useSportEventStore: jest.fn().mockReturnValue({
		sportEvents: [
			{
				event_id: '1',
				sport_id: '1',
				location_latitude: 0,
				location_longitude: 0,
				start_date: '2024-01-01T00:00:00Z',
				end_date: '2024-01-01T01:00:00Z',
				title: 'Event',
				capacity: 0,
				description: ''
			}
		],
		getSportEvents: jest.fn()
	}),
	useSportSessionStore: jest.fn().mockReturnValue({
		sportSessions: [
			{
				session_id: '1',
				user_id: '1',
				sport_id: '1',
				started_at: '2024-01-01T00:00:00Z',
				duration: 60
			}
		],
		getSportSessions: jest.fn()
	}),
	useTrainingPlanStore: jest.fn().mockReturnValue({
		trainingPlanSessions: [
			{
				training_plan_session_id: '1',
				weekday: 'monday',
				start_time: '10:00 AM',
				warm_up: 10,
				cardio: 20,
				strength: 30,
				cool_down: 10,
				user_id: '1'
			}
		],
		getTrainingPlan: jest.fn()
	}),
	useLocation: jest.fn().mockReturnValue({
		location: { latitude: 0, longitude: 0 },
		loading: false
	}),
	useUserStore: jest.fn().mockReturnValue({ user: { id: 1 } })
}))

jest.mock('../containers/CustomCalendar', () => () => <div>CustomCalendar</div>)
jest.mock(
	'../containers/DialogEvent',
	() =>
		({ onClose }: { onClose: () => void }) => (
			<div>
				DialogEvent
				<button onClick={onClose}>Close</button>
			</div>
		)
)
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useParams: jest.fn().mockReturnValue({
		id: '123'
	}),
	useLocation: jest.fn().mockReturnValue({
		search: '',
		pathname: '/training/session'
	})
}))

describe('CalendarTrainingPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		act(() => {
			wrapper = render(<CalendarTrainingPage />)
		})
	})

	it('should render', async () => {
		await waitFor(() => expect(wrapper.container).toMatchSnapshot())
	})

	it('should call navigate to back', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		await waitFor(() =>
			expect(
				wrapper.container.querySelector('button[aria-label="back"]')
			).toBeInTheDocument()
		)

		act(() => {
			fireEvent.click(
				wrapper.container.querySelector(
					'button[aria-label="back"]'
				) as Element
			)
		})
		await waitFor(() =>
			expect(navigate).toHaveBeenCalledWith(-1)
		)
	})
})
