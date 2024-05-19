import schema from '../schema'
import { FormData } from '../schema'
import { object, string } from 'yup'

describe('ChangeLang/utils/schema', () => {
	it('should validate the form data', async () => {
		const validData: FormData = {
			lang: 'en'
		}
		const invalidData: FormData = {
			lang: 'fr' as 'es'
		}

		await expect(schema.validate(validData)).resolves.toBe(validData)
		await expect(schema.validate(invalidData)).rejects.toThrow()
	})

	it('should return the correct schema', () => {
		expect(schema.describe()).toEqual(
			object()
				.shape({
					lang: string().oneOf(['en', 'es']).required()
				})
				.describe()
		)
	})
})
