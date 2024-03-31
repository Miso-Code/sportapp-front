import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Props } from 'components/Inputs/TexFieldPasswordController/interfaces'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function TextFieldPasswordController({
	control,
	name,
	label,
	variant = 'outlined',
	...props
}: Props) {
	const { t } = useTranslation()
	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}
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
						helperText={error?.message ? t(error.message) : ''}
						error={!!error}
						value={value}
						onChange={onChange}
						type={showPassword ? 'text' : 'password'}
						InputProps={{
							endAdornment: (
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							)
						}}
						{...field}
					/>
				)}
			/>
		</>
	)
}
