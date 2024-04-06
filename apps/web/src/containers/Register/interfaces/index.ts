import { FormData } from '../Default/utils/schema'
import { FormData as FormDataFull } from '../Full/utils/schema'

export interface Props {
	step: number
	onHandleFirstSubmit: (data: FormData) => void
	firstDefaultValues?: DefaultValues
	onHandleSecondSubmit: (data: FormDataFull) => void
	secondDefaultValues?: DefaultFullValues
}
export interface PropsDefault {
	onHandleSubmit: (data: FormData) => void
	defaultValues?: DefaultValues
}

export interface PropsFull {
	onHandleSubmit: (data: FormDataFull) => void
	defaultValues?: DefaultFullValues
}

export interface DefaultValues {
	name: string
	lastName: string
	email: string
	password: string
}

export interface DefaultFullValues {
	name: string
	lastName: string
	email: string
	password: string
	documentType: string
	documentNumber: string
	nationality: {
		country: string
		city: string
	}
	residence: {
		country: string
		city: string
		lengthOfStay: string
	}
}
