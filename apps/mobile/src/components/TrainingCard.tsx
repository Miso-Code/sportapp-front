import React from 'react'
import dayjs from 'dayjs'
import { StyleSheet, View } from 'react-native'
import { Card, Text, Chip, useTheme, MD3Theme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

import { useTrainingPlanStore } from "@sportapp/stores";

type TrainingPlanSession = Parameters<Parameters<typeof useTrainingPlanStore>[0]>[0]["trainingPlanSessions"][number];

interface TrainingCardProps {
	date: Date
	trainingSession: TrainingPlanSession
}

const TrianingCard: React.FC<TrainingCardProps> = ({
	date,
	trainingSession
}) => {
	const theme = useTheme()
	const styles = createStyles(theme)
	const { t, i18n } = useTranslation()

	const parsedDate = dayjs(date).locale(i18n.language).format('DD MMMM YYYY')

	const isUpcoming = dayjs(date).isAfter(dayjs(), 'days')

	return (
		<Card elevation={1} style={styles.card}>
			<Card.Content>
				<Text variant='labelLarge' style={styles.dateLabel}>
					{parsedDate}
				</Text>
				<Text variant='labelLarge' style={styles.dateLabel}>
					{trainingSession?.start_time}
				</Text>
				<View style={styles.trainingInfo}>
					<View style={styles.trainingDetail}>
						<Text variant='titleSmall'>
							{t('training.warmUp')}
						</Text>
						<Text variant='bodyMedium'>
							{(trainingSession?.warm_up * 60).toFixed(0)} {t('training.minutes')}
						</Text>
					</View>
					<View style={styles.trainingDetail}>
						<Text variant='titleSmall'>
							{t('training.cardio')}
						</Text>
						<Text variant='bodyMedium'>
							{(trainingSession?.cardio * 60).toFixed(0)} {t('training.minutes')}
						</Text>
					</View>
					<View style={styles.trainingDetail}>
						<Text variant='titleSmall'>
							{t('training.strength')}
						</Text>
						<Text variant='bodyMedium'>
							{(trainingSession?.strength * 60).toFixed(0)} {t('training.minutes')}
						</Text>
					</View>
					<View style={styles.trainingDetail}>
						<Text variant='titleSmall'>
							{t('training.coolDown')}
						</Text>
						<Text variant='bodyMedium'>
							{(trainingSession?.cool_down * 60).toFixed(0)} {t('training.minutes')}
						</Text>
					</View>
					<View style={styles.trainingDetail}>
						<Text variant='titleMedium'>
							{t('training.totalDuration')}
						</Text>
						<Text variant='bodyLarge'>
							{(trainingSession?.cardio +
								trainingSession?.cool_down +
								trainingSession?.strength +
								trainingSession?.warm_up).toFixed(1)} {t('training.hours')}
						</Text>
					</View>
				</View>
				<Chip
					testID='chip'
					style={isUpcoming ? styles.chipUpcoming : styles.chipToday}
					textStyle={
						isUpcoming
							? styles.chipUpcomingText
							: styles.chipTodayText
					}
					compact>
					{t(isUpcoming ? 'training.upcoming' : 'training.today')}
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
		dateLabel: {
			opacity: 0.5
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

		chipUpcoming: {
			right: 10,
			top: 10,
			position: 'absolute',
			borderWidth: 1,
			borderColor: theme.colors.error,
			backgroundColor: theme.colors.errorContainer,
			borderRadius: 50
		},
		chipTodayText: {
			color: theme.colors.primary
		},
		chipUpcomingText: {
			color: theme.colors.error
		},
		trainingInfo: {
			marginVertical: 10,
		},
		trainingDetail: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			marginVertical: 5
		}
	})

export default TrianingCard
