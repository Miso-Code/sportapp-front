import { SelectProps, FormControlProps, InputLabelProps } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues = FieldValues> {
	control: Control<T> | undefined
	name: Path<T>
	label: string
	options: Options[]
	selectProps?: SelectProps
	formControlProps?: FormControlProps
	inputLabelProps?: InputLabelProps
	isTranslated?: boolean
	isDisabled?: boolean
}

export interface Options {
	value: string
	label: string
}
