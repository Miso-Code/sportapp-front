import { ReactNode } from 'react'
import { FormData } from '../utils/schema'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	defaultValues?: DefaultValues
	isDisabled?: boolean
	inputsDisabled?: boolean
	customSubmit?: ReactNode
	handleCustomSubmit: (data: FormData) => void
}

export interface DefaultValues extends FormData {}
