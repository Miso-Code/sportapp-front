import { useAuthStore } from '@sportapp/stores/src/auth'
import {
	RenderResult,
	fireEvent,
	render,
	screen,
	waitFor
} from '@testing-library/react'
import { useState } from 'react'
import { act } from 'react-dom/test-utils'
import { useNavigate } from 'react-router-dom'
import LoginPage from '../index'

jest.mock(
	'@/containers/Login',
	() =>
		({
			onHandleSubmit
		}: {
			onHandleSubmit: (data: { email: string; password: string }) => void
		}) =>
			(
				<button
					data-testid='login-button'
					onClick={() => {
						onHandleSubmit({ email: 'test', password: 'test' })
					}}>
					Login
				</button>
			)
)

jest.mock('@sportapp/stores/src/auth', () => ({
	useAuthStore: jest.fn().mockReturnValue({
		login: jest.fn().mockReturnValue(true),
		loading: false,
		error: null,
		isAuth: false
	})
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn()
}))

jest.mock('react', () => {
	const ActualReact = jest.requireActual('react')
	return {
		...ActualReact,
		useState: jest.fn(() => [false, jest.fn()])
	}
})

jest.mock(
	'@/components/TransitionAlert',
	() =>
		({ isOpen }: { isOpen: boolean }) =>
			isOpen ? <div data-testid='alert'>Alert</div> : null
)

describe('LoginPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<LoginPage />)
	})

	afterEach(() => {
		jest.clearAllMocks()
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render the title', () => {
		expect(screen.getByText('app.name')).toBeInTheDocument()
	})

	it('should render the card title', () => {
		expect(screen.getByText('login.default')).toBeInTheDocument()
	})

	it('should render the login button', () => {
		expect(screen.getByTestId('login-button')).toBeInTheDocument()
	})

	it('should call navigate when the form is submitted', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)

		wrapper.rerender(<LoginPage />)

		const button = wrapper.getByTestId('login-button')

		fireEvent.click(button)

		await waitFor(() => expect(navigate).toHaveBeenCalledWith('/home'))
	})

	it('should call setAlert when the form is submitted', async () => {
		const setAlert = jest.fn()
		;(useState as jest.Mock).mockImplementationOnce(() => [false, setAlert])
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			login: jest.fn().mockReturnValue(false),
			loading: false,
			error: null,
			isAuth: false
		})

		wrapper.rerender(<LoginPage />)

		const button = wrapper.getByTestId('login-button')

		act(() => {
			fireEvent.click(button)
		})

		await waitFor(() => expect(setAlert).toHaveBeenCalledWith(true))
	})

	it('should called navigate to register page', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)

		wrapper.rerender(<LoginPage />)

		const button = screen.getByText('login.register.go')

		fireEvent.click(button)

		await waitFor(() => expect(navigate).toHaveBeenCalledWith('/register'))
	})
})
