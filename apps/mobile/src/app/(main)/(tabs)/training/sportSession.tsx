import React, { useState, useEffect, useCallback } from 'react'

import { View, Text, StyleSheet } from 'react-native'

import { IconButton } from 'react-native-paper'

import TimeRing from '@/components/TimerRing'
import { usePedometer } from '@/hooks/usePedometer'
import { useLocation } from '@/hooks/useLocation'
import {
	useAuthStore,
	useSportSessionStore,
	useSportStore
} from '@sportapp/stores'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'

const SportSession: React.FC = () => {
	const { user } = useAuthStore()
	const { startSportSession, finishSportSession, addSessionLocation } =
		useSportSessionStore()
	const { getSports, sports } = useSportStore()

	const { t } = useTranslation()

	const { isPedometerAvailable, currentStepCount } = usePedometer()
	const { locationUpdates, isLocationAvailable } = useLocation()

	const [currentTime, setCurrentTime] = useState(0)
	const [maxTime] = useState(60)

	const [startedAt, setStartedAt] = useState<Date>(new Date())

	const [isRunning, setIsRunning] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
		null
	)

	const [sessionID, setSessionID] = useState<string | null>(null)

	const startTimer = () => {
		const currentTimer = setInterval(() => {
			setCurrentTime((time) => time + 1)
		}, 1000)
		setTimer(currentTimer)
	}

	const handleStart = async () => {
		setCurrentTime(0)
		setIsRunning(true)
		setIsPaused(false)
		setStartedAt(new Date())
		startTimer()

		const initial_location = isLocationAvailable
			? {
					...locationUpdates[0].coords,
					altitude_accuracy:
						locationUpdates[0].coords.altitudeAccuracy
			  }
			: {
					latitude: 0,
					longitude: 0,
					altitude: 0,
					accuracy: 0,
					altitude_accuracy: 0,
					heading: 0,
					speed: 0
			  }

		const response = await startSportSession({
			user_id: user.id,
			sport_id: sports.length ? sports[0].sport_id : '',
			started_at: startedAt.toISOString(),
			initial_location
		})

		if (typeof response === 'object') {
			setSessionID(response.session_id)
		}
	}

	const handlePause = () => {
		setIsPaused(true)
		if (timer) {
			clearInterval(timer)
		}
	}

	const handleContinue = () => {
		setIsPaused(false)
		startTimer()
	}

	const handleStop = useCallback(async () => {
		if (timer) {
			clearInterval(timer)
		}
		setCurrentTime(0)
		setIsRunning(false)

		if (!sessionID) {
			return
		}

		const payload: Parameters<typeof finishSportSession>[0] = {
			session_id: sessionID,
			duration: currentTime,
			steps: 0
		}
		if (isPedometerAvailable) {
			payload.steps = currentStepCount
		}
		await finishSportSession(payload)

		router.push('training/sportSessionSummary')
	}, [
		timer,
		currentTime,
		isPedometerAvailable,
		currentStepCount,
		finishSportSession,
		sessionID
	])

	useEffect(() => {
		if (currentTime >= maxTime) {
			handleStop()
		}
	}, [currentTime, maxTime, handleStop])

	useEffect(() => {
		if (isRunning && isLocationAvailable && sessionID) {
			;(async () => {
				const lastLocation = locationUpdates[locationUpdates.length - 1]
				const location = {
					...lastLocation.coords,
					altitude_accuracy: lastLocation.coords.altitudeAccuracy
				}
				addSessionLocation({
					session_id: sessionID,
					...location
				})
			})()
		}
	}, [
		locationUpdates,
		isLocationAvailable,
		isRunning,
		sessionID,
		addSessionLocation
	])

	useEffect(() => {
		return () => {
			if (timer) {
				clearInterval(timer)
			}
		}
	}, [timer])

	useEffect(() => {
		getSports()
	}, [getSports])

	return (
		<View style={styles.container}>
			<TimeRing currentTime={currentTime} maxTime={maxTime} />
			<View style={styles.actionsContainer}>
				{!isRunning && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='play'
							mode='contained'
							onPress={handleStart}
							testID='startButton'
						/>
						<Text>{t('training.start')}</Text>
					</View>
				)}
				{isRunning && !isPaused && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='pause'
							mode='contained'
							onPress={handlePause}
							testID='pauseButton'
						/>
						<Text>{t('training.pause')}</Text>
					</View>
				)}
				{isRunning && isPaused && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='play'
							mode='contained'
							onPress={handleContinue}
							testID='continueButton'
						/>
						<Text>{t('training.resume')}</Text>
					</View>
				)}
				{isRunning && (
					<View style={styles.button}>
						<IconButton
							size={36}
							icon='stop'
							mode='contained'
							onPress={handleStop}
							testID='stopButton'
						/>
						<Text>{t('training.stop')}</Text>
					</View>
				)}
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 40
	},
	button: {
		alignItems: 'center'
	}
})

export default SportSession
