import { Props } from '@/components/Inputs/DateTimeController/interfaces'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { isValid } from 'date-fns'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function DateTimeController<
	T extends FieldValues = FieldValues
>({ control, name, label, fullWidth = true, ...props }: Props<T>) {
	const { t } = useTranslation()

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { value, onChange, name, ref },
				fieldState: { error }
			}) => (
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DateTimePicker
						onChange={onChange}
						label={label}
						slotProps={{
							textField: {
								fullWidth,
								helperText: error?.message
									? t(error.message)
									: '',
								error: !!error,
								id: name,
								name: name
							}
						}}
						value={isValid(new Date(value)) ? value : null}
						ref={ref}
						{...props}
					/>
				</LocalizationProvider>
			)}
		/>
	)
}
