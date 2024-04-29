import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router, useLocalSearchParams } from 'expo-router'
import {
	useAlertStore,
	useBusinessPartnerStore,
	useUserStore
} from '@sportapp/stores'

import ServicesAndProductsCheckout from '../servicesAndProductsCheckout'

jest.mock('expo-router')

jest.mock('react-native-paper', () => {
	const textInput = jest.requireActual('react-native').TextInput
	textInput.Icon = jest.requireActual('react-native-paper').TextInput.Icon
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children),
		TextInput: textInput //prevents animation issues on jest
	}
})
jest.mock('@/components/KeyboardAvoidingDialog', () => {
	const native = jest.requireActual('react-native')
	return jest.fn(({ children, ...props }) => (
		<native.View {...props} testID='modalProcessing'>
			{children}
		</native.View>
	))
})
jest.mock('@/components/ProductServiceCard', () => {
	const native = jest.requireActual('react-native')
	return jest.fn(({ children, ...props }) => (
		<native.View {...props} testID='productCard'>
			{children}
		</native.View>
	))
})
jest.mock('@sportapp/stores', () => ({
	useAlertStore: jest.fn(),
	useBusinessPartnerStore: jest.fn(),
	useUserStore: jest.fn()
}))
describe('ServicesAndProductsCheckout', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		;(useLocalSearchParams as jest.Mock).mockReturnValue({
			quantity: 10,
			product: 1
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			setAlert: jest.fn()
		})
		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValue({
			productToCheckout: {
				product_id: 'product_id',
				category: 'category',
				name: 'name',
				url: 'url',
				price: 100,
				payment_type: 'payment_type',
				payment_frequency: 'payment_frequency',
				image_url: 'image_url',
				description: 'description',
				active: true
			},
			purchaseProduct: jest.fn().mockResolvedValue({
				transaction_id: 'transaction_id',
				transaction_status: 'complete',
				transaction_date: 'transaction_date',
				message: 'message'
			})
		})
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			getProfile: jest.fn().mockResolvedValue({
				first_name: 'John',
				last_name: 'Doe',
				email: 'john.doe@example.com'
			})
		})
		component = renderer.create(<ServicesAndProductsCheckout />)
		jest.useFakeTimers()
	})

	afterEach(() => {
		component.unmount()
		jest.useRealTimers()
		jest.resetAllMocks()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should redirect back if no product is selected', async () => {
		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValue({
			productToCheckout: undefined
		})
		await act(async () => {
			component.update(<ServicesAndProductsCheckout />)
			await Promise.resolve()
		})
		expect(router.back).toHaveBeenCalled()
	})

	describe('Input Quantity', () => {
		it('should assign quantity params to input', () => {
			const quantityInput = component.root.findByProps({
				testID: 'quantity'
			})
			expect(quantityInput.props.value).toBe('10')
		})

		it('should update the quantity on input change', () => {
			const quantityInput = component.root.findByProps({
				testID: 'quantity'
			})
			act(() => {
				quantityInput.props.onChangeText('5')
			})
			expect(quantityInput.props.value).toBe('5')
		})
	})
	describe('Input Card Number', () => {
		it('should assign undefined card number params to input', () => {
			const cardNumberInput = component.root.findByProps({
				testID: 'cardNumber'
			})
			expect(cardNumberInput.props.value).toBe(undefined)
		})

		it('should update the card number and format on input change', () => {
			const cardNumberInput = component.root.findByProps({
				testID: 'cardNumber'
			})
			act(() => {
				cardNumberInput.props.onChangeText('1234567890123456')
			})
			expect(cardNumberInput.props.value).toBe('1234 5678 9012 3456')
		})

		it('should not allow more than 16 digits', async () => {
			const cardNumberInput = component.root.findByProps({
				testID: 'cardNumber'
			})
			act(() => {
				cardNumberInput.props.onChangeText('12345')
			})
			act(() => {
				cardNumberInput.props.onChangeText('1234567890123456789012345')
			})
			expect(cardNumberInput.props.value).toBe('1234 5678 9012 3456')
		})
	})
	describe('Input Card Holder', () => {
		it('should assign undefined card holder params to input', () => {
			const cardHolderInput = component.root.findByProps({
				testID: 'cardHolder'
			})
			expect(cardHolderInput.props.value).toBe('')
		})

		it('should update the card holder on input change to uppercase', () => {
			const cardHolderInput = component.root.findByProps({
				testID: 'cardHolder'
			})
			act(() => {
				cardHolderInput.props.onChangeText('John Doe')
			})
			expect(cardHolderInput.props.value).toBe('JOHN DOE')
		})
	})
	describe('Input Expiration Date', () => {
		it('should assign undefined expiration date params to input', () => {
			const expirationDateInput = component.root.findByProps({
				testID: 'expirationDate'
			})
			expect(expirationDateInput.props.value).toBe(undefined)
		})

		it('should update the expiration date on input change with format', () => {
			const expirationDateInput = component.root.findByProps({
				testID: 'expirationDate'
			})
			act(() => {
				expirationDateInput.props.onChangeText('1223')
			})
			expect(expirationDateInput.props.value).toBe('12/23')
		})

		it('should not allow more than 4 digits', async () => {
			const expirationDateInput = component.root.findByProps({
				testID: 'expirationDate'
			})
			act(() => {
				expirationDateInput.props.onChangeText('12345678')
			})
			expect(expirationDateInput.props.value).toBe('12/34')
		})
	})
	describe('Input CVV', () => {
		it('should assign undefined cvv params to input', () => {
			const cvvInput = component.root.findByProps({
				testID: 'cvv'
			})
			expect(cvvInput.props.value).toBe('')
		})

		it('should update the cvv on input change', () => {
			const cvvInput = component.root.findByProps({
				testID: 'cvv'
			})
			act(() => {
				cvvInput.props.onChangeText('123')
			})
			expect(cvvInput.props.value).toBe('123')
		})
		it('should not allow more than 3 digits', () => {
			const cvvInput = component.root.findByProps({
				testID: 'cvv'
			})
			act(() => {
				cvvInput.props.onChangeText('1234')
			})
			expect(cvvInput.props.value).toBe('123')
		})
	})
	describe('Pay Button', () => {
		it('should disable pay button if any input is empty', () => {
			const payButton = component.root.findByProps({
				testID: 'payButton'
			})
			expect(payButton.props.disabled).toBe(true)
		})

		it('should disable pay button if any input is invalid', () => {
			const payButton = component.root.findByProps({
				testID: 'payButton'
			})
			const cardNumberInput = component.root.findByProps({
				testID: 'cardNumber'
			})
			const cardHolderInput = component.root.findByProps({
				testID: 'cardHolder'
			})
			const expirationDateInput = component.root.findByProps({
				testID: 'expirationDate'
			})
			const cvvInput = component.root.findByProps({
				testID: 'cvv'
			})
			act(() => {
				cardNumberInput.props.onChangeText('1234567')
				cardHolderInput.props.onChangeText('John Doe')
				expirationDateInput.props.onChangeText('12')
				cvvInput.props.onChangeText('1')
			})
			expect(payButton.props.disabled).toBe(true)
		})

		it('should enable pay button if all inputs are filled correctly', () => {
			const payButton = component.root.findByProps({
				testID: 'payButton'
			})
			const cardNumberInput = component.root.findByProps({
				testID: 'cardNumber'
			})
			const cardHolderInput = component.root.findByProps({
				testID: 'cardHolder'
			})
			const expirationDateInput = component.root.findByProps({
				testID: 'expirationDate'
			})
			const cvvInput = component.root.findByProps({
				testID: 'cvv'
			})
			act(() => {
				cardNumberInput.props.onChangeText('1234567890123456')
				cardHolderInput.props.onChangeText('John Doe')
				expirationDateInput.props.onChangeText('1223')
				cvvInput.props.onChangeText('123')
			})
			expect(payButton.props.disabled).toBe(false)
		})
		// TODO: this is failing due to a bug in the test renderer
		// it('should show a modal with activity indicator on pay button press', () => {
		// 	act(() => {
		// 		component.unmount()
		// 		component = renderer.create(<ServicesAndProductsCheckout />)
		// 	})
		// 	expect(component.toJSON()).toMatchSnapshot()
		// 	const payButton = component.root.findByProps({
		// 		testID: 'payButton'
		// 	})
		// 	act(() => {
		// 		payButton.props.onPress()
		// 	})
		// 	const modal = component.root.findByProps({
		// 		testID: 'modalProcessing'
		// 	})
		// 	expect(modal.props.visible).toBe(true)
		// })
		// it('should hide modal on payment complete', async () => {
		// 	const payButton = component.root.findByProps({
		// 		testID: 'payButton'
		// 	})
		// 	await act(async () => {
		// 		payButton.props.onPress()
		// 		await Promise.resolve()
		// 	})
		// 	const modal = component.root.findByProps({
		// 		testID: 'modalProcessing'
		// 	})
		// 	expect(modal.props.visible).toBe(false)
		// })
		it('should call purchaseProduct on pay button press', async () => {
			const payButton = component.root.findByProps({
				testID: 'payButton'
			})
			await act(async () => {
				payButton.props.onPress()
				await Promise.resolve()
			})
			expect(useBusinessPartnerStore().purchaseProduct).toHaveBeenCalled()
		})
		it('should set the alert message on payment success', async () => {
			;(
				useBusinessPartnerStore()
					.purchaseProduct as unknown as jest.Mock
			).mockReturnValue({
				transaction_id: 'transaction_id',
				transaction_status: 'completed',
				transaction_date: 'transaction_date',
				message: 'message'
			})
			const payButton = component.root.findByProps({
				testID: 'payButton'
			})
			await act(async () => {
				payButton.props.onPress()
				await Promise.resolve()
			})
			expect(useAlertStore().setAlert).toHaveBeenCalledWith({
				type: 'success',
				message: 'productService.paymentSuccess'
			})
		})

		it('should set the alert message on payment failed', async () => {
			;(
				useBusinessPartnerStore()
					.purchaseProduct as unknown as jest.Mock
			).mockReturnValue({
				transaction_id: 'transaction_id',
				transaction_status: 'failed',
				transaction_date: 'transaction_date',
				message: 'message'
			})
			const payButton = component.root.findByProps({
				testID: 'payButton'
			})
			await act(async () => {
				component.update(<ServicesAndProductsCheckout />)
				payButton.props.onPress()
				await Promise.resolve()
			})
			expect(useAlertStore().setAlert).toHaveBeenCalledWith({
				type: 'error',
				message: 'productService.paymentFailed'
			})
		})

		it('should navigate back on payment complete', async () => {
			const payButton = component.root.findByProps({
				testID: 'payButton'
			})
			await act(async () => {
				payButton.props.onPress()
				await Promise.resolve()
			})
			expect(router.back).toHaveBeenCalled()
		})
	})
})
