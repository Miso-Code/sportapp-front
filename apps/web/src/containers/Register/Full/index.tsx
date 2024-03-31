import TextFieldPasswordController from '@/components/Inputs/TexFieldPasswordController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import TextFieldController from 'components/Inputs/TexFieldController'
import schema from 'containers/Register/Full/utils/schema'
import { PropsFull } from 'containers/Register/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'

export default function RegisterFullContainer({ onHandleSubmit }: PropsFull) {
	const { t } = useTranslation()
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: '',
			documentType: '',
			documentNumber: '',
			nationality: {
				country: '',
				city: ''
			},
			residence: {
				country: '',
				city: '',
				lengthOfStay: ''
			}
		},
		mode: 'onChange'
	})

	const onSubmit = (data: unknown) => {
		onHandleSubmit(data)
	}
	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
			<TextFieldController
				// @ts-ignore
				control={control}
				fullWidth
				label='Correo electronico'
				name='email'
			/>
			<TextFieldPasswordController
				// @ts-ignore
				control={control}
				fullWidth
				label='Contraseña'
				name='password'
			/>
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

			<Button fullWidth size='large' type='submit' variant='contained'>
				{t('register.button')}
			</Button>
		</form>
	)
}
