import {
	NutritionalLimitations,
	NutritionalProfileResponse,
	NutritionalProfileUpdateRequest
} from '@sportapp/sportapp-repository/src/user/interfaces/api/nutritionalProfile'
import {
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
	profileData?: PersonalProfileResponse
	sportData?: SportProfileBase
	nutritionData?: NutritionalProfileResponse
	nutritionalLimitations?: NutritionalLimitations[]
}

export interface IUserActions {
	setError: (error: string) => void
	setLoading: (loading: boolean) => void
	setUser: (user: User) => void
	clearState: () => void
	getProfile: () => Promise<PersonalProfileResponse | undefined>
	updateProfile: (data: PersonalProfileUpdateRequest) => Promise<void>
	getSport: () => Promise<SportProfileResponse | undefined>
	updateSport: (data: SportProfileUpdateRequest) => Promise<void>
	getNutrition: () => Promise<NutritionalProfileResponse | undefined>
	updateNutrition: (data: NutritionalProfileUpdateRequest) => Promise<void>
	getAllNutritionalLimitations: () => Promise<
		NutritionalLimitations[] | undefined
	>
}
