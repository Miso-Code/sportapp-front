import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'

import { View, StyleSheet, ScrollView } from 'react-native'
import { TextInput, Text, ActivityIndicator } from 'react-native-paper'
import { DatePickerInput } from 'react-native-paper-dates'
import { useAlertStore, useSportsmanStore } from '@sportapp/stores'

import Dropdown from '@/components/Dropdown'
import SquaredButton from '@/components/SquaredButton'
import TimePicker from '@/components/TimePicker'

import { router } from 'expo-router'

const CreateVirtualAppointment: React.FC = () => {
	const { t, i18n } = useTranslation()
	const {
		trainers = [],
		loading,
		getAllTrainers,
		addSportsmanAppointment
	} = useSportsmanStore()

	const { setAlert } = useAlertStore()

	const [date, setDate] = useState<Date>()
	const [time, setTime] = useState<string>()
	const [selectedTrainer, setSelectedTrainer] = useState<string>()
	const [description, setDescription] = useState<string>()

	const handleCreateVirtualAppointment = async () => {
		const appointmentDateString = `${dayjs(date).format(
			'YYYY-MM-DD'
		)} ${time}`
		const appointmentDate = dayjs(
			appointmentDateString,
			'YYYY-MM-DD hh:mm A'
		).toDate()
		const response = await addSportsmanAppointment({
			appointment_date: appointmentDate.toISOString(),
			appointment_type: 'virtual',
			trainer_id: selectedTrainer,
			appointment_reason: description
		})

		if (response) {
			setAlert({
				type: 'success',
				message: t('preference.success')
			})
			router.push('/premium/appointments')
		} else {
			setAlert({
				type: 'error',
				message: t('preference.error')
			})
		}
	}

	useEffect(() => {
		;(async () => {
			await getAllTrainers()
		})()
	}, [getAllTrainers])

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.wrapper}>
					<View style={styles.form}>
						<Text variant='titleMedium'>
							{t('preference.form.virtualAppointment.title')}
						</Text>
						<DatePickerInput
							testID='date-picker-appointment-date'
							locale={i18n.language}
							label={t('form.training.date')}
							value={date}
							onChange={setDate}
							inputMode='start'
							mode='outlined'
						/>
						<TimePicker
							testID='time-picker-appointment-time'
							mode='outlined'
							label={t('form.training.time')}
							value={time}
							onChangeText={setTime}
						/>
						<Dropdown
							testID='dropdown-trainer'
							label={t('form.training.trainer')}
							items={trainers.map((trainer) => ({
								label:
									trainer.first_name +
									' ' +
									trainer.last_name,
								value: trainer.trainer_id
							}))}
							value={selectedTrainer}
							onSelect={setSelectedTrainer}
						/>
						<TextInput
							testID='input-description'
							mode='outlined'
							label={t('form.training.description')}
							numberOfLines={3}
							multiline
							value={description}
							onChangeText={setDescription}
						/>
						<SquaredButton
							value={t('form.schedule')}
							onPress={handleCreateVirtualAppointment}
							disabled={
								!date ||
								!time ||
								!selectedTrainer ||
								!description
							}
						/>
					</View>
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
	},
	form: {
		borderWidth: 1,
		borderColor: 'gray',
		padding: 15,
		borderRadius: 5,
		gap: 10
	}
})

export default CreateVirtualAppointment
