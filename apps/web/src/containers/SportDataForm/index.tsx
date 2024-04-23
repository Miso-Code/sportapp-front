import SelectController from '@/components/Inputs/SelectController'
import TextFieldController from '@/components/Inputs/TexFieldController'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingButton from '@mui/lab/LoadingButton'

import {
	Button,
	Card,
	CardContent,
	Divider,
	List,
	ListItem,
	TextField,
	Typography
} from '@mui/material'
import { useSportStore } from '@sportapp/stores/src/sport'
import { Props } from 'containers/SportDataForm/interfaces'
import { useCallback, useEffect, useMemo } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import {
	FormDataBase,
	FormDataRequired,
	schemaBase,
	schemaRequired
} from './utils/schema'
import { useUserStore } from '@sportapp/stores/src/user'
import TimePickerController from '@/components/Inputs/TimePickerController'
import DaysOfTheWeekController from '@/components/Inputs/DaysOfTheWeekController'

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
	const { getSports } = useSportStore()
	const { user } = useUserStore()
	const { sports } = useSportStore()
	const { handleSubmit, control, register } = useForm({
		resolver: yupResolver(isRequired ? schemaRequired : schemaBase),
		defaultValues: {
			...defaultValues
		},
		values: {
			weight: user?.sportData?.weight ?? 0,
			height: user?.sportData?.height ?? 0,
			imc: user?.sportData?.bmi ?? 0,
			weekdays: user?.sportData?.available_weekdays ?? [],
			preferedTrainingStartTime:
				user?.sportData?.preferred_training_start_time ?? '',
			trainingObjective: user?.sportData?.training_objective ?? '',
			favouriteSportId: user?.sportData?.favourite_sport_id ?? '',
			availableTrainingHoursPerDay:
				user?.sportData?.available_training_hours ?? 0,
			limitations: user?.sportData?.training_limitations ?? []
		},
		mode: 'onChange'
	})
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'limitations'
	})

	const onSubmit = (data: FormDataRequired | FormDataBase) => {
		handleCustomSubmit(data)
	}

	const handleGetSports = useCallback(async () => {
		await getSports()
	}, [getSports])

	const getFormatSport = useMemo(() => {
		if (Array.isArray(sports))
			return sports.map((sport) => ({
				label: sport.name,
				value: sport.sport_id
			}))
		else return []
	}, [sports])

	useEffect(() => {
		handleGetSports()
	}, [handleGetSports])

	return (
		<div className={`personal-data-form ${className}`}>
			<Typography className='personal-data-form-title' variant='h3'>
				{t('sportDataForm.title')}
			</Typography>
			<form
				className='personal-data-form-container'
				onSubmit={handleSubmit(onSubmit)}>
				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={t('form.favouriteSport')}
					name='favouriteSportId'
					formControlProps={{ disabled: inputsDisabled }}
					options={getFormatSport}
				/>

				<SelectController
					control={control}
					selectProps={{ fullWidth: true }}
					label={t('form.trainingObjective')}
					name='trainingObjective'
					formControlProps={{ disabled: inputsDisabled }}
					options={[
						{
							label: 'form.trainingObjectiveValue.build_muscle_mass',
							value: 'build_muscle_mass'
						},
						{
							label: 'form.trainingObjectiveValue.lose_weight',
							value: 'lose_weight'
						},
						{
							label: 'form.trainingObjectiveValue.tone_up',
							value: 'tone_up'
						},
						{
							label: 'form.trainingObjectiveValue.maintain_fitness',
							value: 'maintain_fitness'
						}
					]}
				/>

				<DaysOfTheWeekController
					control={control}
					disabled={inputsDisabled}
					name='weekdays'
					label={t('form.daysOfTheWeek')}
				/>

				<TimePickerController
					control={control}
					disabled={inputsDisabled}
					name='preferedTrainingStartTime'
					label={t('form.preferedTrainingStartTime')}
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.availableTrainingHoursPerDay')}
					inputProps={{ endAdornment: 'h' }}
					name='availableTrainingHoursPerDay'
					type='number'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					label={t('form.weight')}
					inputProps={{ endAdornment: 'kg' }}
					name='weight'
					type='number'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled={inputsDisabled}
					inputProps={{ endAdornment: 'm' }}
					label={t('form.height')}
					name='height'
					type='number'
				/>

				<TextFieldController
					control={control}
					fullWidth
					disabled
					inputProps={{ endAdornment: '%' }}
					label={t('form.imc')}
					name='imc'
					type='number'
				/>

				<Card className='w-full'>
					<CardContent>
						<Typography
							color={inputsDisabled ? 'GrayText' : 'InfoText'}
							variant='subtitle2'
							className='mb-2'>
							{t('form.limitations')}
						</Typography>
						<List>
							{fields.map((field, index) => (
								<>
									<Divider component='li' className='mb-4' />
									<Typography
										variant='caption'
										color={
											inputsDisabled
												? 'GrayText'
												: 'InfoText'
										}
										className='mb-2'>
										{`${t(
											'form.limitation'
										).toLowerCase()} #${index + 1}:`}
									</Typography>
									<ListItem className='pl-4 flex-col'>
										<div
											key={field.id}
											className='flex flex-col gap-4 mb-2 w-full'>
											<TextField
												{...register(
													`limitations.${index}.name`
												)}
												fullWidth
												disabled={inputsDisabled}
												label={t(
													'form.limitationsLabels.name'
												)}
												name={`limitations.${index}.name`}
											/>
											<TextField
												{...register(
													`limitations.${index}.description`
												)}
												fullWidth
												disabled={inputsDisabled}
												label={t(
													'form.limitationsLabels.description'
												)}
												name={`limitations.${index}.description`}
											/>
										</div>
										<Button
											color='error'
											type='button'
											disabled={inputsDisabled}
											onClick={() => remove(index)}>
											{`${t(
												'form.limitationsLabels.remove'
											)} #${index + 1}`}
										</Button>
									</ListItem>
								</>
							))}
						</List>

						<Button
							type='button'
							color='success'
							disabled={inputsDisabled}
							onClick={() =>
								append({ description: '', name: '' })
							}>
							{t('form.limitationsLabels.add')}
						</Button>
					</CardContent>
				</Card>

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
