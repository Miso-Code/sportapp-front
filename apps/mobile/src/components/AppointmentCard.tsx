import React from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import { View, StyleSheet } from 'react-native'
import { Card, Text, Button } from 'react-native-paper'

interface AppointmentCardProps {
	date: string
	trainer: string
	type: string
	location: string
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
	date,
	trainer,
	type,
	location,
	...props
}) => {
	const { t } = useTranslation()
	return (
		<Card elevation={1} style={styles.card} {...props}>
			<Card.Content style={styles.cardContent}>
				<Text variant='labelMedium'>
					{dayjs(date).format('DD/MM/YYYY hh:mm A')}
				</Text>
				<Text variant='titleMedium' style={styles.cardTitle}>
					{trainer}
				</Text>
				<Text variant='bodyMedium'>
					Tipo: {t(`preference.types.${type}`)}
				</Text>

				<View style={styles.chipContainer}>
					{type === 'virtual' ? (
						<Button mode='contained' onPress={() => {}} disabled>
							Ir a la cita
						</Button>
					) : (
						<Text testID='location' variant='bodyMedium'>
							Ubicación: {location}
						</Text>
					)}
				</View>
			</Card.Content>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#f2f2f2',
		width: '100%'
	},
	cardTitle: {
		fontWeight: 'bold'
	},
	cardContent: {
		justifyContent: 'center',
		marginTop: 10
	},
	chipContainer: {
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginTop: 10
	}
})

export default AppointmentCard
