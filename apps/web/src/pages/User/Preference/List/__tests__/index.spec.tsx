import ListSchedulePreferencePage from '..'
import { render, RenderResult, waitFor } from '@testing-library/react'
import { useSportsmanStore, useUserStore } from '@sportapp/stores'
import { useNavigate } from 'react-router-dom'

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn().mockReturnValue({
		user: {
			profileData: {
				subscription_type: 'premium'
			}
		}
	}),
	useSportsmanStore: jest.fn().mockReturnValue({
		getAllTrainers: jest.fn(),
		getAllSportsmanAppointments: jest.fn(),
		sportsmanAppointments: [],
		trainers: [],
		loading: false
	})
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useLocation: jest.fn().mockReturnValue({
		pathname: '/preferences'
	})
}))

describe('ListSchedulePreferencePage', () => {
	let wrapper: RenderResult
	let spy: jest.SpyInstance

	beforeEach(() => {
		const mockedDate = new Date(1996, 6, 19)
		spy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)
		wrapper = render(<ListSchedulePreferencePage />)
	})

	afterEach(() => {
		spy.mockRestore()
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render with trainers', () => {
		;(useSportsmanStore as unknown as jest.Mock).mockReturnValueOnce({
			getAllTrainers: jest.fn(),
			getAllSportsmanAppointments: jest.fn(),
			trainers: [
				{
					trainer_id: 1,
					first_name: 'John',
					last_name: 'Doe'
				}
			],
			loading: false
		})

		wrapper.rerender(<ListSchedulePreferencePage />)
		expect(wrapper).toMatchSnapshot()
	})

	it('should render with sportsmanAppointments', () => {
		;(useSportsmanStore as unknown as jest.Mock).mockReturnValue({
			getAllTrainers: jest.fn(),
			getAllSportsmanAppointments: jest.fn(),
			sportsmanAppointments: [
				{
					appointment_id: '1',
					appointment_date: '2021-09-01T00:00:00Z',
					appointment_type: 'type',
					trainer_id: '1',
					appointment_location: 'location'
				}
			],
			trainers: [
				{
					trainer_id: 1,
					first_name: 'John',
					last_name: 'Doe'
				}
			],
			loading: false
		})

		wrapper.rerender(<ListSchedulePreferencePage />)
		expect(wrapper).toMatchSnapshot()
	})

	it('should redirect to home if user is not premium', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValueOnce(navigate)
		;(useUserStore as unknown as jest.Mock).mockReturnValueOnce({
			user: {
				profileData: {
					subscription_type: 'free'
				}
			}
		})

		wrapper.rerender(<ListSchedulePreferencePage />)
		await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
	})
})
