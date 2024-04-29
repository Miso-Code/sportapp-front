import { Control, FieldValues, Path } from 'react-hook-form'
import { DateTimePickerProps } from '@mui/x-date-pickers/DateTimePicker'

export interface Props<T extends FieldValues = FieldValues>
	extends DateTimePickerProps<Date, boolean> {
	control: Control<T> | undefined
	readonly name: Path<T>
	readonly label: string
	readonly fullWidth?: boolean
}
