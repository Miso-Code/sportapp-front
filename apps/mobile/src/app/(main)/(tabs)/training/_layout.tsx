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
				name='sportSession'
				options={{
					...screenOptions,
					title: t('training.startTraining')
				}}
			/>
			<Stack.Screen
				name='sportSessionSummary'
				options={{ ...screenOptions, title: t('training.endTraining') }}
			/>
		</Stack>
	)
}
