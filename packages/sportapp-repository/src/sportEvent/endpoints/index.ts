const BASE_URL = '/sport-events'

const endpoints = {
	getAllSportEvents: `${BASE_URL}/`,
	getSportEventById: (sportEventId: string) => `${BASE_URL}/${sportEventId}/`
}

export default endpoints
