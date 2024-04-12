import { useState, useEffect } from 'react'
import * as Location from 'expo-location'

export const useLocation = () => {
	const [locationUpdates, setLocationUpdates] = useState<
		Location.LocationObject[]
	>([])
	const [isLocationAvailable, setIsLocationAvailable] = useState(false)

	useEffect(() => {
		let isMounted = true

		const startLocationUpdates = async () => {
			try {
				let { status } =
					await Location.requestForegroundPermissionsAsync()
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
						timeInterval: 1000,
						distanceInterval: 1
					},
					(location) => {
						if (isMounted) {
							setLocationUpdates((prevLocations) => [
								...prevLocations,
								location
							])
						}
					}
				)
			} catch (error) {
				console.error('Error starting location updates', error) // eslint-disable-line no-console
				setIsLocationAvailable(false)
			}
		}

		startLocationUpdates()

		return () => {
			isMounted = false
			Location.stopLocationUpdatesAsync('locationUpdates')
		}
	}, [])

	return { locationUpdates, isLocationAvailable }
}
