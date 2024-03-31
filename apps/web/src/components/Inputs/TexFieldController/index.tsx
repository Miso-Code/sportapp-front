import { TextField } from '@mui/material'
import { Props } from 'components/Inputs/TexFieldController/interfaces'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function TextFieldController({
	control,
	name,
	label,
	variant = 'outlined',
	...props
}: Props) {
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
					<TextField
						{...props}
						id={name}
						label={label}
						variant={variant}
						helperText={t(error?.message ?? '')}
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
