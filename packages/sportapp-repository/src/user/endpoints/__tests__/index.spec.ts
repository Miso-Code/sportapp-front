import endpoints from '..'

describe('User endpoints', () => {
	it('should have the correct endpoints', () => {
		expect(endpoints).toEqual(
			expect.objectContaining({
				register: expect.any(String),
				registerFull: expect.any(String),
				login: expect.any(String),
				getPersonalProfile: expect.any(String),
				updatePersonalProfile: expect.any(String),
				getSportProfile: expect.any(String),
				updateSportProfile: expect.any(String),
				getNutritionalProfile: expect.any(String),
				updateNutritionalProfile: expect.any(String),
				getAllNutritionalLimitations: expect.any(String),
				updatePlan: expect.any(String),
				getAllTrainers: expect.any(String),
				addSportsmanAppointment: expect.any(String),
				getAllSportsmanAppointments: expect.any(String)
			})
		)
	})

	it('should return the correct endpoint from registerFull', () => {
		expect(endpoints.registerFull).toBe('/users/complete-registration')
	})

	it('should return the correct endpoint from register', () => {
		expect(endpoints.register).toBe('/users/registration')
	})

	it('should return the correct endpoint from login', () => {
		expect(endpoints.login).toBe('/users/login')
	})

	it('should return the correct endpoint from getPersonalProfile', () => {
		expect(endpoints.getPersonalProfile).toBe('/users/profiles/personal')
	})

	it('should return the correct endpoint from updatePersonalProfile', () => {
		expect(endpoints.updatePersonalProfile).toBe('/users/profiles/personal')
	})

	it('should return the correct endpoint from getSportProfile', () => {
		expect(endpoints.getSportProfile).toBe('/users/profiles/sports')
	})

	it('should return the correct endpoint from updateSportProfile', () => {
		expect(endpoints.updateSportProfile).toBe('/users/profiles/sports')
	})

	it('should return the correct endpoint from getNutritionalProfile', () => {
		expect(endpoints.getNutritionalProfile).toBe(
			'/users/profiles/nutritional'
		)
	})

	it('should return the correct endpoint from updateNutritionalProfile', () => {
		expect(endpoints.updateNutritionalProfile).toBe(
			'/users/profiles/nutritional'
		)
	})

	it('should return the correct endpoint from getAllNutritionalLimitations', () => {
		expect(endpoints.getAllNutritionalLimitations).toBe(
			'/users/nutritional-limitations'
		)
	})

	it('should return the correct endpoint from updatePlan', () => {
		expect(endpoints.updatePlan).toBe('/users/update-plan')
	})

	it('should return the correct endpoint from getAllTrainers', () => {
		expect(endpoints.getAllTrainers).toBe('/users/premium/trainers')
	})

	it('should return the correct endpoint from addSportsmanAppointment', () => {
		expect(endpoints.addSportsmanAppointment).toBe(
			'/users/premium/sportsman-appointment'
		)
	})

	it('should return the correct endpoint from getAllSportsmanAppointments', () => {
		expect(endpoints.getAllSportsmanAppointments).toBe(
			'/users/premium/sportsman-appointment'
		)
	})
})
