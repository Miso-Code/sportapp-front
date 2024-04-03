import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues = FieldValues> {
	control: Control<T> | undefined
	name: Path<T>
	label: string
	fullWidth?: boolean
}
