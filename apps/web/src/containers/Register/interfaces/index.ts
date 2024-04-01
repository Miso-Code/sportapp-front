export interface Props {
	step: number
	onHandleFirstSubmit: (data: unknown) => void
	firstDefaultValues?: DefaultValues
	onHandleSecondSubmit: (data: unknown) => void
	secondDefaultValues?: DefaultFullValues
}
export interface PropsDefault {
	onHandleSubmit: (data: unknown) => void
	defaultValues?: DefaultValues
}

export interface PropsFull {
	onHandleSubmit: (data: unknown) => void
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
