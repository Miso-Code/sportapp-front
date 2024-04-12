import { ReactNode } from 'react'
import { FormDataBase, FormDataRequired } from '../utils/schema.js'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
	defaultValues?: FormDataRequired
	isRequired?: boolean
	isDisabled?: boolean
	inputsDisabled?: boolean
	customSubmit?: ReactNode
	handleCustomSubmit: (data: FormDataBase | FormDataRequired) => void
}

export interface DefaultValues extends FormDataRequired {}
