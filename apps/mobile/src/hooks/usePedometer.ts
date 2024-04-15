import { useState, useEffect } from 'react'
import { Pedometer } from 'expo-sensors'

export const usePedometer = () => {
	const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking')
	const [pastStepCount, setPastStepCount] = useState(0)
	const [currentStepCount, setCurrentStepCount] = useState(0)

	useEffect(() => {
		const subscribe = async () => {
			const isAvailable = await Pedometer.isAvailableAsync()
			setIsPedometerAvailable(isAvailable ? 'available' : 'unavailable')

			if (isAvailable) {
				Pedometer.watchStepCount((result) => {
					setCurrentStepCount(result.steps)
				})

				const pastDate = new Date()
				pastDate.setHours(0, 0, 0, 0)
				const todayDate = new Date()

				const pastStepResult = await Pedometer.getStepCountAsync(
					pastDate,
					todayDate
				)
				setPastStepCount(pastStepResult.steps)
			}
		}

		subscribe()

		return () => {
			Pedometer.watchStepCount(null)
		}
	}, [])

	return { isPedometerAvailable, pastStepCount, currentStepCount }
}
