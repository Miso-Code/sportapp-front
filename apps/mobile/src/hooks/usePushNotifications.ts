// Remove this line after implementing the code
import { useCallback, useState } from 'react'
import messaging from '@react-native-firebase/messaging'
import { PermissionsAndroid, Platform } from 'react-native'
import { useAlertStore } from '@sportapp/stores'

type ForegroundNotificationCallback = (
	title: string,
	message: string,
	type: 'info' | 'warning'
) => void

export const usePushNotification = () => {
	const [isPermissionsGranted, setIsPermissionsGranted] = useState(false)
	const { addHiddenAlertToHistory } = useAlertStore()

	const subscribe = useCallback(
		async (callback?: ForegroundNotificationCallback) => {
			await Promise.all([
				listenToForegroundNotifications(callback),
				listenToBackgroundNotifications(),
				onNotificationOpenedAppFromBackground(),
				onNotificationOpenedAppFromQuit()
			])
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
		try {
			return await messaging().getToken()
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error('There was a problem getting FCM token', error)
		}
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
				addHiddenAlertToHistory({
					type: remoteMessage.data.priority as 'info' | 'warning',
					message: `${remoteMessage.notification.title}: ${remoteMessage.notification.body}`
				})
			}
		)
		return unsubscribe
	}

	const onNotificationOpenedAppFromBackground = async () => {
		const unsubscribe = messaging().onNotificationOpenedApp(
			async (remoteMessage) => {
				addHiddenAlertToHistory({
					type: remoteMessage.data.priority as 'info' | 'warning',
					message: `${remoteMessage.notification.title}: ${remoteMessage.notification.body}`
				})
			}
		)
		return unsubscribe
	}

	const onNotificationOpenedAppFromQuit = async () => {
		const remoteMessage = await messaging().getInitialNotification()

		if (remoteMessage) {
			addHiddenAlertToHistory({
				type: remoteMessage.data.priority as 'info' | 'warning',
				message: `${remoteMessage.notification.title}: ${remoteMessage.notification.body}`
			})
		}
	}

	return {
		isPermissionsGranted,
		subscribe,
		getToken
	}
}
