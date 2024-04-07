import TextFieldPasswordController from '@/components/Inputs/TexFieldPasswordController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import TextFieldController from 'components/Inputs/TexFieldController'
import schema, { FormData } from 'containers/Register/Default/utils/schema'
import './_index.scss'
import { PropsDefault } from 'containers/Register/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export default function RegisterDefaultContainer({
	onHandleSubmit,
	isDisabled
}: PropsDefault) {
	const { t } = useTranslation()
	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			lastName: '',
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: FormData) => {
		onHandleSubmit(data)
	}
	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
			<TextFieldController
				control={control}
				fullWidth
				label={t('form.name')}
				name='name'
			/>

			<TextFieldController
				control={control}
				fullWidth
				label={t('form.lastName')}
				name='lastName'
			/>

			<TextFieldController
				control={control}
				fullWidth
				label={t('form.email')}
				name='email'
			/>

			<TextFieldPasswordController
				control={control}
				fullWidth
				label={t('form.password')}
				name='password'
			/>

			<Button
				disabled={isDisabled}
				fullWidth
				size='large'
				type='submit'
				variant='contained'>
				{t('register.go')}
			</Button>
		</form>
	)
}
