import { render, RenderResult } from '@testing-library/react'
import Register from 'pages/Register'
import { useState } from 'react'
import { useAuthStore } from '@sportapp/stores/src/auth'

jest.mock(
	'containers/Register',
	() =>
		({
			step,
			onHandleFirstSubmit,
			onHandleSecondSubmit
		}: {
			step: number
			onHandleFirstSubmit: () => void
			onHandleSecondSubmit: () => void
		}) => (
			<div>
				RegisterContainer-{step}
				<button
					data-testid='onHandleFirstSubmit'
					onClick={() => onHandleFirstSubmit()}></button>
				<button
					data-testid='onHandleSecondSubmit'
					onClick={() => onHandleSecondSubmit()}></button>
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
	...jest.requireActual('@sportapp/stores/src/auth'),
	useAuthStore: () => ({
		login: jest.fn().mockReturnValueOnce(true).mockReturnValueOnce(false)
	})
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
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleSecondSubmit').click()
		expect(useState).toHaveBeenCalledWith(0)
	})

	it('should not call onHandleSubmit', () => {
		;(useState as jest.Mock).mockImplementationOnce(() => [2, jest.fn()])
		wrapper.rerender(<Register />)
		expect(useState).toHaveBeenCalledWith(0)
	})

	it('should call handleSubmit', () => {
		;(useState as jest.Mock).mockImplementationOnce(() => [1, jest.fn()])
		;(useAuthStore as unknown as jest.Mock).mockReturnValue(() => ({
			login: jest.fn().mockResolvedValue(true)
		}))
		wrapper.rerender(<Register />)
		wrapper.getByTestId('onHandleSecondSubmit').click()
		expect(useState).toHaveBeenCalledWith(0)
	})
})
