const BASE_URL = '/users'
const BASE_PROFILE_URL = `${BASE_URL}/profiles`

const endpoints = {
	register: `${BASE_URL}/registration`,
	registerFull: `${BASE_URL}/complete-registration`,
	login: `${BASE_URL}/login`,
	getPersonalProfile: `${BASE_PROFILE_URL}/personal`,
	updatePersonalProfile: `${BASE_PROFILE_URL}/personal`,
	getSportProfile: `${BASE_PROFILE_URL}/sports`,
	updateSportProfile: `${BASE_PROFILE_URL}/sports`,
	getNutritionalProfile: `${BASE_PROFILE_URL}/nutritional`,
	updateNutritionalProfile: `${BASE_PROFILE_URL}/nutritional`,
	getAllNutritionalLimitations: `${BASE_URL}/nutritional-limitations`
}

export default endpoints
