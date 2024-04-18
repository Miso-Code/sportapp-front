import TextFieldPasswordController from '@/components/Inputs/TexFieldPasswordController'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import TextFieldController from 'components/Inputs/TexFieldController'
import { Props } from 'containers/Partner/Register/interfaces'
import schema, { FormData } from 'containers/Partner/Register/utils/schema'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'

export default function RegisterPartnerContainer({
	onHandleSubmit,
	isDisabled,
	defaultValues
}: Props) {
	const { t } = useTranslation()
	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(schema),
		defaultValues,
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
				label={t('form.companyName')}
				name='companyName'
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
