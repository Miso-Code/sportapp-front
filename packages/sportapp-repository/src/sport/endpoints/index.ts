const BASE_URL = '/sport-session'

const endpoints = {
	getAllSports: `${BASE_URL}/`,
	getSportById: (sportId: string) => `${BASE_URL}/${sportId}`
}

export default endpoints
