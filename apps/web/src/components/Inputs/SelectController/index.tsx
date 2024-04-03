import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import { Props } from 'components/Inputs/SelectController/interfaces'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function SelectController<T extends FieldValues = FieldValues>({
	control,
	name,
	label,
	options,
	formControlProps,
	inputLabelProps,
	selectProps
}: Props<T>) {
	const { t } = useTranslation()
	return (
		<>
			<Controller
				control={control}
				name={name}
				render={({
					field: { onChange, value, ...field },
					fieldState: { error }
				}) => (
					<>
						<FormControl
							fullWidth
							error={!!error}
							{...formControlProps}>
							<InputLabel
								id={`${name}-select-label`}
								{...inputLabelProps}>
								{label}
							</InputLabel>
							<Select
								{...selectProps}
								labelId={`${name}-select-label`}
								id={name}
								value={value}
								label={label}
								onChange={onChange}
								{...field}>
								{options.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}>
										{t(option.label)}
									</MenuItem>
								))}
							</Select>
							<FormHelperText>
								{error?.message ? t(error.message) : ''}
							</FormHelperText>
						</FormControl>
					</>
				)}
			/>
		</>
	)
}
