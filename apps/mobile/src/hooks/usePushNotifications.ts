/* eslint-disable no-console */ // Remove this line after implementing the code
import { useCallback, useState } from 'react'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'

type ForegroundNotificationCallback = (
	title: string,
	message: string,
	type: 'info' | 'warning'
) => void

export const usePushNotification = () => {
	const [isPermissionsGranted, setIsPermissionsGranted] = useState(false)

	const subscribe = useCallback(
		async (callback?: ForegroundNotificationCallback) => {
			await Promise.all([
				listenToForegroundNotifications(callback),
				listenToBackgroundNotifications(),
				onNotificationOpenedAppFromBackground(),
				onNotificationOpenedAppFromQuit()
			])
		},
		[]
	)

	const getToken = useCallback(async () => {
		if (!isPermissionsGranted) await requestUserPermission()
		return await getFCMToken()
	}, [isPermissionsGranted])

	const requestUserPermission = async () => {
		if (Platform.OS === 'ios') {
			//Request iOS permission
			const authStatus = await messaging().requestPermission()
			const enabled =
				authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
				authStatus === messaging.AuthorizationStatus.PROVISIONAL

			setIsPermissionsGranted(enabled)
		} else if (Platform.OS === 'android') {
			//Request Android permission (For API level 33+, for 32 or below is not required)
			const status = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
			)
			const enabled = status === PermissionsAndroid.RESULTS.GRANTED

			setIsPermissionsGranted(enabled)
		}
	}

	const getFCMToken = async () => {
		return await messaging().getToken()
	}

	const listenToForegroundNotifications = async (
		callback: ForegroundNotificationCallback = () => {}
	) => {
		const unsubscribe = messaging().onMessage(async (remoteMessage) => {
			callback(
				remoteMessage.notification.title,
				remoteMessage.notification.body,
				remoteMessage.data.priority as 'info' | 'warning'
			)
		})
		return unsubscribe
	}

	const listenToBackgroundNotifications = async () => {
		const unsubscribe = messaging().setBackgroundMessageHandler(
			async (remoteMessage) => {
				console.log(
					'A new message arrived! (BACKGROUND)',
					JSON.stringify(remoteMessage)
				)
			}
		)
		return unsubscribe
	}

	const onNotificationOpenedAppFromBackground = async () => {
		const unsubscribe = messaging().onNotificationOpenedApp(
			async (remoteMessage) => {
				console.log(
					'App opened from BACKGROUND by tapping notification:',
					JSON.stringify(remoteMessage)
				)
			}
		)
		return unsubscribe
	}

	const onNotificationOpenedAppFromQuit = async () => {
		const message = await messaging().getInitialNotification()

		if (message) {
			console.log(
				'App opened from QUIT by tapping notification:',
				JSON.stringify(message)
			)
		}
	}

	return {
		isPermissionsGranted,
		subscribe,
		getToken
	}
}
