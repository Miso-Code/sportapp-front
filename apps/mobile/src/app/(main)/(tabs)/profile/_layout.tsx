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
				name='settings'
				options={{ ...screenOptions, title: t('navbar.settings') }}
			/>
			<Stack.Screen
				name='language'
				options={{ ...screenOptions, title: t('config.menu.language') }}
			/>
			<Stack.Screen
				name='personalProfile'
				options={{
					...screenOptions,
					title: t('profile.menu.personalData')
				}}
			/>
			<Stack.Screen
				name='sportsProfile'
				options={{
					...screenOptions,
					title: t('profile.menu.sportData')
				}}
			/>
			<Stack.Screen
				name='nutritionalProfile'
				options={{
					...screenOptions,
					title: t('profile.menu.nutritionData')
				}}
			/>
			<Stack.Screen
				name='paymentPlans'
				options={{
					...screenOptions,
					title: t('profile.menu.paymentPlans')
				}}
			/>
		</Stack>
	)
}
