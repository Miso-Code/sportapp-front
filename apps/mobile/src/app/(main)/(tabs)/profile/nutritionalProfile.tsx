import SquaredButton from '@/components/SquaredButton'
import { useUserStore, useAlertStore } from '@sportapp/stores'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { View, StyleSheet, ScrollView } from 'react-native'
import {
	ActivityIndicator,
	Text,
	Checkbox,
	RadioButton,
	MD3Theme,
	useTheme
} from 'react-native-paper'

const NutritionalProfile: React.FC = () => {
	const theme = useTheme()
	const styles = createStyles(theme)
	const { t } = useTranslation()
	const {
		user,
		getAllNutritionalLimitations,
		getNutrition,
		updateNutrition
	} = useUserStore()
	const { setAlert } = useAlertStore()

	const [isEditing, setIsEditing] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showActivityIndicator, setShowActivityIndicator] = useState(true)

	const [alergies, setAlergies] = useState(
		user?.nutritionData?.nutritional_limitations ?? []
	)
	const [preferredDiet, setPreferredDiet] = useState(
		user?.nutritionData?.food_preference ?? ''
	)

	const handleLimitationToggle = (limitationId: string) => {
		if (alergies.includes(limitationId)) {
			setAlergies(alergies.filter((id) => id !== limitationId))
		} else {
			setAlergies([...alergies, limitationId])
		}
	}

	const handleUpdateNutritionalProfile = async () => {
		// Update user data
		setIsLoading(true)
		setIsEditing(false)
		await updateNutrition({
			nutritional_limitations: alergies,
			food_preference: preferredDiet
		})
		setIsLoading(false)
		setAlert({
			message: t('nutritionalDataForm.success'),
			type: 'success'
		})
	}

	useEffect(() => {
		;(async () => {
			setShowActivityIndicator(true)
			await getAllNutritionalLimitations()
			await getNutrition()
			setShowActivityIndicator(false)
		})()
	}, [getAllNutritionalLimitations, getNutrition])

	useEffect(() => {
		if (user.nutritionData && user.nutritionalLimitations) {
			setAlergies(user.nutritionData.nutritional_limitations)
			setPreferredDiet(user.nutritionData.food_preference)
		}
	}, [user.nutritionData, user.nutritionalLimitations])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{showActivityIndicator ? (
				<ActivityIndicator size='large' />
			) : (
				<View style={styles.wrapper}>
					<Text
						variant='titleSmall'
						style={!isEditing ? styles.disabled : {}}>
						{t('form.allergyType')}
					</Text>
					{user.nutritionalLimitations.map((limitation, index) => (
						<View style={styles.row} key={'limitation' + index}>
							<Checkbox.Android
								status={
									alergies.includes(limitation.limitation_id)
										? 'checked'
										: 'unchecked'
								}
								onPress={() =>
									handleLimitationToggle(
										limitation.limitation_id
									)
								}
								disabled={!isEditing}
							/>
							<Text
								onPress={() =>
									handleLimitationToggle(
										limitation.limitation_id
									)
								}
								disabled={!isEditing}>
								{t(`form.allergyTypeValue.${limitation.name}`)}
							</Text>
						</View>
					))}
					<Text
						variant='titleSmall'
						style={!isEditing ? styles.disabled : {}}>
						{t('form.foodPreferences')}
					</Text>
					<RadioButton.Group
						onValueChange={setPreferredDiet}
						value={preferredDiet}>
						<View style={styles.row}>
							<RadioButton.Android
								value='vegetarian'
								status={
									preferredDiet === 'vegetarian'
										? 'checked'
										: 'unchecked'
								}
								disabled={!isEditing}
							/>
							<Text
								onPress={() => setPreferredDiet('vegetarian')}
								disabled={!isEditing}>
								{t('form.foodPreferenceValues.VEGETARIAN')}
							</Text>
						</View>
						<View style={styles.row}>
							<RadioButton.Android
								value='vegan'
								status={
									preferredDiet === 'vegan'
										? 'checked'
										: 'unchecked'
								}
								disabled={!isEditing}
							/>
							<Text
								onPress={() => setPreferredDiet('vegan')}
								disabled={!isEditing}>
								{t('form.foodPreferenceValues.VEGAN')}
							</Text>
						</View>
						<View style={styles.row}>
							<RadioButton.Android
								value='everything'
								status={
									preferredDiet === 'everything'
										? 'checked'
										: 'unchecked'
								}
								disabled={!isEditing}
							/>
							<Text
								onPress={() => setPreferredDiet('everything')}
								disabled={!isEditing}>
								{t('form.foodPreferenceValues.EVERYTHING')}
							</Text>
						</View>
					</RadioButton.Group>

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
								? handleUpdateNutritionalProfile()
								: setIsEditing(true)
						}
						loading={isLoading}
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
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 10
		},
		disabled: {
			color: theme.colors.onSurfaceDisabled
		}
	})

export default NutritionalProfile
