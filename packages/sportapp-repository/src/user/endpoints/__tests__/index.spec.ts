import endpoints from '..'

describe('User endpoints', () => {
	it('should have the correct endpoints', () => {
		expect(endpoints).toEqual(
			expect.objectContaining({
				register: expect.any(String),
				registerFull: expect.any(Function),
				login: expect.any(String),
				getPersonalProfile: expect.any(String),
				updatePersonalProfile: expect.any(String),
				getSportProfile: expect.any(String),
				updateSportProfile: expect.any(String),
				getNutritionalProfile: expect.any(String),
				updateNutritionalProfile: expect.any(String),
				getAllNutritionalLimitations: expect.any(String)
			})
		)
	})

	it('should return the correct endpoint from registerFull', () => {
		expect(endpoints.registerFull('123')).toBe(
			'/users/123/complete-registration'
		)
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
})
