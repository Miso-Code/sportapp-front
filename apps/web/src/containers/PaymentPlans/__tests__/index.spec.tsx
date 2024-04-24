import { useState } from 'react'
import PaymentPlans from '..'
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(() => [false, jest.fn()])
}))

describe('PaymentPlans', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<PaymentPlans />)
	})

	it('should render the component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should call handleOpen with first card', () => {
		const handleOpen = jest.fn()
		;(useState as jest.Mock).mockImplementationOnce(() => [
			false,
			handleOpen
		])
		wrapper = render(<PaymentPlans />)
		const cards = wrapper.container.querySelectorAll('.payment-card')
		fireEvent.click(cards[0])
		waitFor(() => {
			expect(handleOpen).toHaveBeenCalled()
		})
	})

	it('should call handleOpen with second card', () => {
		const handleOpen = jest.fn()
		;(useState as jest.Mock).mockImplementationOnce(() => [
			false,
			handleOpen
		])
		wrapper = render(<PaymentPlans />)
		const cards = wrapper.container.querySelectorAll('.payment-card')
		fireEvent.click(cards[1])
		waitFor(() => {
			expect(handleOpen).toHaveBeenCalled()
		})
	})

	it('should call handleOpen with third card', () => {
		const handleOpen = jest.fn()
		;(useState as jest.Mock).mockImplementationOnce(() => [
			false,
			handleOpen
		])
		wrapper = render(<PaymentPlans />)
		const cards = wrapper.container.querySelectorAll('.payment-card')
		fireEvent.click(cards[2])
		waitFor(() => {
			expect(handleOpen).toHaveBeenCalled()
		})
	})
})
