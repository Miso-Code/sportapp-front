import { FormData } from '@/containers/Register/Default/utils/schema'
import { FormData as FormDataFull } from '@/containers/Register/Full/utils/schema'
import { useAuthStore } from '@sportapp/stores/src/auth'
import { render, RenderResult, waitFor } from '@testing-library/react'
import Register from 'pages/Register'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

jest.mock(
	'@/containers/Register',
	() =>
		({
			step,
			onHandleFirstSubmit,
			onHandleSecondSubmit
		}: {
			step: number
			onHandleFirstSubmit: (data: FormData) => void
			onHandleSecondSubmit: (data: FormDataFull) => void
		}) => (
			<div>
				RegisterContainer-{step}
				<button
					data-testid='onHandleFirstSubmit'
					onClick={() => {
						const data: FormData = {
							email: 'email',
							password: 'password',
							name: 'name',
							lastName: 'lastName'
						}
						onHandleFirstSubmit(data)
					}}></button>
				<button
					data-testid='onHandleSecondSubmit'
					onClick={() => {
						const data: FormDataFull = {
							birthday: new Date(),
							documentNumber: 'documentNumber',
							documentType: 'documentType',
							email: 'email',
							gender: 'M',
							lastName: 'lastName',
							name: 'name',
							password: 'password',
							nationality: {
								city: 'city',
								country: 'country'
							},
							residence: {
								country: 'country',
								city: 'city',
								lengthOfStay: 'lengthOfStay'
							}
						}
						onHandleSecondSubmit(data)
					}}></button>
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

jest.mock('@sportapp/stores/src/auth', () => ({
	useAuthStore: jest.fn().mockReturnValue({
		login: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false),
		logout: jest.fn(),
		register: jest.fn().mockResolvedValue(true),
		registerFull: jest.fn().mockResolvedValue(true),
		loading: false,
		error: null,
		user: null
	})
}))

jest.mock(
	'@/components/TransitionAlert',
	() =>
		({ isOpen }: { isOpen: boolean }) =>
			isOpen ? <div data-testid='alert'>Alert</div> : null
)

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

	it('should call onHandleFirstSubmit', () => {
		;(useState as jest.Mock).mockImplementationOnce(() => [0, jest.fn()])
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleFirstSubmit').click()
		expect(useState).toHaveBeenCalledWith(0)
	})

	it('should call onHandleSecondSubmit', () => {
		;(useState as jest.Mock).mockImplementationOnce(() => [1, jest.fn()])
		;(useNavigate as jest.Mock).mockReturnValue(jest.fn())
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleSecondSubmit').click()
		expect(useState).toHaveBeenCalledWith(0)
	})

	it('should not call onHandleSubmit', () => {
		;(useState as jest.Mock).mockImplementationOnce(() => [2, jest.fn()])
		wrapper.rerender(<Register />)
		expect(useState).toHaveBeenCalledWith(0)
	})

	it('should call onHandleGoToLogin', () => {
		;(useNavigate as jest.Mock).mockReturnValue(jest.fn())
		wrapper.rerender(<Register />)
		wrapper.getByText('register.login.default').click()
		expect(useNavigate).toHaveBeenCalled()
	})

	it('should not call navigate in onHandleFirstSubmit', async () => {
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			register: jest.fn().mockResolvedValue(false),
			logout: jest.fn()
		})
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleFirstSubmit').click()

		await waitFor(() => {
			expect(navigate).not.toHaveBeenCalled()
		})
	})

	it('should not call navigate in onHandleFirstSubmit', async () => {
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			registerFull: jest.fn().mockResolvedValue(false),
			logout: jest.fn()
		})
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleSecondSubmit').click()

		await waitFor(() => {
			expect(navigate).not.toHaveBeenCalled()
		})
	})
})
