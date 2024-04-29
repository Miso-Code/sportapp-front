import { FormPaymentData } from '@/containers/PaymentForm/utils/schema'
import { usePaymentPlanStore, useUserStore } from '@sportapp/stores'
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { useState } from 'react'
import PaymentPlans from '..'
import React from 'react'

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn(() => [false, jest.fn()])
}))

jest.mock('@sportapp/stores', () => ({
	usePaymentPlanStore: jest.fn(() => ({
		selectedPlan: '',
		setSelectedPlan: jest.fn(),
		setPaymentData: jest.fn(),
		updatePlan: jest.fn()
	})),
	useUserStore: jest.fn(() => ({
		user: {
			profileData: {
				subscription_type: ''
			}
		}
	})),
	useAuthStore: jest.fn(() => ({
		refreshToken: jest.fn()
	}))
}))

jest.mock('../container/ModalStep', () => ({
	__esModule: true,
	default: ({
		handleClose,
		handleSubmit,
		open
	}: {
		handleClose: () => void
		handleSubmit: (data: FormPaymentData) => void
		open: boolean
	}) => (
		<div>
			<button data-testId='handleClose' onClick={handleClose}>
				Close
			</button>
			<button
				data-testId='handleSubmit'
				onClick={() => handleSubmit({} as FormPaymentData)}>
				Submit
			</button>
			<p>{open}</p>
		</div>
	)
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

	it('should not call handleOpen with first card', () => {
		const handleOpen = jest.fn()
		;(useState as jest.Mock).mockImplementationOnce(() => [
			false,
			handleOpen
		])
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: 'FREE'
				}
			}
		})
		wrapper = render(<PaymentPlans />)
		const cards = wrapper.container.querySelectorAll('.payment-card')
		fireEvent.click(cards[0])
		waitFor(() => {
			expect(handleOpen).not.toHaveBeenCalled()
		})
	})

	it('should not call handleOpen with second card', () => {
		const handleOpen = jest.fn()
		;(useState as jest.Mock).mockImplementationOnce(() => [
			false,
			handleOpen
		])
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: 'intermediate'
				}
			}
		})
		wrapper = render(<PaymentPlans />)
		const cards = wrapper.container.querySelectorAll('.payment-card')
		fireEvent.click(cards[1])
		waitFor(() => {
			expect(handleOpen).not.toHaveBeenCalled()
		})
	})

	it('should not call handleOpen with third card', () => {
		const handleOpen = jest.fn()
		;(useState as jest.Mock).mockImplementationOnce(() => [
			false,
			handleOpen
		])
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: 'premium'
				}
			}
		})
		wrapper = render(<PaymentPlans />)
		const cards = wrapper.container.querySelectorAll('.payment-card')
		fireEvent.click(cards[2])
		waitFor(() => {
			expect(handleOpen).not.toHaveBeenCalled()
		})
	})

	it('should call handleSelect', () => {
		;(useState as jest.Mock).mockImplementationOnce(() => [true, jest.fn()])
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call handleSelect and update selectedPlan', () => {
		const realUseState = jest.requireActual('react').useState
		jest.spyOn(React, 'useState').mockImplementation(realUseState)

		const setSelectedPlan = jest.fn()
		;(usePaymentPlanStore as unknown as jest.Mock).mockImplementation(
			() => ({
				selectedPlan: '',
				setSelectedPlan,
				setPaymentData: jest.fn(),
				updatePlan: jest.fn()
			})
		)

		const wrapper = render(<PaymentPlans />)

		const cards = wrapper.container.querySelectorAll('.payment-card')
		fireEvent.click(cards[0])

		const agreeButton = wrapper.getByText('form.agree')
		fireEvent.click(agreeButton)

		waitFor(() => {
			expect(setSelectedPlan).toHaveBeenCalled()
		})
	})
})
