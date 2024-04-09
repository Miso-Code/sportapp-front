import { SelectProps, FormControlProps, InputLabelProps } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues = FieldValues> {
	control: Control<T> | undefined
	name: Path<T>
	readonly label: string
	options: Options[]
	selectProps?: SelectProps
	formControlProps?: FormControlProps
	inputLabelProps?: InputLabelProps
	readonly isTranslated?: boolean
	readonly isDisabled?: boolean
}

export interface Options {
	readonly value: string
	readonly label: string
}
