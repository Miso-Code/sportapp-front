import { initialAuthState, useAuthStore } from '..'

describe('storesExport', () => {
	it('should export stores', () => {
		expect(initialAuthState).toBeDefined()
		expect(useAuthStore).toBeDefined()
	})
})
