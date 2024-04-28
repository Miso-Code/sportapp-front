import { useSportsmanStore, useUserStore } from '@sportapp/stores'
import { render, RenderResult, waitFor } from '@testing-library/react'
import { useLocation, useNavigate } from 'react-router-dom'
import PreferenceFormPage from '..'

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
		addSportsmanAppointment: jest.fn(),
		trainers: [],
		loading: false
	})
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useLocation: jest.fn().mockReturnValue({
		pathname: '/premium'
	})
}))

describe('PreferenceFormPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<PreferenceFormPage />)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render with trainers', () => {
		;(useSportsmanStore as unknown as jest.Mock).mockReturnValueOnce({
			getAllTrainers: jest.fn(),
			addSportsmanAppointment: jest.fn(),
			trainers: [
				{
					trainer_id: 1,
					first_name: 'John',
					last_name: 'Doe'
				}
			],
			loading: false
		})

		wrapper.rerender(<PreferenceFormPage />)
		expect(wrapper).toMatchSnapshot()
	})

	it('should render for in person appointment', () => {
		;(useLocation as jest.Mock).mockReturnValueOnce({
			pathname: '/premium?in_person=true'
		})

		expect(wrapper).toMatchSnapshot()
	})

	it('should render for virtual appointment', () => {
		;(useLocation as jest.Mock).mockReturnValueOnce({
			pathname: '/premium?virtual=true'
		})

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

		wrapper.rerender(<PreferenceFormPage />)
		await waitFor(() => expect(navigate).toHaveBeenCalledTimes(2))
	})
})
