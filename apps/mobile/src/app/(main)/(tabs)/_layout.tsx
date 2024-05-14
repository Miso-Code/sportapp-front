import React, { useState, useEffect } from 'react'
import { Icon, useTheme } from 'react-native-paper'

import { Tabs, useSegments } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@sportapp/stores'

import { ESubscription } from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'

const ProfileIcon = ({ color }) => (
	<Icon size={20} source='account' color={color} />
)
const TrainingIcon = ({ color }) => (
	<Icon size={20} source='heart' color={color} />
)

const NotificationsIcon = ({ color }) => (
	<Icon size={20} source='bell' color={color} />
)

const PremiumIcon = ({ color }) => (
	<Icon size={20} source='star' color={color} />
)

export default function TabLayout() {
	const theme = useTheme()
	const { user } = useUserStore()

	const { t } = useTranslation()

	const segments = useSegments()

	const [showHeader, setShowHeader] = useState(true)

	useEffect(() => {
		setShowHeader(segments?.length <= 3)
	}, [segments?.length])

	return (
		<Tabs
			screenOptions={{
				headerShown: showHeader,
				headerTitleAlign: 'left',
				headerTransparent: false,
				headerTitleStyle: {
					fontWeight: 'normal',
					fontSize: 34
				},
				headerBackground: () => null,
				tabBarActiveTintColor: theme.colors.primary
			}}>
			<Tabs.Screen
				name='profile'
				options={{
					title: t('navbar.profile'),
					tabBarIcon: ProfileIcon
				}}
			/>
			<Tabs.Screen
				name='training'
				options={{
					title: t('navbar.training'),
					tabBarIcon: TrainingIcon
				}}
			/>
			<Tabs.Screen
				name='notifications'
				options={{
					title: t('navbar.notifications'),
					tabBarIcon: NotificationsIcon
				}}
			/>
			<Tabs.Screen
				name='premium'
				options={{
					title: t('navbar.preferential'),
					tabBarIcon: PremiumIcon,
					href:
						user?.profileData?.subscription_type ===
						ESubscription.PREMIUM
							? '/premium'
							: null
				}}
			/>
		</Tabs>
	)
}
