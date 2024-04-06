import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import CustomTheme from '@/config/theme'
import { Slot } from 'expo-router'

export default function DefaultLayout() {
	return (
		<PaperProvider theme={CustomTheme}>
			<Slot />
		</PaperProvider>
	)
}
