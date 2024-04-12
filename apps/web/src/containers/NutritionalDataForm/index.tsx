import RadioButtonController from '@/components/Inputs/RadioButtonController'
import SelectController from '@/components/Inputs/SelectController'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'
import { Typography } from '@mui/material'
import { Props } from 'containers/NutritionalDataForm/interfaces'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import {
	FormDataBase,
	FormDataRequired,
	schemaBase,
	schemaRequired
} from './utils/schema'

export default function NutritionalDataForm({
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
		<div className={`nutritional-data-form ${className}`}>
			<Typography className='nutritional-data-form-title' variant='h3'>
				{t('nutritionalDataForm.title')}
			</Typography>
			<form
				className='nutritional-data-form-container'
				onSubmit={handleSubmit(onSubmit)}>
				<SelectController
					control={control}
					selectProps={{ fullWidth: true, multiple: true }}
					label={t('form.allergyType')}
					name='allergyType'
					formControlProps={{ disabled: inputsDisabled }}
					options={[
						{
							value: 'gluten',
							label: t('form.allergyTypeValue.gluten')
						},
						{
							value: 'lactose',
							label: t('form.allergyTypeValue.lactose')
						},
						{
							value: 'peanuts',
							label: t('form.allergyTypeValue.peanuts')
						},
						{
							value: 'treeNuts',
							label: t('form.allergyTypeValue.treeNuts')
						},
						{
							value: 'shellfish',
							label: t('form.allergyTypeValue.shellfish')
						},
						{
							value: 'fish',
							label: t('form.allergyTypeValue.fish')
						},
						{
							value: 'soy',
							label: t('form.allergyTypeValue.soy')
						},
						{
							value: 'egg',
							label: t('form.allergyTypeValue.egg')
						},
						{
							value: 'wheat',
							label: t('form.allergyTypeValue.wheat')
						},
						{
							value: 'corn',
							label: t('form.allergyTypeValue.corn')
						}
					]}
				/>

				<RadioButtonController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.foodPreferences')}
					name='foodPreferences'
					options={[
						{
							label: 'form.foodPreferenceValues.VEGETARIAN',
							value: 'vegetarian'
						},
						{
							label: 'form.foodPreferenceValues.VEGAN',
							value: 'vegan'
						},
						{
							label: 'form.foodPreferenceValues.EVERYTHING',
							value: 'everything'
						}
					]}
				/>

				{!!customSubmit || (
					<LoadingButton
						disabled={isDisabled}
						loading={isDisabled}
						fullWidth
						size='large'
						type='submit'
						variant='contained'>
						{t('sportDataForm.save')}
					</LoadingButton>
				)}
			</form>
			{customSubmit}
		</div>
	)
}
