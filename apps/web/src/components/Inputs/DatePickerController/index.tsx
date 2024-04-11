import { Props } from '@/components/Inputs/DatePickerController/interfaces'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function DatePickerController<
	T extends FieldValues = FieldValues
>({ control, name, label, fullWidth = true, ...props }: Props<T>) {
	const { t } = useTranslation()
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, name, ref },
				fieldState: { error }
			}) => (
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<DatePicker
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
						ref={ref}
						{...props}
					/>
				</LocalizationProvider>
			)}
		/>
	)
}
