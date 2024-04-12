import {
	FormControlProps,
	InputLabelProps,
	SelectChangeEvent,
	SelectProps
} from '@mui/material'
import { FieldError } from 'react-hook-form'

export interface Props {
	name: string
	label: string
	options: Options[]
	selectProps?: SelectProps
	formControlProps?: FormControlProps
	inputLabelProps?: InputLabelProps
	isTranslated?: boolean
	isDisabled?: boolean
	error?: FieldError
	onChange: (event: SelectChangeEvent<string | string[]>) => void
	value: string | string[]
}

export interface Options {
	value: string
	label: string
}
