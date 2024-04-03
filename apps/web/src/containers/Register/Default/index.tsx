import TextFieldPasswordController from '@/components/Inputs/TexFieldPasswordController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import TextFieldController from 'components/Inputs/TexFieldController'
import schema from 'containers/Register/Default/utils/schema'
import './_index.scss'
import { PropsDefault } from 'containers/Register/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function RegisterDefaultContainer({
	onHandleSubmit
}: PropsDefault) {
	const { t } = useTranslation()
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: unknown) => {
		onHandleSubmit(data)
	}
	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
			<TextFieldController
				control={control}
				fullWidth
				label='Nombre'
				name='name'
			/>
			<TextFieldController
				control={control}
				fullWidth
				label='Apellido'
				name='lastName'
			/>
			<TextFieldController
				control={control}
				fullWidth
				label='Correo electronico'
				name='email'
			/>
			<TextFieldPasswordController
				control={control}
				fullWidth
				label='Contraseña'
				name='password'
			/>
			<Button fullWidth size='large' type='submit' variant='contained'>
				{t('register.button')}
			</Button>
		</form>
	)
}
