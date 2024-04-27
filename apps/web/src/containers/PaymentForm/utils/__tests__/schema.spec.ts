import { paymentSchema } from '../schema'

describe('PaymentForm schema', () => {
	it('should be valid', async () => {
		const data = {
			amount: 1,
			number: '1234567812345678',
			name: 'John Doe',
			expiry: '12/23',
			cvc: '123'
		}
		await expect(paymentSchema.validate(data)).resolves.toBe(data)
	})

	it('should be invalid', async () => {
		const data = {
			amount: 0,
			number: '123456781234567',
			name: '',
			expiry: '12/2',
			cvc: '12'
		}
		await expect(paymentSchema.validate(data)).rejects.toThrow()
	})
})
