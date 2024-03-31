import { BaseTextFieldProps, TextFieldVariants } from '@mui/material'
import { Control, FieldValues } from 'react-hook-form'

export interface Props extends BaseTextFieldProps {
	control: Control<FieldValues, unknown> | undefined
	name: string
	label: string
	variant: TextFieldVariants
}
