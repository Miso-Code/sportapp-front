import TextFieldPasswordController from '@/components/Inputs/TexFieldPasswordController'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import TextFieldController from 'components/Inputs/TexFieldController'
import { Props } from 'containers/Login/interfaces'
import schema, { FormData } from 'containers/Login/utils/schema'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'

export default function LoginContainer({ onHandleSubmit, isDisabled }: Props) {
	const { t } = useTranslation()
	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues: {
			email: '',
			password: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: FormData) => {
		onHandleSubmit(data)
	}
	return (
		<form className='login-form' onSubmit={handleSubmit(onSubmit)}>
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

			<LoadingButton
				disabled={isDisabled}
				loading={isDisabled}
				fullWidth
				size='large'
				type='submit'
				variant='contained'>
				{t('login.go')}
			</LoadingButton>
		</form>
	)
}
