import sportApi from '../index'
import { sportappApi } from '../../index'

jest.mock('../../index', () => ({
	sportappApi: {
		post: jest.fn(),
		get: jest.fn(),
		patch: jest.fn(),
		delete: jest.fn()
	}
}))

jest.mock('../../utils/global-variables', () => ({
	globalVariables: jest.fn(() => ({
		EXPO_PUBLIC_SPORTAPP_API_URL: 'http://localhost:3000/api'
	}))
}))

global.fetch = jest.fn(() => Promise.resolve({ body: {} })) as jest.Mock

describe('BusinessPartnerApi', () => {
	describe('getAvailableProducts', () => {
		it('should call the getAvailableProducts endpoint', async () => {
			;(sportappApi.get as jest.Mock).mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: [
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
					]
				})
			)
			const api = new sportApi()
			const response = await api.getAvailableProducts({
				limit: 10,
				offset: 0
			})

			expect(response).toStrictEqual([
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
	})
})
