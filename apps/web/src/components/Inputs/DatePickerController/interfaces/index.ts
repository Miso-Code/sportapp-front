import { Control, FieldValues } from 'react-hook-form'

export interface Props {
	control: Control<FieldValues, unknown> | undefined
	name: string
	label: string
	fullWidth?: boolean
}
