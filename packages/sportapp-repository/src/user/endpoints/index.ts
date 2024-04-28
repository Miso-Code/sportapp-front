const BASE_URL = '/users'
const BASE_PROFILE_URL = `${BASE_URL}/profiles`
const BASE_PREMIUM_URL = `${BASE_URL}/premium`

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
	getAllNutritionalLimitations: `${BASE_URL}/nutritional-limitations`,
	updatePlan: `${BASE_URL}/update-plan`,
	getAllTrainers: `${BASE_PREMIUM_URL}/trainers`,
	addSportsmanAppointment: `${BASE_PREMIUM_URL}/sportsman-appointment`,
	getAllSportsmanAppointments: `${BASE_PREMIUM_URL}/sportsman-appointment`
}

export default endpoints
