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
	sportSessions?: SportSession[]
}

export interface ISportSessionActions {
	setSportSession: (session: SportSession) => void
	startSportSession: (
		request: StartSportSessionRequest
	) => Promise<StartSportSessionResponse | undefined>
	addSessionLocation: (
		request: AddSportSessionLocationRequest
	) => Promise<AddSportSessionLocationResponse | undefined>
	finishSportSession: (
		session_id: FinishSportSessionRequest
	) => Promise<FullSportSessionResponse | undefined>
	getSportSessions: () => Promise<SportSession[] | undefined>
	clearState: () => void
}
