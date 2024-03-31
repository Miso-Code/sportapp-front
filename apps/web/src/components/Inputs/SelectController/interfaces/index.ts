import { SelectProps, FormControlProps, InputLabelProps } from '@mui/material'
import { Control, FieldValues } from 'react-hook-form'

export interface Props {
	control: Control<FieldValues, unknown> | undefined
	name: string
	label: string
	options: Options[]
	selectProps?: SelectProps
	formControlProps?: FormControlProps
	inputLabelProps?: InputLabelProps
}

export interface Options {
	value: string
	label: string
}
