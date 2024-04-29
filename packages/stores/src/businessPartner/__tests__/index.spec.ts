import { act, renderHook } from '@testing-library/react'
import { useBusinessPartnerStore } from '../index'
import { Product } from '@sportapp/sportapp-repository/src/businessPartner/interfaces'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('@sportapp/sportapp-repository/src/businessPartner', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
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
			purchaseProduct: jest.fn().mockResolvedValue({
				transaction_id: 'transaction_id',
				transaction_status: 'success',
				transaction_date: 'transaction_date',
				message: 'message'
			})
		}))
	}
})

describe('BusinessPartnerStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(async () => {
		process.env = OLD_ENV
		jest.clearAllMocks()
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useBusinessPartnerStore())
		const { clearState } = result.current

		await act(async () => {
			await clearState()
		})

		expect(result.current.productToCheckout).toBe(undefined)
	})

	it('should return available products', async () => {
		const { result } = renderHook(() => useBusinessPartnerStore())
		const { getAvailableProducts } = result.current

		let products: Product[] | undefined = []
		await act(async () => {
			products = await getAvailableProducts({ limit: 10, offset: 0 })
		})
		expect(products).toStrictEqual([
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
		])
	})

	it('should set product to checkout', async () => {
		const { result } = renderHook(() => useBusinessPartnerStore())
		const { setProductToCheckout } = result.current

		await act(async () => {
			await setProductToCheckout({
				business_partner_id: 'business_partner_id',
				product_id: 'product_id',
				category: 'equipement',
				name: 'name',
				url: 'url',
				price: 100,
				payment_type: 'unique',
				payment_frequency: 'other',
				image_url: 'image_url',
				summary: 'summary',
				description: 'description',
				active: true
			})
		})
		expect(result.current.productToCheckout).toStrictEqual({
			business_partner_id: 'business_partner_id',
			product_id: 'product_id',
			category: 'equipement',
			name: 'name',
			url: 'url',
			price: 100,
			payment_type: 'unique',
			payment_frequency: 'other',
			image_url: 'image_url',
			summary: 'summary',
			description: 'description',
			active: true
		})
	})

	it('should purchase product', async () => {
		const { result } = renderHook(() => useBusinessPartnerStore())
		const { purchaseProduct } = result.current

		let response = undefined
		await act(async () => {
			response = await purchaseProduct({
				user_name: 'user_name',
				user_email: 'user_email',
				payment_data: {
					card_number: 'card_number',
					card_holder: 'card_holder',
					card_expiration_date: 'card_expiration_date',
					card_cvv: 'card_cvv',
					amount: 100
				},
				product_id: 'product_id'
			})
		})
		expect(response).toStrictEqual({
			transaction_id: 'transaction_id',
			transaction_status: 'success',
			transaction_date: 'transaction_date',
			message: 'message'
		})
	})
})
