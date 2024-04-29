import PreferencePage from '..'
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { useUserStore } from '@sportapp/stores'
import { useNavigate } from 'react-router-dom'

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
		pathname: '/premium'
	})
}))

describe('PreferencePage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<PreferencePage />)
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

		wrapper.rerender(<PreferencePage />)
		await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
	})

	it('should redirect to selection page', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValueOnce(navigate)
		wrapper.rerender(<PreferencePage />)
		const buttons = wrapper.container.querySelectorAll(
			'.preference-menu-item'
		)

		fireEvent.click(buttons[0] as Element)
		await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
	})

	it('should redirect to list page', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValueOnce(navigate)
		wrapper.rerender(<PreferencePage />)
		const buttons = wrapper.container.querySelectorAll(
			'.preference-menu-item'
		)

		fireEvent.click(buttons[1] as Element)
		await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
	})
})
