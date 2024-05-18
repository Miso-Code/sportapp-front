import schema from '../schema'

describe('CreateProduct schema', () => {
	it('should validate the schema', async () => {
		const data = {
			category: 'category',
			name: 'name',
			summary: 'summary',
			url: 'http://example.com',
			price: 1,
			paymentType: 'paymentType',
			paymentFrequency: 'paymentFrequency',
			stock: 1,
			description: 'description',
			typeImage: 'true',
			image_base64: 'image_base64',
			sport_id: '1'
		}

		await expect(schema.validate(data)).resolves.toBe(data)
	})

	it('should throw an error if the data is invalid', async () => {
		const data = {
			category: 'category',
			name: 'name',
			summary: 'summary',
			url: 'http://example.com',
			price: 1,
			paymentType: 'paymentType',
			paymentFrequency: 'paymentFrequency',
			stock: 1,
			description: 'description',
			typeImage: 'true',
		}

		await expect(schema.validate(data)).rejects.toThrow()
	})

	it('should validate the schema with imageUrl', async () => {
		const data = {
			category: 'category',
			name: 'name',
			summary: 'summary',
			url: 'http://example.com',
			price: 1,
			paymentType: 'paymentType',
			paymentFrequency: 'paymentFrequency',
			stock: 1,
			description: 'description',
			typeImage: 'false',
			imageUrl: 'imageUrl',
			sport_id: '1'
		}

		await expect(schema.validate(data)).resolves.toBe(data)
	})
})
