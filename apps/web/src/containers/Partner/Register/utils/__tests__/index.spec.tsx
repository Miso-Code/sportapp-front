import schema from 'containers/Register/Default/utils/schema'

describe('schema default register', () => {
	it('should validate the schema', async () => {
		const data = {
			name: 'John',
			lastName: 'Doe',
			email: 'test@gmail.com',
			password: '123456uU*'
		}

		expect(await schema.isValid(data)).toBeTruthy()
	})

	it('should not validate the schema', async () => {
		const data = {
			name: '',
			lastName: '',
			email: '',
			password: ''
		}

		expect(await schema.isValid(data)).toBeFalsy()
	})
})
