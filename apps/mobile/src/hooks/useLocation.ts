import React, { useState, useEffect } from 'react'
import * as Location from 'expo-location'

const startLocationUpdates = async (
	setIsLocationAvailable: React.Dispatch<React.SetStateAction<boolean>>,
	setLocationUpdates: React.Dispatch<
		React.SetStateAction<Location.LocationObject[]>
	>
) => {
	try {
		let { status } = await Location.requestForegroundPermissionsAsync()
		if (status !== 'granted') {
			setIsLocationAvailable(false)
			return
		}

		setIsLocationAvailable(true)

		await Location.startLocationUpdatesAsync('locationUpdates', {
			accuracy: Location.Accuracy.High,
			timeInterval: 1000,
			distanceInterval: 1
		})

		Location.watchPositionAsync(
			{
				accuracy: Location.Accuracy.High,
				timeInterval: 1000
			},
			(location) => {
				setLocationUpdates((prevLocations) => [
					...prevLocations,
					location
				])
			}
		)
	} catch (error) {
		console.error('Error starting location updates', error) // eslint-disable-line no-console
	}
}

const stopLocationUpdates = async () => {
	await Location.stopLocationUpdatesAsync('locationUpdates')
}

export const useLocation = () => {
	const [locationUpdates, setLocationUpdates] = useState<
		Location.LocationObject[]
	>([])
	const [isLocationAvailable, setIsLocationAvailable] = useState(false)

	useEffect(() => {
		let isMounted = true

		if (isMounted) {
			startLocationUpdates(setIsLocationAvailable, setLocationUpdates)
		}

		return () => {
			isMounted = false
			stopLocationUpdates()
		}
	}, [])

	return { locationUpdates, isLocationAvailable }
}
