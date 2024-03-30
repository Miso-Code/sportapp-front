import { TextField } from '@mui/material'
import { Props } from 'components/Inputs/TexFieldController/interfaces'
import { Controller, FieldValues } from 'react-hook-form'

export default function TextFieldController<T extends FieldValues>({
	control,
	name,
	label,
	variant = 'outlined',
	...props
}: Props<T>) {
	return (
		<>
			<Controller
				control={control}
				name={name}
				render={({
					field: { onChange, value, ...field },
					fieldState: { error }
				}) => (
					<TextField
						{...props}
						id={name}
						label={label}
						variant={variant}
						helperText={error?.message}
						error={!!error}
						value={value}
						onChange={onChange}
						{...field}
					/>
				)}
			/>
		</>
	)
}
