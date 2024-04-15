import {
	FilledInputProps,
	InputProps,
	OutlinedInputProps,
	TextField
} from '@mui/material'
import { Props } from 'components/Inputs/TexFieldController/interfaces'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function TextFieldController<
	T extends FieldValues = FieldValues
>({
	control,
	name,
	label,
	variant = 'outlined',
	inputProps,
	...props
}: Props<T>) {
	const { t } = useTranslation()
	return (
		<Controller
			control={control}
			name={name}
			render={({
				field: { onChange, value, ...field },
				fieldState: { error }
			}) => (
				<TextField
					{...props}
					InputProps={{
						...(inputProps as
							| Partial<OutlinedInputProps>
							| Partial<InputProps>
							| Partial<FilledInputProps>
							| undefined),
						name: name,
						id: name
					}}
					label={label}
					variant={variant}
					helperText={error?.message ? t(error.message) : ''}
					error={!!error}
					value={value}
					onChange={onChange}
					{...field}
				/>
			)}
		/>
	)
}
