import { FormData } from '../Default/utils/schema'
import { FormData as FormDataFull } from '../Full/utils/schema'

export interface Props {
	step: number
	onHandleFirstSubmit: (data: FormData) => void
	firstDefaultValues?: DefaultValues
	onHandleSecondSubmit: (data: FormDataFull) => void
	secondDefaultValues?: DefaultFullValues
	isDisabled?: boolean
}
export interface PropsDefault {
	onHandleSubmit: (data: FormData) => void
	defaultValues?: DefaultValues
	isDisabled?: boolean
}

export interface PropsFull {
	onHandleSubmit: (data: FormDataFull) => void
	defaultValues?: DefaultFullValues
	isDisabled?: boolean
}

export interface DefaultValues {
	name: string
	lastName: string
	email: string
	password: string
}

export interface DefaultFullValues extends FormDataFull {
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
