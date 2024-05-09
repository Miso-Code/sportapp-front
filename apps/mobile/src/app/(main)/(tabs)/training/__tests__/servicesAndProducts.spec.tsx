import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'

import { useBusinessPartnerStore } from '@sportapp/stores'

import ServicesAndProducts from '../servicesAndProducts'

jest.mock('expo-router')

jest.mock('react-native-paper', () => {
	const textInput = jest.requireActual('react-native').TextInput
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children),
		TextInput: textInput //prevents animation issues on jest
	}
})

jest.mock('@/components/KeyboardAvoidingDialog', () =>
	jest.fn(({ children }) => children)
)
jest.mock('@/components/ProductServiceCard', () => {
	const native = jest.requireActual('react-native')
	return jest.fn(({ children, ...props }) => (
		<native.View {...props} testID='productCard'>
			{children}
		</native.View>
	))
})

jest.mock('@/hooks/useDebounce', () => ({
	useDebounce: jest.fn((value) => value)
}))

jest.mock('@sportapp/stores', () => ({
	useBusinessPartnerStore: jest.fn().mockReturnValue({
		getAvailableProducts: jest.fn().mockResolvedValue([
			{
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
			{
				product_id: 'product_id2',
				category: 'category2',
				name: 'name2',
				url: 'url2',
				price: 200,
				payment_type: 'payment_type2',
				payment_frequency: 'payment_frequency2',
				image_url: 'image_url2',
				description: 'description2',
				active: true
			}
		]),
		setProductToCheckout: jest.fn()
	})
}))

describe('ServicesAndProducts', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<ServicesAndProducts />)
	})

	afterEach(() => {
		component.unmount()
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render an activity indicator on loading', () => {
		const [activity] = component.root.findAllByProps({
			testID: 'progressBar'
		})
		expect(activity).toBeDefined()
	})

	it('should render the products and services', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const products = component.root.findAllByProps({
			testID: 'productCard'
		})
		expect(products.length).toBe(6)
	})

	it('should render an activity indicator on scroll', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const scrollView = component.root.findByProps({
			testID: 'scrollView'
		})
		act(() => {
			scrollView.props.onScroll({
				nativeEvent: {
					contentOffset: {
						y: 100
					},
					layoutMeasurement: {
						height: 100
					},
					contentSize: {
						height: 200
					}
				}
			})
		})

		const [activity] = component.root.findAllByProps({
			testID: 'progressBar'
		})
		expect(activity).toBeDefined()
	})

	it('should get next page on scroll', async () => {
		const scrollView = component.root.findByProps({
			testID: 'scrollView'
		})
		act(() => {
			scrollView.props.onScroll({
				nativeEvent: {
					contentOffset: {
						y: 100
					},
					layoutMeasurement: {
						height: 100
					},
					contentSize: {
						height: 200
					}
				}
			})
		})
		await act(async () => {
			await Promise.resolve()
		})

		expect(
			useBusinessPartnerStore().getAvailableProducts
		).toHaveBeenCalled() //TODO toHaveBeenCalledWith + page
	})

	it('should open the product modal onPress', async () => {
		const modal = component.root.findByProps({
			testID: 'productModal'
		})

		expect(modal.props.visible).toBe(false)

		await act(async () => {
			await Promise.resolve()
		})
		const [product] = component.root.findAllByProps({
			testID: 'productCard'
		})
		act(() => {
			product.props.onPress()
		})

		expect(modal.props.visible).toBe(true)
	})

	it('should hide the product modal on dismiss', async () => {
		const modal = component.root.findByProps({
			testID: 'productModal'
		})

		await act(async () => {
			await Promise.resolve()
		})
		const [product] = component.root.findAllByProps({
			testID: 'productCard'
		})
		act(() => {
			product.props.onPress()
		})

		act(() => {
			modal.props.onDismiss()
		})

		expect(modal.props.visible).toBe(false)
	})

	it('should hide the modal on cancel', async () => {
		const modal = component.root.findByProps({
			testID: 'productModal'
		})

		await act(async () => {
			await Promise.resolve()
		})
		const [product] = component.root.findAllByProps({
			testID: 'productCard'
		})
		act(() => {
			product.props.onPress()
		})

		const cancelButton = modal.findByProps({
			testID: 'cancelButton'
		})

		act(() => {
			cancelButton.props.onPress()
		})

		expect(modal.props.visible).toBe(false)
	})

	it('should scroll up on FAB press', async () => {
		component.update(<ServicesAndProducts />)

		const fab = component.root.findByProps({
			testID: 'fabScrollUp'
		})

		const scrollView = component.root.findByProps({ testID: 'scrollView' })

		;(scrollView as any)._fiber.ref.current.scrollTo = jest.fn()
		await act(async () => {
			fab.props.onPress()
			await Promise.resolve()
		})

		expect(
			(scrollView as any)._fiber.ref.current.scrollTo
		).toHaveBeenCalled()
	})

	it('should search for products on search', async () => {
		const search = component.root.findByProps({
			testID: 'search'
		})

		act(() => {
			search.props.onChangeText('test')
		})

		const products = component.root.findAllByProps({
			testID: 'productCard'
		})

		expect(products.length).toBe(0)

		await act(async () => {
			await Promise.resolve()
		})

		expect(
			useBusinessPartnerStore().getAvailableProducts
		).toHaveBeenCalled()
	})

	it('should update product quantity on change', async () => {
		const modal = component.root.findByProps({
			testID: 'productModal'
		})

		await act(async () => {
			await Promise.resolve()
		})
		const [product] = component.root.findAllByProps({
			testID: 'productCard'
		})
		act(() => {
			product.props.onPress()
		})

		const quantity = modal.findByProps({
			testID: 'quantity'
		})

		act(() => {
			quantity.props.onChangeText('2')
		})

		expect(modal.findByProps({ testID: 'quantity' }).props.value).toBe('2')
	})

	it('should disable adquire button on invalid quantity', async () => {
		const modal = component.root.findByProps({
			testID: 'productModal'
		})

		await act(async () => {
			await Promise.resolve()
		})
		const [product] = component.root.findAllByProps({
			testID: 'productCard'
		})
		act(() => {
			product.props.onPress()
		})

		const quantity = modal.findByProps({
			testID: 'quantity'
		})

		act(() => {
			quantity.props.onChangeText(0)
		})

		const button = modal.findByProps({
			testID: 'adquireButton'
		})

		expect(button.props.disabled).toBe(true)
	})

	it('should navigate to checkout on adquire button press', async () => {
		const modal = component.root.findByProps({
			testID: 'productModal'
		})

		await act(async () => {
			await Promise.resolve()
		})
		const [product] = component.root.findAllByProps({
			testID: 'productCard'
		})
		act(() => {
			product.props.onPress()
		})

		const quantity = modal.findByProps({
			testID: 'quantity'
		})

		act(() => {
			quantity.props.onChangeText(10)
		})

		const adquireButton = modal.findByProps({
			testID: 'adquireButton'
		})

		act(() => {
			adquireButton.props.onPress()
		})

		expect(router.push).toHaveBeenCalledWith({
			pathname: 'training/servicesAndProductsCheckout',
			params: {
				quantity: 10
			}
		})
		expect(
			useBusinessPartnerStore().setProductToCheckout
		).toHaveBeenCalledWith({
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
		})
	})
})
