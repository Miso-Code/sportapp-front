import { FormData } from '@/containers/Partner/Register/utils/schema'
import Register from '@/pages/Partner/Register'
import { usePartnerAuthStore } from '@sportapp/stores'
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { useNavigate } from 'react-router-dom'

jest.mock(
	'@/containers/Partner/Register',
	() =>
		({ onHandleSubmit }: { onHandleSubmit: (data: FormData) => void }) => (
			<div
				data-testid='onHandleSubmit'
				onClick={() =>
					onHandleSubmit({
						email: 'email',
						password: 'password',
						companyName: 'companyName'
					})
				}>
				RegisterPartnerContainer
			</div>
		)
)

jest.mock('react', () => {
	const ActualReact = jest.requireActual('react')
	return {
		...ActualReact,
		useState: jest.fn(() => [0, jest.fn()])
	}
})

jest.mock('@sportapp/stores/src/partner/auth', () => ({
	usePartnerAuthStore: jest.fn().mockReturnValue({
		login: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
		logout: jest.fn(),
		register: jest.fn().mockResolvedValue(true),
		registerFull: jest.fn().mockResolvedValue(true),
		loading: false,
		error: null,
		user: null
	})
}))

jest.mock('@/components/TransitionAlert', () => () => (
	<div>TransitionAlert</div>
))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn()
}))

describe('Register', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Register />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render correctly', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should call onHandleGoToLogin', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		wrapper.rerender(<Register />)
		fireEvent.click(wrapper.getByText('register.login.default'))

		await waitFor(() =>
			expect(navigate).toHaveBeenCalledWith('/partner/login')
		)
	})

	it('should call onHandleSubmit', () => {
		;(usePartnerAuthStore().register as jest.Mock).mockResolvedValueOnce(
			true
		)
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleSubmit').click()
		expect(usePartnerAuthStore().register).toHaveBeenCalled()
	})

	it('should call onHandleSubmit and set alert', () => {
		;(usePartnerAuthStore().register as jest.Mock).mockResolvedValueOnce(
			false
		)
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleSubmit').click()
		expect(usePartnerAuthStore().register).toHaveBeenCalled()
	})
})
