import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Text, Chip, useTheme, MD3Theme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

interface DishCardProps {
	title: string
	weekday: string
	category: string
	calories: number
	protein: number
	carbs: number
	fats: number
}

const DishCard: React.FC<DishCardProps> = ({
	title,
	weekday,
	category,
	calories,
	protein,
	carbs,
	fats
}) => {
	const theme = useTheme()
	const styles = createStyles(theme)
	const { t } = useTranslation()

	return (
		<Card elevation={1} style={styles.card}>
			<Card.Content>
				<Text variant='labelLarge' style={styles.label}>
					{t(`nutritionalPlan.weekday.${weekday}`)}
				</Text>
				<Text variant='titleLarge' style={styles.cardTitle}>
					{title}
				</Text>
				<View style={styles.wrap}>
					<Chip compact disabled mode='outlined'>
						{calories} {t(`nutritionalPlan.macros.calories`)}
					</Chip>
					<Chip compact disabled mode='outlined'>
						{carbs}g {t(`nutritionalPlan.macros.of_carbs`)}
					</Chip>
					<Chip compact disabled mode='outlined'>
						{protein}g {t(`nutritionalPlan.macros.of_proteins`)}
					</Chip>
					<Chip compact disabled mode='outlined'>
						{fats}g {t(`nutritionalPlan.macros.of_fats`)}
					</Chip>
				</View>
				<Chip
					testID='chip'
					style={styles.chipToday}
					textStyle={styles.chipTodayText}
					compact>
					{t(`nutritionalPlan.dishType.${category}`)}
				</Chip>
			</Card.Content>
		</Card>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		card: {
			backgroundColor: '#f2f2f2',
			paddingBottom: 10
		},
		cardTitle: {
			fontWeight: 'bold'
		},
		label: {
			opacity: 0.5,
			marginBottom: 10
		},
		chipToday: {
			right: 10,
			top: 10,
			position: 'absolute',
			borderWidth: 1,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.primaryContainer,
			borderRadius: 50
		},
		chipTodayText: {
			color: theme.colors.primary
		},
		wrap: {
			marginTop: 10,
			flexDirection: 'row',
			flexWrap: 'wrap',
			gap: 10
		}
	})

export default DishCard
