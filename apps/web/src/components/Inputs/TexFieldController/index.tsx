import {
	FilledInputProps,
	InputProps,
	OutlinedInputProps,
	TextField
} from '@mui/material'
import { Props } from 'components/Inputs/TexFieldController/interfaces'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
	handleExpirationDateChange,
	handleCvvChange,
	handleMaxCharacters
} from './utils'

export default function TextFieldController<
	T extends FieldValues = FieldValues
>({
	control,
	name,
	label,
	variant = 'outlined',
	inputProps,
	method,
	maxLength = 100,
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
			}) => {
				const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
					const methodHandlers = {
						expirationDate: () => handleExpirationDateChange(e),
						cvv: () => handleCvvChange(e),
						maxLength: () => handleMaxCharacters(e, maxLength),
					};

					const handler = (methodHandlers[method as keyof typeof methodHandlers] || (() => e));
					onChange(handler());
				};

				return (
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
						onChange={handleOnchange}
						{...field}
					/>
				)
			}}
		/>
	)
}
