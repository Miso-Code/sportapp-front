import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextFieldController from 'components/Inputs/TexFieldController'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import './_index.scss'
import schema from './utils/schema'

export default function RegisterContainer() {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: ''
		}
	})

	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault()
	}

	const onSubmit = (data: unknown) => console.log(data)
	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Nombre'
				name='name'
			/>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Apellido'
				name='lastName'
			/>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Correo electronico'
				name='email'
			/>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
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
				label='Contraseña'
				name='password'
			/>
			<Button fullWidth size='large' type='submit' variant='contained'>
				Ingresar
			</Button>
		</form>
	)
}
