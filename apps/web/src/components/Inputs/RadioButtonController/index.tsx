import {
	FormControl,
	FormControlLabel,
	FormHelperText,
	FormLabel,
	Radio,
	RadioGroup
} from '@mui/material'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Props } from './interfaces'

export default function RadioButtonController<
	T extends FieldValues = FieldValues
>({ control, label, name, options, ...props }: Props<T>) {
	const { t } = useTranslation()
	return (
		<FormControl {...props}>
			<FormLabel id={`${name}-label`}>{label}</FormLabel>
			<Controller
				control={control}
				name={name}
				render={({ field, fieldState }) => (
					<>
						<RadioGroup
							aria-labelledby={`${name}-label`}
							name={name}
							value={field.value}
							onChange={field.onChange}>
							{options.map((option) => (
								<FormControlLabel
									key={option.value}
									value={option.value}
									control={<Radio />}
									label={t(option.label)}
								/>
							))}
						</RadioGroup>
						<FormHelperText>
							{fieldState.error?.message
								? t(fieldState.error.message)
								: ''}
						</FormHelperText>
					</>
				)}
			/>
		</FormControl>
	)
}
