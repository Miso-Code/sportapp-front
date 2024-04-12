import React, { ComponentProps } from 'react'
import { Stack } from 'expo-router/stack'
import Header from '@/components/Header'

export default function TrainingStack() {
	const screenOptions: ComponentProps<typeof Stack.Screen>['options'] = {
		headerTransparent: true,
		header: Header
	}
	return (
		<Stack>
			<Stack.Screen
				name='index'
				options={{ ...screenOptions, headerShown: false }}
			/>
			<Stack.Screen
				name='sportSession'
				options={{ ...screenOptions, title: 'Iniciar Entrenamiento' }}
			/>
			<Stack.Screen
				name='sportSessionEnd'
				options={{ ...screenOptions, title: 'Finalizar Entrenamiento' }}
			/>
		</Stack>
	)
}
