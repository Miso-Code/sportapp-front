import React, { ComponentProps } from 'react'
import { Stack } from 'expo-router/stack'
import Header from '@/components/Header'
import { useTranslation } from 'react-i18next'

export default function TrainingStack() {
	const screenOptions: ComponentProps<typeof Stack.Screen>['options'] = {
		headerTransparent: true,
		header: Header
	}

	const { t } = useTranslation()

	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ ...screenOptions, headerShown: false }}
			/>
			<Stack.Screen
				name='createAppointment'
				options={{
					...screenOptions,
					title: t('preference.menu.schedule')
				}}
			/>
			<Stack.Screen
				name='appointments'
				options={{
					...screenOptions,
					title: t('preference.menu.list')
				}}
			/>
			<Stack.Screen
				name='createVirtualAppointment'
				options={{
					...screenOptions,
					title: t('preference.menu.schedule')
				}}
			/>
			<Stack.Screen
				name='createInPersonAppointment'
				options={{
					...screenOptions,
					title: t('preference.menu.schedule')
				}}
			/>
		</Stack>
	)
}
