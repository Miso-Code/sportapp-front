import PreferenceCardSelectionPage from '..'
import { render, RenderResult, waitFor } from '@testing-library/react'
import { useUserStore } from '@sportapp/stores'
import { useNavigate, useSearchParams } from 'react-router-dom'

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn().mockReturnValue({
		user: {
			profileData: {
				subscription_type: 'premium'
			}
		}
	})
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useLocation: jest.fn().mockReturnValue({
		pathname: '/preferences'
	}),
	useSearchParams: jest.fn().mockReturnValue([
		{
			get: jest.fn().mockReturnValue(''),
			delete: jest.fn()
		},
		jest.fn()
	])
}))

describe('PreferenceCardSelectionPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<PreferenceCardSelectionPage />)
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
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

		wrapper.rerender(<PreferenceCardSelectionPage />)
		await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
	})

	it('should show success alert', async () => {
		const setSearchParams = jest.fn()
		;(useSearchParams as unknown as jest.Mock).mockReturnValueOnce([
			{
				get: jest.fn().mockReturnValue('true'),
				delete: jest.fn()
			},
			setSearchParams
		])

		wrapper.rerender(<PreferenceCardSelectionPage />)
		await waitFor(() => {
			expect(setSearchParams).toHaveBeenCalledTimes(1)
			expect(wrapper.getByText('preference.success')).toBeInTheDocument()
		})
	})

	it('should show error alert', async () => {
		const setSearchParams = jest.fn()
		;(useSearchParams as unknown as jest.Mock).mockReturnValueOnce([
			{
				get: jest.fn().mockReturnValue('false'),
				delete: jest.fn()
			},
			setSearchParams
		])

		wrapper.rerender(<PreferenceCardSelectionPage />)
		await waitFor(() => {
			expect(setSearchParams).toHaveBeenCalledTimes(1)
			expect(wrapper.getByText('preference.error')).toBeInTheDocument()
		})
	})
})
