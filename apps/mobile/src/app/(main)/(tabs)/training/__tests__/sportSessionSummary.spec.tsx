import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { useSportSessionStore, useBusinessPartnerStore } from '@sportapp/stores'
import { router } from 'expo-router'

import SportSessionSummary from '../sportSessionSummary'
import ProductServiceCard from '@/components/ProductServiceCard'

jest.mock('react-native-safe-area-context')

jest.mock('@sportapp/stores', () => ({
	useSportSessionStore: jest.fn().mockReturnValue({
		sportSession: null
	}),
	useBusinessPartnerStore: jest.fn().mockReturnValue({
		setProductToCheckout: jest.fn(),
		suggestProduct: jest.fn()
	})
}))

jest.mock('@/components/Kpi', () => {
	const native = jest.requireActual('react-native')
	return {
		__esModule: true,
		default: (props) => (
			<native.View {...props}>
				<native.Text>{props.label}</native.Text>
				<native.Text>{props.value}</native.Text>
			</native.View>
		)
	}
})
describe('SportSessionSummary', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<SportSessionSummary />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a progress bar when no sport session is available', () => {
		expect(
			component.root.findByProps({ testID: 'progressBar' })
		).toBeDefined()
	})

	it('should render a summary when a sport session is available', async () => {
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValue({
			sportSession: {
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				started_at: new Date().toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			}
		})

		await act(async () => {
			component.update(<SportSessionSummary />)
			await Promise.resolve()
		})

		const calories = component.root.findByProps({
			testID: 'calories'
		})
		const duration = component.root.findByProps({
			testID: 'duration'
		})
		const steps = component.root.findByProps({ testID: 'steps' })
		const distance = component.root.findByProps({
			testID: 'distance'
		})
		const speed = component.root.findByProps({ testID: 'speed' })
		const heartRate = component.root.findByProps({
			testID: 'heartrate'
		})

		expect(calories.props.value).toBe(5)
		expect(duration.props.value).toBe(60)
		expect(steps.props.value).toBe(85)
		expect(distance.props.value).toBe(70)
		expect(speed.props.value).toBe(1.78)
		expect(heartRate.props.data).toStrictEqual([80, 133, 150])
	})

	it('should render a summary when a sport session has null values', async () => {
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValue({
			sportSession: {
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				started_at: new Date().toISOString(),
				duration: null,
				steps: null,
				distance: null,
				calories: null,
				average_speed: null,
				min_heartrate: null,
				max_heartrate: null,
				avg_heartrate: null
			}
		})

		await act(async () => {
			component.update(<SportSessionSummary />)
			await Promise.resolve()
		})

		const calories = component.root.findByProps({
			testID: 'calories'
		})
		const duration = component.root.findByProps({
			testID: 'duration'
		})
		const steps = component.root.findByProps({ testID: 'steps' })
		const distance = component.root.findByProps({
			testID: 'distance'
		})
		const speed = component.root.findByProps({ testID: 'speed' })
		const heartRate = component.root.findByProps({
			testID: 'heartrate'
		})

		expect(calories.props.value).toBe(0)
		expect(duration.props.value).toBe(0)
		expect(steps.props.value).toBe(0)
		expect(distance.props.value).toBe(0)
		expect(speed.props.value).toBe(0)
		expect(heartRate.props.data).toStrictEqual([0, 0, 0])
	})

	it('should call suggestProduct when the user has a sport session', async () => {
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValue({
			sportSession: {
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				started_at: new Date().toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			}
		})

		await act(async () => {
			component.update(<SportSessionSummary />)
			await Promise.resolve()
		})

		expect(useBusinessPartnerStore().suggestProduct).toHaveBeenCalled()
	})

	it('should call setProductToCheckout when the user selects a product', async () => {
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValue({
			sportSession: {
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				started_at: new Date().toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			}
		})
		;(
			useBusinessPartnerStore().suggestProduct as jest.Mock
		).mockReturnValue({
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

		await act(async () => {
			component.update(<SportSessionSummary />)
			await Promise.resolve()
		})

		const product = component.root.findByType(ProductServiceCard)

		product.props.onPress()

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

	it('should navigate to the checkout screen when the user selects a product', async () => {
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValue({
			sportSession: {
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				started_at: new Date().toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			}
		})

		;(
			useBusinessPartnerStore().suggestProduct as jest.Mock
		).mockReturnValue({
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

		await act(async () => {
			component.update(<SportSessionSummary />)
			await Promise.resolve()
		})

		const product = component.root.findByType(ProductServiceCard)

		product.props.onPress()

		expect(router.push).toHaveBeenCalledWith({
			pathname: 'training/servicesAndProductsCheckout',
			params: {
				quantity: 1
			}
		})
	})
})
