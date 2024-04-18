import schema from 'containers/Partner/Register/utils/schema'

describe('schema default register', () => {
	it('should validate the schema', async () => {
		const data = {
			companyName: 'test',
			email: 'test@gmail.com',
			password: '123456uU*'
		}

		expect(await schema.isValid(data)).toBeTruthy()
	})

	it('should not validate the schema', async () => {
		const data = {
			companyName: '',
			email: '',
			password: ''
		}

		expect(await schema.isValid(data)).toBeFalsy()
	})
})
