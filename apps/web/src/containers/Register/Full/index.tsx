import { getCitiesOfCountry, getCountries } from '@/utils/countries'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@mui/material'
import DatePickerController from 'components/Inputs/DatePickerController'
import SelectController from 'components/Inputs/SelectController'
import TextFieldController from 'components/Inputs/TexFieldController'
import TextFieldPasswordController from 'components/Inputs/TexFieldPasswordController'
import schema, { FormData } from 'containers/Register/Full/utils/schema'
import { PropsFull } from 'containers/Register/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'

export default function RegisterFullContainer({
	onHandleSubmit,
	isDisabled
}: PropsFull) {
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

	const onSubmit = (data: FormData) => {
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
					{ label: 'form.documentTypeValues.CC', value: 'CC' },
					{ label: 'form.documentTypeValues.CE', value: 'CE' },
					{ label: 'form.documentTypeValues.PA', value: 'PA' }
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
				formControlProps={{ disabled: !nationalityCountry }}
				options={[
					...getCitiesOfCountry(nationalityCountry),
					{ label: t('form.notExist'), value: 'notExist' }
				]}
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
				formControlProps={{ disabled: !residenceCountry }}
				options={[
					...getCitiesOfCountry(residenceCountry),
					{ label: t('form.notExist'), value: 'notExist' }
				]}
				isTranslated={false}
			/>

			<SelectController
				control={control}
				selectProps={{ fullWidth: true }}
				label={t('form.gender')}
				name='gender'
				options={[
					{ label: 'form.genderValues.MALE', value: 'M' },
					{ label: 'form.genderValues.FEMALE', value: 'F' },
					{ label: 'form.genderValues.OTHER', value: 'O' }
				]}
			/>

			<DatePickerController
				control={control}
				name='birthday'
				label={t('form.birthDate')}
			/>

			<Button
				disabled={isDisabled}
				fullWidth
				size='large'
				type='submit'
				variant='contained'>
				{t('register.button-two')}
			</Button>
		</form>
	)
}
