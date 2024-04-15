import { Sport } from '@sportapp/sportapp-repository/src/sport/interfaces'

export interface ISportStore extends ISportState, ISportActions {}

export interface ISportState {
	sports: Sport[]
}

export interface ISportActions {
	getSports: () => Promise<Sport[] | undefined>
	getSport: (sport_id: string) => Promise<Sport | undefined>
	clearState: () => void
}
