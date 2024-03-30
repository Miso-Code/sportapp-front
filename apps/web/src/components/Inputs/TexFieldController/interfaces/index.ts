import { TextFieldVariants } from '@mui/material'
import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues> extends TextFieldControllerProps {
	control: Control<T> | undefined
	name: Path<T>
	label: string
	variant: TextFieldVariants
}
