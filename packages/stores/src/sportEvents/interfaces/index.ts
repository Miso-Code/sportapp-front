import { SportEvent } from '@sportapp/sportapp-repository/src/sportEvent/interfaces'

export interface ISportEventStore extends ISportEventState, ISportEventActions {}

export interface ISportEventState {
	sportEvents: SportEvent[]
	loading: boolean
}

export interface ISportEventActions {
	getSportEvents: (latitude:number, longitude:number) => Promise<SportEvent[] | undefined>
	getSportEvent: (sport_id: string) => Promise<SportEvent | undefined>
	clearState: () => void
}
