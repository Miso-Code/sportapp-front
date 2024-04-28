import {
	SportsmanAppointmentAllResponse,
	SportsmanAppointmentRequest,
	Trainer
} from '@sportapp/sportapp-repository/src/user/interfaces/api/trainer'

export interface ISportsmanStore extends ISportsmanState, ISportsmanActions {}

export interface ISportsmanState {
	error?: string
	loading: boolean
	trainers?: Trainer[]
	sportsmanAppointments?: SportsmanAppointmentAllResponse[]
}

export interface ISportsmanActions {
	setError: (error: string) => void
	setLoading: (loading: boolean) => void
	clearState: () => void
	getAllTrainers: () => Promise<boolean>
	addSportsmanAppointment: (
		payload: SportsmanAppointmentRequest
	) => Promise<boolean>
	getAllSportsmanAppointments: () => Promise<boolean>
}
