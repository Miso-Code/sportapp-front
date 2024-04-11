import { Control, FieldValues, Path } from 'react-hook-form'
import { DatePickerProps } from '@mui/x-date-pickers/DatePicker'
export interface Props<T extends FieldValues = FieldValues>
	extends DatePickerProps<Date, boolean> {
	control: Control<T> | undefined
	readonly name: Path<T>
	readonly label: string
	readonly fullWidth?: boolean
}
