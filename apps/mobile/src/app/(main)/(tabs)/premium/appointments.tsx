import { useSportsmanStore } from '@sportapp/stores'
import React, { useEffect, useMemo } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

import AppointmentCard from '@/components/AppointmentCard'

const Appoitnments: React.FC = () => {
	const {
		sportsmanAppointments,
		getAllSportsmanAppointments,
		loading,
		getAllTrainers,
		trainers
	} = useSportsmanStore()

	const trainersMap = useMemo(
		() =>
			trainers.length
				? trainers.reduce((acc, trainer) => {
						acc[trainer.trainer_id] =
							trainer.first_name + ' ' + trainer.last_name
						return acc
				  }, {})
				: {},
		[trainers]
	)

	useEffect(() => {
		;(async () => {
			await getAllSportsmanAppointments()
			await getAllTrainers()
		})()
	}, [getAllSportsmanAppointments, getAllTrainers])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.wrapper}>
					{sportsmanAppointments?.map((appointment) => (
						<AppointmentCard
							key={appointment.appointment_id}
							date={appointment.appointment_date}
							trainer={trainersMap[appointment.trainer_id]}
							type={appointment.appointment_type}
							location={appointment.appointment_location}
						/>
					))}
				</View>
			)}
		</ScrollView>
	)
}

const styles = StyleSheet.create({
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
	}
})

export default Appoitnments
