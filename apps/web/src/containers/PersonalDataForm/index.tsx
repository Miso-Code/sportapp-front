import DatePickerController from '@/components/Inputs/DatePickerController'
import SelectController from '@/components/Inputs/SelectController'
import TextFieldController from '@/components/Inputs/TexFieldController'
import TextFieldPasswordController from '@/components/Inputs/TexFieldPasswordController'
import { getCitiesOfCountry, getCountries } from '@/utils/countries'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Typography } from '@mui/material'
import { Props } from 'containers/PersonalDataForm/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import personalDataSchema, { FormData } from './utils/schema'

export default function PersonalDataForm({
	className = '',
	inputsDisabled,
	isDisabled,
	defaultValues = {
		email: '',
		password: '',
		name: '',
		lastName: '',
		documentType: '',
		documentNumber: '',
		birthday: new Date(),
		gender: '',
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
	customSubmit,
	handleCustomSubmit
}: Props) {
	const { t } = useTranslation()
	const countries = getCountries
	const { watch, handleSubmit, control } = useForm({
		resolver: yupResolver(personalDataSchema),
		defaultValues,
		mode: 'onChange'
	})

	const nationalityCountry = watch('nationality.country')
	const residenceCountry = watch('residence.country')

	const onSubmit = (data: FormData) => {
		handleCustomSubmit(data)
	}

	return (
		<div className={`personal-data-form ${className}`}>
			<Typography className='personal-data-form-title' variant='h3'>
				Datos Personales
			</Typography>
			<form
				className='personal-data-form-container'
				onSubmit={handleSubmit(onSubmit)}>
				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.email')}
					name='email'
				/>

				<TextFieldPasswordController
					control={control}
					fullWidth
					disabled
					label={t('form.password')}
					name='password'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.name')}
					name='name'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.lastName')}
					name='lastName'
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={t('form.documentType')}
					name='documentType'
					formControlProps={{ disabled: inputsDisabled }}
					options={[
						{ label: 'form.documentTypeValues.CC', value: 'CC' },
						{ label: 'form.documentTypeValues.CE', value: 'CE' },
						{ label: 'form.documentTypeValues.PA', value: 'PA' }
					]}
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.documentNumber')}
					name='documentNumber'
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					formControlProps={{ disabled: inputsDisabled }}
					label={t('form.nationalityCountry')}
					name='nationality.country'
					options={countries}
					isTranslated={false}
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					formControlProps={{
						disabled: !nationalityCountry || inputsDisabled
					}}
					label={t('form.nationalityCity')}
					name='nationality.city'
					options={[
						...getCitiesOfCountry(nationalityCountry),
						{ label: t('form.notExist'), value: 'notExist' }
					]}
					isTranslated={false}
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					formControlProps={{ disabled: inputsDisabled }}
					label={t('form.residenceCountry')}
					name='residence.country'
					options={countries}
					isTranslated={false}
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.residenceLengthOfStay')}
					name='residence.lengthOfStay'
					type='number'
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={t('form.residenceCity')}
					name='residence.city'
					formControlProps={{
						disabled: !residenceCountry || inputsDisabled
					}}
					options={[
						...getCitiesOfCountry(residenceCountry),
						{ label: t('form.notExist'), value: 'notExist' }
					]}
					isTranslated={false}
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					formControlProps={{ disabled: inputsDisabled }}
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
					disabled={inputsDisabled}
					name='birthday'
					label={t('form.birthDate')}
				/>

				{!!customSubmit || (
					<LoadingButton
						disabled={isDisabled}
						loading={isDisabled}
						fullWidth
						size='large'
						type='submit'
						variant='contained'>
						{t('register.button-two')}
					</LoadingButton>
				)}
			</form>
			{customSubmit}
		</div>
	)
}
