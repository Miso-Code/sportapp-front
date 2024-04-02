import { Props } from '@/components/Inputs/DatePickerController/interfaces'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function DatePickerController({
	control,
	name,
	label,
	fullWidth = true
}: Props) {
	const { t } = useTranslation()
	return (
		<>
			<Controller
				control={control}
				name={name}
				render={({
					field: { onChange, name, ref, disabled },
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
									error: !!error
								}
							}}
							name={name}
							ref={ref}
							disabled={disabled}
						/>
					</LocalizationProvider>
				)}
			/>
		</>
	)
}
