import { FormControlProps } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues = FieldValues>
	extends FormControlProps {
	readonly control: Control<T> | undefined
	readonly name: Path<T>
	readonly label: string
	readonly options: RadioButtonOptions[]
}

export interface RadioButtonOptions {
	readonly label: string
	readonly value: string
}
