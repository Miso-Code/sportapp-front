import React, { useEffect, useState } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'
import {
	Text,
	Surface,
	TextInput,
	Divider,
	Button,
	useTheme,
	MD3Theme,
	ActivityIndicator
} from 'react-native-paper'

import { useUserStore, useAlertStore, useSportStore } from '@sportapp/stores'

import Dropdown from '@/components/Dropdown'
import { useTranslation } from 'react-i18next'
import SquaredButton from '@/components/SquaredButton'
import TimePicker from '@/components/TimePicker'
import DayOfTheWeekInput from '@/components/DayOfTheWeekInput'

const SportsProfile: React.FC = () => {
	const theme = useTheme()
	const styles = createStyles(theme)
	const { t } = useTranslation()

	const { sports, getSports } = useSportStore()
	const { user, getSport, updateSport } = useUserStore()
	const { setAlert } = useAlertStore()

	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showActivityIndicator, setShowActivityIndicator] = useState(true)

	const [trainingObjective, setTrainingObjective] = useState(
		user?.sportData?.training_objective ?? ''
	)
	const [weight, setWeight] = useState(
		user?.sportData?.weight.toString() ?? '0'
	)
	const [height, setHeight] = useState(
		user?.sportData?.height.toString() ?? '0'
	)
	const [availableTrainingHours, setAvailableTrainingHours] = useState(
		user?.sportData?.available_training_hours.toString() ?? '0'
	)
	const [availableWeekdays, setAvailableWeekdays] = useState(
		user?.sportData?.available_weekdays ?? []
	)
	const [preferredTrainingStartTime, setPreferredTrainingStartTime] =
		useState(user?.sportData?.preferred_training_start_time ?? '')
	const [trainingLimitations, setTrainingLimitations] = useState<
		Partial<(typeof user)['sportData']['training_limitations'][number]>[]
	>(user?.sportData?.training_limitations ?? [])
	const [bmi] = useState(user?.sportData?.bmi ?? 0)
	const [favouriteSportId, setFavouriteSportId] = useState(
		user?.sportData?.favourite_sport_id ?? ''
	)

	const handleUpdateSportsProfile = async () => {
		setIsLoading(true)
		setIsEditing(false)
		await updateSport({
			training_objective: trainingObjective,
			weight: parseFloat(weight),
			height: parseFloat(height),
			available_training_hours: parseFloat(availableTrainingHours),
			available_weekdays: availableWeekdays,
			preferred_training_start_time: preferredTrainingStartTime,
			training_limitations:
				trainingLimitations as (typeof user)['sportData']['training_limitations'],
			favourite_sport_id: favouriteSportId
		})
		setIsLoading(false)
		setAlert({
			message: t('sportDataForm.success'),
			type: 'success'
		})
	}

	const addLimitationHandler = () => {
		setTrainingLimitations([
			...trainingLimitations,
			{ name: '', description: '' }
		])
	}

	const removeLimitationHandler = (index: number) => {
		setTrainingLimitations(
			[...trainingLimitations].filter((_, i) => i !== index)
		)
	}

	const updateLimitationHandler = (
		index: number,
		key: string,
		value: string
	) => {
		const updatedLimitations = [...trainingLimitations]
		updatedLimitations[index][key] = value
		setTrainingLimitations(updatedLimitations)
	}

	useEffect(() => {
		;(async () => {
			await getSports()
			await getSport()
			setShowActivityIndicator(false)
		})()
	}, [getSports, getSport])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{showActivityIndicator ? (
				<ActivityIndicator size='large' />
			) : (
				<View style={styles.wrapper}>
					<Dropdown
						testID='dropdown-favourite-sport'
						items={
							sports
								? sports.map((sport) => ({
										label: t(sport.name),
										value: sport.sport_id
								  }))
								: []
						}
						label={t('form.favouriteSport')}
						value={favouriteSportId}
						onSelect={setFavouriteSportId}
						disabled={!isEditing}
					/>
					<Dropdown
						testID='dropdown-training-objective'
						items={[
							{
								label: t(
									'form.trainingObjectiveValue.build_muscle_mass'
								),
								value: 'build_muscle_mass'
							},
							{
								label: t(
									'form.trainingObjectiveValue.lose_weight'
								),
								value: 'lose_weight'
							},
							{
								label: t('form.trainingObjectiveValue.tone_up'),
								value: 'tone_up'
							},
							{
								label: t(
									'form.trainingObjectiveValue.maintain_fitness'
								),
								value: 'maintain_fitness'
							}
						]}
						label={t('form.trainingObjective')}
						value={trainingObjective}
						onSelect={setTrainingObjective}
						disabled={!isEditing}
					/>
					<DayOfTheWeekInput
						label={t('form.daysOfTheWeek')}
						value={availableWeekdays}
						onChange={setAvailableWeekdays}
						disabled={!isEditing}
					/>
					<TimePicker
						testID='time-picker-preferred-training-start-time'
						mode='outlined'
						label={t('form.preferedTrainingStartTime')}
						value={preferredTrainingStartTime}
						onChangeText={setPreferredTrainingStartTime}
						disabled={!isEditing}
					/>
					<TextInput
						testID='text-input-available-training-hours'
						label={t('form.availableTrainingHoursPerDay')}
						value={availableTrainingHours}
						onChangeText={setAvailableTrainingHours}
						mode='outlined'
						disabled={!isEditing}
						right={<TextInput.Affix text='h' />}
					/>
					<TextInput
						testID='text-input-weight'
						label={t('form.weight')}
						value={weight}
						onChangeText={setWeight}
						mode='outlined'
						disabled={!isEditing}
						right={<TextInput.Affix text='kg' />}
					/>
					<TextInput
						testID='text-input-height'
						label={t('form.height')}
						value={height}
						onChangeText={setHeight}
						mode='outlined'
						disabled={!isEditing}
						right={<TextInput.Affix text='m' />}
					/>
					<TextInput
						testID='text-input-bmi'
						label={t('form.imc')}
						value={bmi.toString()}
						mode='outlined'
						disabled
						right={<TextInput.Affix text='%' />}
					/>

					<Surface style={styles.limitationsContainer}>
						<Text
							variant='titleSmall'
							style={!isEditing && styles.disabled}>
							{t('form.limitations')}
						</Text>
						<Divider />
						{trainingLimitations.map((limitation, index) => (
							<React.Fragment key={'limitation' + index}>
								<Text style={!isEditing && styles.disabled}>
									{t(`form.limitation`) + ' #' + (index + 1)}
								</Text>
								<View style={styles.limitationContainer}>
									<TextInput
										testID='text-input-limitation-name'
										label={t('form.limitationsLabels.name')}
										value={limitation.name}
										onChangeText={(value) =>
											updateLimitationHandler(
												index,
												'name',
												value
											)
										}
										mode='outlined'
										disabled={!isEditing}
									/>
									<TextInput
										testID='text-input-limitation-description'
										label={t(
											'form.limitationsLabels.description'
										)}
										value={limitation.description}
										onChangeText={(value) =>
											updateLimitationHandler(
												index,
												'description',
												value
											)
										}
										mode='outlined'
										disabled={!isEditing}
									/>
									<Button
										testID='button-remove-limitation'
										disabled={!isEditing}
										textColor={theme.colors.error}
										onPress={() =>
											removeLimitationHandler(index)
										}>
										{t('form.limitationsLabels.remove') +
											' #' +
											(index + 1)}
									</Button>
								</View>
							</React.Fragment>
						))}
						<Divider />
						<Button
							testID='button-add-limitation'
							disabled={!isEditing}
							onPress={addLimitationHandler}>
							{t('form.limitationsLabels.add')}
						</Button>
					</Surface>

					<SquaredButton
						value={
							isLoading
								? ''
								: isEditing
								? t('personalDataForm.save')
								: t('personalDataForm.edit')
						}
						onPress={() =>
							isLoading
								? {}
								: isEditing
								? handleUpdateSportsProfile()
								: setIsEditing(true)
						}
						loading={isLoading}
						disabled={
							isEditing &&
							(!trainingObjective ||
								!weight ||
								!height ||
								!availableTrainingHours ||
								!availableWeekdays.length ||
								!preferredTrainingStartTime ||
								!trainingLimitations.length ||
								!favouriteSportId)
						}
					/>
					{isEditing && (
						<SquaredButton
							value={t('personalDataForm.cancel')}
							onPress={() => setIsEditing(false)}
							mode='outlined'
						/>
					)}
				</View>
			)}
		</ScrollView>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		container: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 15,
			marginTop: 120
		},
		wrapper: {
			width: '100%',
			gap: 10,
			marginBottom: 200
		},
		limitationsContainer: {
			padding: 10,
			gap: 10,
			backgroundColor: 'white'
		},
		limitationContainer: {
			gap: 10,
			paddingHorizontal: 10
		},
		disabled: {
			color: theme.colors.onSurfaceDisabled
		}
	})

export default SportsProfile
