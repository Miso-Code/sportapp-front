import {
	PersonalProfileBase,
	PersonalProfileResponse,
	PersonalProfileUpdateRequest
} from '@sportapp/sportapp-repository/src/user/interfaces/api/personalProfile'
import {
	SportProfileBase,
	SportProfileResponse,
	SportProfileUpdateRequest
} from '@sportapp/sportapp-repository/src/user/interfaces/api/sportProfile'

export interface IUserStore extends IUserState, IUserActions {}

export interface IUserState {
	user: User | undefined
	error: string | undefined
	loading: boolean
}

export interface User {
	profileData?: PersonalProfileBase
	sportData?: SportProfileBase
}

export interface IUserActions {
	setError: (error: string) => void
	setLoading: (loading: boolean) => void
	setUser: (user: User) => void
	clearState: () => void
	getProfile: () => Promise<PersonalProfileResponse | undefined>
	updateProfile: (data: PersonalProfileUpdateRequest) => void
	getSport: () => Promise<SportProfileResponse | undefined>
	updateSport: (data: SportProfileUpdateRequest) => void
}
