import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Tabs } from 'expo-router'

const ProfileIcon = ({ color }) => (
	<FontAwesome size={28} name='user' color={color} />
)
const TrainingIcon = ({ color }) => (
	<FontAwesome size={28} name='heart' color={color} />
)

export default function TabLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
			<Tabs.Screen
				name='profile'
				options={{
					title: 'Profile',
					tabBarIcon: ProfileIcon
				}}
			/>
			<Tabs.Screen
				name='training'
				options={{
					title: 'Entrenamiento',
					tabBarIcon: TrainingIcon
				}}
			/>
		</Tabs>
	)
}
