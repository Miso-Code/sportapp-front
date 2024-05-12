import { useEffect, useState } from 'react'

export const useLocation = () => {
	const [location, setLocation] = useState({
		latitude: 0,
		longitude: 0
	})
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(true)

	const handleSuccess = (position: GeolocationPosition) => {
		setLocation({
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}

	const handleError = (error: GeolocationPositionError) => {
		if (error.code === 1) {
			setError('User denied the request for Geolocation')
		} else if (error.code === 2) {
			setError('Location information is unavailable')
		} else if (error.code === 3) {
			setError('The request to get user location timed out')
		} else {
			setError('An unknown error occurred')
		}
	}

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(handleSuccess, handleError)
		} else {
			setError('Geolocation is not available')
		}
		setLoading(false)
	}, [])

	return { location, error, loading }
}
