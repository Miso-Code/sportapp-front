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
import { useCallback, useEffect, useMemo } from 'react'
import { useUserStore } from '@sportapp/stores/src/user'

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
	const { getAllNutritionalLimitations } = useUserStore()
	const { user } = useUserStore()
	const { handleSubmit, control } = useForm({
		resolver: yupResolver(isRequired ? schemaRequired : schemaBase),
		defaultValues: {
			...defaultValues
		},
		mode: 'onChange'
	})

	const handleGetAsyncData = useCallback(async () => {
		await getAllNutritionalLimitations()
	}, [getAllNutritionalLimitations])

	const onSubmit = (data: FormDataRequired | FormDataBase) => {
		handleCustomSubmit(data)
	}

	const getFormatNutritionalLimitations = useMemo(() => {
		if (Array.isArray(user?.nutritionalLimitations))
			return user?.nutritionalLimitations.map((limitation) => ({
				label: t(`form.allergyTypeValue.${limitation.name}`),
				value: limitation.limitation_id
			}))
		else return []
	}, [t, user?.nutritionalLimitations])

	useEffect(() => {
		handleGetAsyncData()
	}, [handleGetAsyncData])

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
					options={getFormatNutritionalLimitations}
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
