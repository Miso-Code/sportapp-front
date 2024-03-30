import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import TextFieldController from 'components/Inputs/TexFieldController'
import { useForm } from 'react-hook-form'
import schema from './utils/schema'
import './_index.scss'

export default function LoginContainer() {
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: ''
		}
	})
	const onSubmit = (data) => console.log(data)
	return (
		<form className='login-form' onSubmit={handleSubmit(onSubmit)}>
			<TextFieldController<typeof control>
				control={control}
				fullWidth
				label='Nombre'
				name='name'
			/>
			<TextFieldController<typeof control>
				control={control}
				fullWidth
				label='Apellido'
				name='lastName'
			/>
			<TextFieldController<typeof control>
				control={control}
				fullWidth
				label='Correo electronico'
				name='email'
			/>
			<TextFieldController<typeof control>
				control={control}
				fullWidth
				label='Contraseña'
				name='password'
			/>
			<Button fullWidth size='large' type='submit' variant='contained'>
				Contained
			</Button>
		</form>
	)
}
