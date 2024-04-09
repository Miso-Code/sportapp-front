const BASE_URL = '/sport-session'

const endpoints = {
	startSession: `${BASE_URL}/`,
	addSessionLocation: (sessionId: string) =>
		`${BASE_URL}/${sessionId}/location`,
	finishSession: (sessionId: string) => `${BASE_URL}/${sessionId}`
}

export default endpoints