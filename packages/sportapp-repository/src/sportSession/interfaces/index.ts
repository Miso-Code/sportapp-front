export interface SportSessionLocationRequest {
	latitude: number
	longitude: number
	accuracy: number
	altitude: number
	altitude_accuracy: number
	heading: number
	speed: number
}
export interface StartSportSessionRequest {
	user_id: string
	started_at: string
	sport_id: string
	initial_location: SportSessionLocationRequest
}

export interface StartSportSessionResponse {
	session_id: string
	sport_id: string
	user_id: string
	start_date: string
}

export interface AddSportSessionLocationRequest
	extends SportSessionLocationRequest {
	session_id: string
}

export interface AddSportSessionLocationResponse
	extends AddSportSessionLocationRequest {}

export interface FinishSportSessionRequest {
	session_id: string
	duration: number
	steps?: number
	distance?: number
	calories?: number
	average_speed?: number
	min_heartrate?: number
	max_heartrate?: number
	avg_heartrate?: number
}

export interface FullSportSessionResponse
	extends FinishSportSessionRequest,
		StartSportSessionResponse {}
