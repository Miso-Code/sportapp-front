import { BaseTextFieldProps, TextFieldVariants } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues = FieldValues>
	extends BaseTextFieldProps {
	control: Control<T> | undefined
	name: Path<T>
	label: string
	variant?: TextFieldVariants
}
