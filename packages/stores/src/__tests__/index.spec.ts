import {
	initialAuthState,
	useAuthStore,
	initialSportSessionState,
	useSportSessionStore,
	initialSportState,
	useSportStore,
	usePartnerAuthStore,
	initialAuthStatePartner,
	initialUserState,
	useUserStore,
	initialProducPartnerState,
	usePartnerProductStore
} from '..'

jest.mock('@sportapp/sportapp-repository/src/user', () => ({
	useUserApi: jest.fn(() => ({
		register: jest.fn(() => Promise.resolve(true))
	}))
}))

describe('storesExport', () => {
	it('should export stores', () => {
		expect(initialAuthState).toBeDefined()
		expect(useAuthStore).toBeDefined()
		expect(initialSportSessionState).toBeDefined()
		expect(useSportSessionStore).toBeDefined()
		expect(initialSportState).toBeDefined()
		expect(useSportStore).toBeDefined()
		expect(usePartnerAuthStore).toBeDefined()
		expect(initialAuthStatePartner).toBeDefined()
		expect(initialUserState).toBeDefined()
		expect(useUserStore).toBeDefined()
		expect(initialProducPartnerState).toBeDefined()
		expect(usePartnerProductStore).toBeDefined()
	})
})
