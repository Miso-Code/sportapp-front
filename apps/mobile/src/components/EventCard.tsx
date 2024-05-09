import React from 'react'
import dayjs from 'dayjs'
import { StyleSheet, View } from 'react-native'
import { Card, Text, Chip, useTheme, MD3Theme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

interface EventCardProps {
	date: string
	title: string
	description: string
}

const EventCard: React.FC<EventCardProps> = ({ date, title, description }) => {
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
				<View style={styles.eventInfo}>
					<Text variant='titleMedium'>{title}</Text>
					<Text variant='bodyMedium'>{description}</Text>
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
		eventInfo: {
			marginVertical: 10,
			gap: 10
		}
	})

export default EventCard
