import { BaseTextFieldProps, TextFieldVariants } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues = FieldValues>
	extends BaseTextFieldProps {
	control: Control<T> | undefined
	readonly name: Path<T>
	readonly label: string
	variant?: TextFieldVariants
}
