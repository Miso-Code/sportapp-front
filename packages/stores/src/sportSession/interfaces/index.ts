import {
	StartSportSessionRequest,
	StartSportSessionResponse,
	AddSportSessionLocationRequest,
	AddSportSessionLocationResponse,
	FullSportSessionResponse,
	FinishSportSessionRequest
} from '@sportapp/sportapp-repository/src/sportSession/interfaces'

export interface ISportSessionStore
	extends ISportSessionState,
		ISportSessionActions {}

interface SportSession extends FullSportSessionResponse {}

export interface ISportSessionState {
	sportSession?: SportSession
}

export interface ISportSessionActions {
	startSportSession: (
		request: StartSportSessionRequest
	) => Promise<StartSportSessionResponse | undefined>
	addSessionLocation: (
		request: AddSportSessionLocationRequest
	) => Promise<AddSportSessionLocationResponse | undefined>
	finishSportSession: (
		session_id: FinishSportSessionRequest
	) => Promise<FullSportSessionResponse | undefined>
	clearState: () => void
}
