import dayjs from 'dayjs'
import 'dayjs/locale/en' // import English locale
import 'dayjs/locale/es' // import French locale
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // load isSameOrAfter plugin
import weekday from 'dayjs/plugin/weekday' // load weekday plugin

dayjs.extend(isSameOrAfter) // use isSameOrAfter plugin
dayjs.extend(weekday) // use weekday plugin

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react'

import { View, Text, StyleSheet } from 'react-native'

import { IconButton } from 'react-native-paper'

import TimeRing from '@/components/TimerRing'
import { usePedometer } from '@/hooks/usePedometer'
import { useLocation } from '@/hooks/useLocation'
import {
	useAuthStore,
	useSportSessionStore,
	useSportStore,
	useTrainingPlanStore,
	useAlertStore,
	useUserStore,
	useNutritionalPlanStore
} from '@sportapp/stores'
import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'

const SportSession: React.FC = () => {
	const { user: userAuth } = useAuthStore()
	const { user, getSport } = useUserStore()
	const { startSportSession, finishSportSession, addSessionLocation } =
		useSportSessionStore()
	const { setAlert } = useAlertStore()
	const { trainingPlanSessions } = useTrainingPlanStore()
	const { notifyCaloryIntake } = useNutritionalPlanStore()

	const trainingPlanSessionsMemo = useMemo(
		() => trainingPlanSessions,
		[trainingPlanSessions]
	)

	const { t } = useTranslation()

	const { isPedometerAvailable, currentStepCount } = usePedometer()
	const { locationUpdates, isLocationAvailable } = useLocation()

	const [currentTime, setCurrentTime] = useState(0)
	const [maxTime, setMaxTime] = useState(1_800) // 30 minutes

	const [startedAt, setStartedAt] = useState<Date>(new Date())

	const [isRunning, setIsRunning] = useState(false)
	const [isPaused, setIsPaused] = useState(false)

	const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
		null
	)

	const [sessionID, setSessionID] = useState<string | null>(null)

	const [plannedTrainingSession, setPlannedTrainingSession] = useState<typeof trainingPlanSessionsMemo[number] | null>()

	const motivationalInterval = useRef<ReturnType<typeof setInterval> | null>(
		null
	)
	const motivationalTimer = useRef<ReturnType<typeof setInterval> | null>(
		null
	)

	const currentStepCountRef = useRef(currentStepCount)
	const prevStepCountRef = useRef(0)

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
			user_id: userAuth.id,
			sport_id: user?.sportData?.favourite_sport_id || '',
			started_at: startedAt.toISOString(),
			initial_location
		})

		if (typeof response === 'object') {
			setSessionID(response.session_id)
		}
	}

	function calculateSessionCalories(weight, trainingSession) {
		const warmUpCaloriesBurned = trainingSession["warm_up"] * 2 * weight;
		const cardioCaloriesBurned = trainingSession["cardio"] * 3.5 * weight;
		const strengthCaloriesBurned = trainingSession["strength"] * 5.5 * weight;
		const coolDownCaloriesBurned = trainingSession["cool_down"] * 1.5 * weight;
		const totalCaloriesBurned = warmUpCaloriesBurned + cardioCaloriesBurned + strengthCaloriesBurned + coolDownCaloriesBurned;
		return Math.round(totalCaloriesBurned);
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
		const response = await finishSportSession(payload)

		const calories = response?.calories || 0
		const plannedCalories = calculateSessionCalories(user.sportData.weight, plannedTrainingSession)
		
		await notifyCaloryIntake({
			calories_burn: calories,
			calories_burn_expected: plannedCalories
		})

		router.push('training/sportSessionSummary')
	}, [
		timer,
		currentTime,
		isPedometerAvailable,
		currentStepCount,
		finishSportSession,
		sessionID
	])

	const sendMotivationalMessage = (doingGreat = true) => {
		const i = Math.floor(Math.random() * 10)
		setAlert({
			type: 'info',
			message: doingGreat
				? t(`motivation.doingGreat.${i}`)
				: t(`motivation.doingBetter.${i}`),
			position: 'top'
		})
	}

	useEffect(() => {
		if (currentTime >= maxTime) {
			handleStop()
		}
	}, [currentTime, maxTime, handleStop])

	useEffect(() => {
		if (isRunning && isLocationAvailable && sessionID) {
			; (async () => {
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
		getSport()
	}, [getSport])

	useEffect(() => {
		if (motivationalTimer.current) clearInterval(motivationalTimer.current)
		if (motivationalInterval.current)
			clearInterval(motivationalInterval.current)
		if (isRunning && !isPaused) {
			let timeForMotivation = Math.floor(maxTime / 3) * 1000

			if (timeForMotivation < 30_000) timeForMotivation = 30_000
			else if (timeForMotivation > 120_000) timeForMotivation = 120_000
			const currentMotivationalTimer = setInterval(() => {
				sendMotivationalMessage(true)
			}, timeForMotivation)
			motivationalInterval.current = currentMotivationalTimer

			const currentMotivationalInterval = setInterval(() => {
				if (currentStepCountRef.current !== 0) {
					const delta =
						currentStepCountRef.current - prevStepCountRef.current
					if (delta <= 5) sendMotivationalMessage(false)
					prevStepCountRef.current = currentStepCountRef.current
				}
			}, 10_000)
			motivationalTimer.current = currentMotivationalInterval
		}
		return () => {
			if (motivationalTimer.current)
				clearInterval(motivationalTimer.current)
			if (motivationalInterval.current)
				clearInterval(motivationalInterval.current)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isRunning, isPaused, maxTime])

	useEffect(() => {
		currentStepCountRef.current = currentStepCount
	}, [currentStepCount])

	useEffect(() => {
		if (trainingPlanSessionsMemo.length) {
			const daysOfWeek = [
				'sunday',
				'monday',
				'tuesday',
				'wednesday',
				'thursday',
				'friday',
				'saturday'
			]
			const currentDay = dayjs().weekday()
			// find the the closes session to the current day
			const closestSession = trainingPlanSessionsMemo.reduce(
				(prev, curr) => {
					const currDay = daysOfWeek.indexOf(curr.weekday)
					const prevDay = daysOfWeek.indexOf(prev.weekday)
					const currDiff = Math.abs(currDay - currentDay)
					const prevDiff = Math.abs(prevDay - currentDay)
					return currDiff < prevDiff ? curr : prev
				}
			)
			setPlannedTrainingSession(closestSession)
			const totalHours =
				closestSession.warm_up +
				closestSession.cardio +
				closestSession.strength +
				closestSession.cool_down
			setMaxTime(Math.ceil(totalHours * 3600))
		} else {
			setMaxTime(1_800) // 30 minutes
		}
	}, [trainingPlanSessionsMemo])

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
