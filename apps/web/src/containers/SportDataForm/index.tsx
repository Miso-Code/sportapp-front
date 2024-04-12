import SelectController from '@/components/Inputs/SelectController'
import TextFieldController from '@/components/Inputs/TexFieldController'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Typography } from '@mui/material'
import { Props } from 'containers/SportDataForm/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import {
	FormDataBase,
	FormDataRequired,
	schemaBase,
	schemaRequired
} from './utils/schema'

export default function SportDataForm({
	className = '',
	inputsDisabled,
	isDisabled,
	defaultValues,
	customSubmit,
	isRequired,
	handleCustomSubmit
}: Props) {
	const { t } = useTranslation()
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(isRequired ? schemaRequired : schemaBase),
		defaultValues: {
			...defaultValues
		},
		mode: 'onChange'
	})

	const onSubmit = (data: FormDataRequired | FormDataBase) => {
		handleCustomSubmit(data)
	}

	return (
		<div className={`personal-data-form ${className}`}>
			<Typography className='personal-data-form-title' variant='h3'>
				Sport
			</Typography>
			<form
				className='personal-data-form-container'
				onSubmit={handleSubmit(onSubmit)}>
				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={'Deporte que practica o desea practicar'}
					name='favouriteSportId'
					formControlProps={{ disabled: inputsDisabled }}
					options={[
						{
							label: 'form.trainingFrequencyValues.DAILY',
							value: 'daily'
						},
						{
							label: 'form.trainingFrequencyValues.EVERY_OTHER_DAY',
							value: 'every_other_day'
						},
						{
							label: 'form.trainingFrequencyValues.WEEKLY',
							value: 'weekly'
						},
						{
							label: 'form.trainingFrequencyValues.MONTHLY',
							value: 'monthly'
						}
					]}
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={'Objetivos principales para hacer deporte'}
					name='trainingObjective'
					formControlProps={{ disabled: inputsDisabled }}
					options={[
						{
							label: 'form.trainingFrequencyValues.DAILY',
							value: 'daily'
						},
						{
							label: 'form.trainingFrequencyValues.EVERY_OTHER_DAY',
							value: 'every_other_day'
						},
						{
							label: 'form.trainingFrequencyValues.WEEKLY',
							value: 'weekly'
						},
						{
							label: 'form.trainingFrequencyValues.MONTHLY',
							value: 'monthly'
						}
					]}
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={'Frecuencia de entrenamiento'}
					name='trainingFrequency'
					formControlProps={{ disabled: inputsDisabled }}
					options={[
						{ label: 'form.documentTypeValues.CC', value: 'CC' },
						{ label: 'form.documentTypeValues.CE', value: 'CE' },
						{ label: 'form.documentTypeValues.PA', value: 'PA' }
					]}
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true, multiple: true }}
					label={'Limitaciones:'}
					name='limitations'
					formControlProps={{ disabled: inputsDisabled }}
					options={[
						{
							label: 'form.trainingFrequencyValues.DAILY',
							value: 'daily'
						},
						{
							label: 'form.trainingFrequencyValues.EVERY_OTHER_DAY',
							value: 'every_other_day'
						},
						{
							label: 'form.trainingFrequencyValues.WEEKLY',
							value: 'weekly'
						},
						{
							label: 'form.trainingFrequencyValues.MONTHLY',
							value: 'monthly'
						}
					]}
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('Tiempo para entrenar')}
					name='availableTrainingHoursPerWeek'
					type='number'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('Peso')}
					name='weight'
					type='number'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('Altura')}
					name='height'
					type='number'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled
					label={t('porcentaje de IMC')}
					name='imc'
					type='number'
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
