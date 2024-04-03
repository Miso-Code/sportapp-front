import { TextField } from '@mui/material'
import { Props } from 'components/Inputs/TexFieldController/interfaces'
import { Controller, FieldValues } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { changeDotInId } from 'components/Inputs/utils'

export default function TextFieldController<
	T extends FieldValues = FieldValues
>({ control, name, label, variant = 'outlined', ...props }: Props<T>) {
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
						id={changeDotInId(name)}
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
		</>
	)
}
