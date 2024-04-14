import React from 'react'
import dayjs from 'dayjs'
import { StyleSheet } from 'react-native'
import { Card, Text, Chip, useTheme, MD3Theme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

interface TrainingCardProps {
	date: Date
	title: string
	description: string
}

const TrianingCard: React.FC<TrainingCardProps> = ({
	date,
	title,
	description
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
				<Text variant='titleLarge' style={styles.cardTitle}>
					{title}
				</Text>
				<Text variant='bodyMedium'>
					{description ||
						'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'}
				</Text>
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
		}
	})

export default TrianingCard
