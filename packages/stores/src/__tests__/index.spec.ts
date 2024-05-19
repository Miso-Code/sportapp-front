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
	initialProductPartnerState,
	usePartnerProductStore,
	usePaymentPlanStore,
	initialAlertState,
	useAlertStore,
	initialBusinessPartnerState,
	initialPaymentPlanState,
	useTrainingPlanStore,
	initialSportsmanState,
	initialTrainingPlanState,
	useBusinessPartnerStore,
	useSportsmanStore,
	initialLangState,
	useLangStore,
	initialNutritionalPlanState,
	initialSportEventState,
	useNutritionalPlanStore,
	useSportEventStore
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
		expect(initialProductPartnerState).toBeDefined()
		expect(usePartnerProductStore).toBeDefined()
		expect(usePaymentPlanStore).toBeDefined()
		expect(initialAlertState).toBeDefined()
		expect(useAlertStore).toBeDefined()
		expect(initialBusinessPartnerState).toBeDefined()
		expect(initialPaymentPlanState).toBeDefined()
		expect(useTrainingPlanStore).toBeDefined()
		expect(initialSportsmanState).toBeDefined()
		expect(initialTrainingPlanState).toBeDefined()
		expect(useBusinessPartnerStore).toBeDefined()
		expect(useSportsmanStore).toBeDefined()
		expect(initialLangState).toBeDefined()
		expect(useLangStore).toBeDefined()
		expect(initialNutritionalPlanState).toBeDefined()
		expect(initialSportEventState).toBeDefined()
		expect(useNutritionalPlanStore).toBeDefined()
		expect(useSportEventStore).toBeDefined()
	})
})
