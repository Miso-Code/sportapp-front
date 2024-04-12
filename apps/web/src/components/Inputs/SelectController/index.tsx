import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select
} from '@mui/material'
import SelectMultiComponent from 'components/Inputs/SelectMulti'
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
	selectProps,
	isTranslated = true
}: Props<T>) {
	const { t } = useTranslation()

	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value, ref },
				fieldState: { error }
			}) =>
				!selectProps?.multiple ? (
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
							inputRef={ref}
							labelId={`${name}-select-label`}
							value={value}
							label={label}
							slotProps={{
								input: {
									id: name,
									name: name
								}
							}}
							onChange={onChange}>
							{options.map((option, index) => (
								<MenuItem
									key={`${option.value}-${index}-${name}-value`}
									value={option.value}>
									{isTranslated
										? t(option.label)
										: option.label}
								</MenuItem>
							))}
						</Select>
						<FormHelperText>
							{error?.message ? t(error.message) : ''}
						</FormHelperText>
					</FormControl>
				) : (
					<SelectMultiComponent
						label={label}
						name={name}
						options={options}
						error={error}
						value={value}
						onChange={onChange}
						ref={ref}
						formControlProps={formControlProps}
						inputLabelProps={inputLabelProps}
						isTranslated={isTranslated}
						selectProps={selectProps}
						isDisabled={formControlProps?.disabled}
					/>
				)
			}
		/>
	)
}
