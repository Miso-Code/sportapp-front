import { getCitiesOfCountry, getCountries } from '@/utils/contries'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import DatePickerController from 'components/Inputs/DatePickerController'
import SelectController from 'components/Inputs/SelectController'
import TextFieldController from 'components/Inputs/TexFieldController'
import TextFieldPasswordController from 'components/Inputs/TexFieldPasswordController'
import schema from 'containers/Register/Full/utils/schema'
import { PropsFull } from 'containers/Register/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'

export default function RegisterFullContainer({ onHandleSubmit }: PropsFull) {
	const { t } = useTranslation()
	const countries = getCountries
	const { watch, handleSubmit, control } = useForm({
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
			},
			birthday: '',
			gender: ''
		},
		mode: 'onChange'
	})

	const onSubmit = (data: unknown) => {
		console.log(data)

		onHandleSubmit(data)
	}

	const nationalityCountry = watch('nationality.country')
	const residenceCountry = watch('residence.country')

	return (
		<form className='register-form' onSubmit={handleSubmit(onSubmit)}>
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

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.documentType')}
				name='documentType'
				options={[
					{ label: t('documentTypeValues.CC'), value: 'CC' },
					{ label: t('documentTypeValues.CE'), value: 'CE' },
					{ label: t('documentTypeValues.PP'), value: 'PP' }
				]}
			/>

			<TextFieldController
				control={control}
				fullWidth
				label={t('form.documentNumber')}
				name='documentNumber'
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.nationalityCountry')}
				name='nationality.country'
				options={countries}
				isTranslated={false}
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.nationalityCity')}
				name='nationality.city'
				options={getCitiesOfCountry(nationalityCountry)}
				isTranslated={false}
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.residenceCountry')}
				name='residence.country'
				options={countries}
				isTranslated={false}
			/>

			<TextFieldController
				control={control}
				fullWidth
				label={t('form.residenceLengthOfStay')}
				name='residence.lengthOfStay'
				type='number'
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.residenceCity')}
				name='residence.city'
				options={getCitiesOfCountry(residenceCountry)}
				isTranslated={false}
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.gender')}
				name='gender'
				options={[
					{ label: t('MALE'), value: 'M' },
					{ label: t('FEMALE'), value: 'F' },
					{ label: t('OTHER'), value: 'O' }
				]}
			/>

			<DatePickerController
				control={control}
				name='birthday'
				label={t('form.birthday')}
			/>

			<Button fullWidth size='large' type='submit' variant='contained'>
				{t('register.button-two')}
			</Button>
		</form>
	)
}
