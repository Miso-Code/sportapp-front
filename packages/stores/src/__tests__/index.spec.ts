import { initialAuthState, useAuthStore } from '..'

jest.mock('@sportapp/sportapp-repository/src/user', () => ({
	useUserApi: jest.fn(() => ({
		register: jest.fn(() => Promise.resolve(true))
	}))
}))

describe('storesExport', () => {
	it('should export stores', () => {
		expect(initialAuthState).toBeDefined()
		expect(useAuthStore).toBeDefined()
	})
})
