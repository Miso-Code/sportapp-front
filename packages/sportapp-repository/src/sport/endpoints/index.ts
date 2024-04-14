const BASE_URL = '/sports'

const endpoints = {
	getAllSports: `${BASE_URL}/`,
	getSportById: (sportId: string) => `${BASE_URL}/${sportId}`
}

export default endpoints
