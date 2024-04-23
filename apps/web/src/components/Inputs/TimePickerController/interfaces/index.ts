import { Control, FieldValues, Path } from 'react-hook-form'
import { TimePickerProps } from '@mui/x-date-pickers/TimePicker'

export interface Props<T extends FieldValues = FieldValues>
	extends TimePickerProps<Date, boolean> {
	control: Control<T> | undefined
	readonly name: Path<T>
	readonly label: string
	readonly fullWidth?: boolean
}
