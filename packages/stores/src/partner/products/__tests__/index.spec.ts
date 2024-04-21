import { act, renderHook } from '@testing-library/react'
import BusinessPartner from '@sportapp/sportapp-repository/src/business-partner'
import { usePartnerProductStore } from '../index'
import { ProductCreateRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-create'
import { getProductsPayload } from '../interfaces'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

jest.mock('../../auth', () => {
	return {
		usePartnerAuthStore: {
			getState: jest.fn().mockReturnValue({
				authToken: {
					accessToken: 'access'
				}
			})
		}
	}
})

jest.mock('@sportapp/sportapp-repository/src/business-partner', () => {
	return {
		__esModule: true,
		default: jest.fn().mockImplementation(() => ({
			createProduct: jest.fn().mockResolvedValue({
				product_id: '3d34b017-ac99-4e2b-8959-0c997231a64c',
				business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
				category: 'nutrition',
				name: 'Test Product',
				summary: 'The best product ever',
				url: 'https://www.google.com.co',
				price: 12310,
				payment_type: 'unique',
				payment_frequency: 'other',
				image_url:
					'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/22ed137d-2898-4d1c-ae44-a451b8f4f729/test_product_1713564629661',
				description:
					"I'll override the auxiliary THX feed, that should driver the GB firewall!",
				active: true
			}),
			getAllProducts: jest.fn().mockResolvedValue([
				{
					product_id: '3d34b017-ac99-4e2b-8959-0c997231a64c',
					business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
					category: 'nutrition',
					name: 'Test Product Updated b',
					summary: 'The best product ever now with shipping',
					url: 'https://www.google.com.co',
					price: 12310,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url:
						'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/998196ed-25ba-4179-8aaf-4d9c1152c871/test_product_1713476725034',
					description: 'We need to input the haptic XSS sensor!',
					active: false
				},
				{
					product_id: 'b029cdc5-6d8f-4151-bac3-c0fc185113a3',
					business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
					category: 'nutrition',
					name: 'Test Product',
					summary: 'The best product ever',
					url: 'https://www.google.com.co',
					price: 12310,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url:
						'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/22ed137d-2898-4d1c-ae44-a451b8f4f729/test_product_1713564742775',
					description:
						"I'll override the digital SCSI array, that should card the HDD interface!",
					active: true
				}
			]),
			deleteProduct: jest.fn().mockResolvedValue(false)
		}))
	}
})

describe('ProductStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(async () => {
		process.env = OLD_ENV
		jest.clearAllMocks()
	})

	it('should set error', async () => {
		const { result } = renderHook(() => usePartnerProductStore())
		const { setError } = result.current
		expect(result.current.error).toBe(undefined)
		await act(async () => {
			await setError('error')
		})
		expect(result.current.error).toBe('error')
	})

	it('should set loading', async () => {
		const { result } = renderHook(() => usePartnerProductStore())
		const { setLoading } = result.current
		expect(result.current.loading).toBe(false)
		await act(async () => {
			await setLoading(true)
		})
		expect(result.current.loading).toBe(true)
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => usePartnerProductStore())
		const { clearState } = result.current
		await act(async () => {
			await clearState()
		})
		expect(result.current.products).toBe(undefined)
		expect(result.current.error).toBe(undefined)
		expect(result.current.loading).toBe(false)
	})

	it('should set products', async () => {
		const { result } = renderHook(() => usePartnerProductStore())
		const { setProducts } = result.current
		expect(result.current.products).toBe(undefined)
		await act(async () => {
			await setProducts([
				{
					product_id: '3d34b017-ac99-4e2b-8959-0c997231a64c',
					business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
					category: 'nutrition',
					name: 'Test Product',
					summary: 'The best product ever',
					url: 'https://www.google.com.co',
					price: 12310,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url:
						'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/22ed137d-2898-4d1c-ae44-a451b8f4f729/test_product_1713564629661',
					description:
						"I'll override the auxiliary THX feed, that should driver the GB firewall!",
					active: true
				}
			])
		})
		expect(result.current.products).toStrictEqual([
			{
				product_id: '3d34b017-ac99-4e2b-8959-0c997231a64c',
				business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
				category: 'nutrition',
				name: 'Test Product',
				summary: 'The best product ever',
				url: 'https://www.google.com.co',
				price: 12310,
				payment_type: 'unique',
				payment_frequency: 'other',
				image_url:
					'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/22ed137d-2898-4d1c-ae44-a451b8f4f729/test_product_1713564629661',
				description:
					"I'll override the auxiliary THX feed, that should driver the GB firewall!",
				active: true
			}
		])
	})

	it('should create product', async () => {
		const { result } = renderHook(() => usePartnerProductStore())
		const { createProduct } = result.current
		expect(result.current.loading).toBe(false)
		const payload: ProductCreateRequest = {
			category: 'nutrition',
			name: 'Test Product',
			summary: 'The best product ever',
			url: 'https://www.google.com.co',
			price: 12310,
			payment_type: 'unique',
			payment_frequency: 'other',
			image_base64: 'image_base64',
			description:
				"I'll override the auxiliary THX feed, that should driver the GB firewall!"
		}
		await act(async () => {
			await createProduct(payload)
		})
		expect(result.current.loading).toBe(false)
	})

	it('should get products', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			getAllProducts: jest.fn().mockResolvedValue([
				{
					product_id: '3d34b017-ac99-4e2b-8959-0c997231a64c',
					business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
					category: 'nutrition',
					name: 'Test Product Updated b',
					summary: 'The best product ever now with shipping',
					url: 'https://www.google.com.co',
					price: 12310,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url:
						'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/998196ed-25ba-4179-8aaf-4d9c1152c871/test_product_1713476725034',
					description: 'We need to input the haptic XSS sensor!',
					active: false
				},
				{
					product_id: 'b029cdc5-6d8f-4151-bac3-c0fc185113a3',
					business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
					category: 'nutrition',
					name: 'Test Product',
					summary: 'The best product ever',
					url: 'https://www.google.com.co',
					price: 12310,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url:
						'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/22ed137d-2898-4d1c-ae44-a451b8f4f729/test_product_1713564742775',
					description:
						"I'll override the digital SCSI array, that should card the HDD interface!",
					active: true
				}
			])
		}))

		const { result } = renderHook(() => usePartnerProductStore())
		const { getProducts } = result.current
		expect(result.current.products).toBe(undefined)
		const payload: getProductsPayload = {
			offset: 0,
			limit: 10
		}

		await act(async () => {
			await getProducts(payload)
		})

		expect(result.current.products).toStrictEqual([
			{
				product_id: '3d34b017-ac99-4e2b-8959-0c997231a64c',
				business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
				category: 'nutrition',
				name: 'Test Product Updated b',
				summary: 'The best product ever now with shipping',
				url: 'https://www.google.com.co',
				price: 12310,
				payment_type: 'unique',
				payment_frequency: 'other',
				image_url:
					'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/998196ed-25ba-4179-8aaf-4d9c1152c871/test_product_1713476725034',
				description: 'We need to input the haptic XSS sensor!',
				active: false
			},
			{
				product_id: 'b029cdc5-6d8f-4151-bac3-c0fc185113a3',
				business_partner_id: '22ed137d-2898-4d1c-ae44-a451b8f4f729',
				category: 'nutrition',
				name: 'Test Product',
				summary: 'The best product ever',
				url: 'https://www.google.com.co',
				price: 12310,
				payment_type: 'unique',
				payment_frequency: 'other',
				image_url:
					'https://business-partners-products.s3.us-east-1.amazonaws.com/product_images/22ed137d-2898-4d1c-ae44-a451b8f4f729/test_product_1713564742775',
				description:
					"I'll override the digital SCSI array, that should card the HDD interface!",
				active: true
			}
		])
	})

	it('should delete product', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			deleteProduct: jest.fn().mockResolvedValue(true)
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { deleteProduct } = result.current
		expect(result.current.loading).toBe(false)
		const productId = '3d34b017-ac99-4e2b-8959-0c997231a64c'
		await act(async () => {
			await deleteProduct(productId)
		})
		expect(result.current.loading).toBe(false)
	})

	it('should not delete product', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			deleteProduct: jest.fn().mockResolvedValue(false)
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { deleteProduct } = result.current
		expect(result.current.loading).toBe(false)
		const productId = '3d34b017-ac99-4e2b-8959-0c997231a64c'
		await act(async () => {
			await deleteProduct(productId)
		})
		expect(result.current.loading).toBe(false)
	})

	it('should not get products', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			getAllProducts: jest.fn().mockResolvedValue(false)
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { getProducts } = result.current
		expect(result.current.products).toBe(undefined)
		const payload: getProductsPayload = {
			offset: 0,
			limit: 10
		}
		await act(async () => {
			await getProducts(payload)
		})
		expect(result.current.products).toBe(undefined)
	})

	it('should not create product', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			createProduct: jest.fn().mockResolvedValue(false)
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { createProduct } = result.current
		expect(result.current.loading).toBe(false)
		const payload: ProductCreateRequest = {
			category: 'nutrition',
			name: 'Test Product',
			summary: 'The best product ever',
			url: 'https://www.google.com.co',
			price: 12310,
			payment_type: 'unique',
			payment_frequency: 'other',
			image_base64: 'image_base64',
			description:
				"I'll override the auxiliary THX feed, that should driver the GB firewall!"
		}
		await act(async () => {
			await createProduct(payload)
		})
		expect(result.current.loading).toBe(false)
	})

	it('should not get products, because of an error', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			getAllProducts: jest.fn().mockRejectedValue(new Error('error'))
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { getProducts } = result.current
		expect(result.current.products).toBe(undefined)
		const payload: getProductsPayload = {
			offset: 0,
			limit: 10
		}
		await act(async () => {
			await getProducts(payload)
		})
		expect(result.current.products).toBe(undefined)
	})

	it('should not create product, because of an error', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			createProduct: jest.fn().mockRejectedValue(new Error('error'))
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { createProduct } = result.current
		expect(result.current.loading).toBe(false)
		const payload: ProductCreateRequest = {
			category: 'nutrition',
			name: 'Test Product',
			summary: 'The best product ever',
			url: 'https://www.google.com.co',
			price: 12310,
			payment_type: 'unique',
			payment_frequency: 'other',
			image_base64: 'image_base64',
			description:
				"I'll override the auxiliary THX feed, that should driver the GB firewall!"
		}
		await act(async () => {
			await createProduct(payload)
		})
		expect(result.current.loading).toBe(false)
		expect(result.current.error).toBe('errors.product.create')
	})

	it('should not delete product, because of an error', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			deleteProduct: jest.fn().mockRejectedValue(new Error('error'))
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { deleteProduct } = result.current
		expect(result.current.loading).toBe(false)
		const productId = '3d34b017-ac99-4e2b-8959-0c997231a64c'
		await act(async () => {
			await deleteProduct(productId)
		})
		expect(result.current.loading).toBe(false)
		expect(result.current.error).toBe('errors.product.delete')
	})

	it('should not get products, because of an error', async () => {
		;(BusinessPartner as jest.Mock).mockImplementationOnce(() => ({
			getAllProducts: jest.fn().mockRejectedValue(new Error('error'))
		}))
		const { result } = renderHook(() => usePartnerProductStore())
		const { getProducts } = result.current
		expect(result.current.products).toBe(undefined)
		const payload: getProductsPayload = {
			offset: 0,
			limit: 10
		}
		await act(async () => {
			await getProducts(payload)
		})
		expect(result.current.products).toBe(undefined)
		expect(result.current.error).toBe('errors.product.get')
	})
})
