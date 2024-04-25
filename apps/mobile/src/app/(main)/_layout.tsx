import React from 'react'

import { Stack } from 'expo-router/stack'

import {
	PaperProvider,
	Snackbar,
	Icon,
	Text,
	useTheme,
	MD3Theme,
	Portal
} from 'react-native-paper'

import { useAlertStore } from '@sportapp/stores'
import { View, StyleSheet } from 'react-native'

export default function AppLayout() {
	const theme = useTheme()
	const styles = createStyles(theme)
	const { alert, setAlert } = useAlertStore()

	const iconByAlertType = {
		error: 'alert-circle',
		success: 'check-circle',
		warning: 'alert-circle',
		info: 'information'
	}

	return (
		<PaperProvider>
			{/** PaperProvider allows modals to render the right way by providing it here */}
			<Stack>
				<Stack.Screen name='(tabs)' options={{ headerShown: false }} />
			</Stack>
			<Portal>
				{alert && (
					<Snackbar
						testID='alert'
						onIconPress={() => setAlert(undefined)}
						visible={!!alert}
						onDismiss={() => setAlert(undefined)}
						duration={alert.ttl ?? 5000}
						style={styles[alert.type]}
						wrapperStyle={styles[alert.position]}>
						<View style={styles.row}>
							<Icon
								source={iconByAlertType[alert.type]}
								color={styles[alert.type].color}
								size={20}
							/>
							<Text style={styles[alert.type]}>
								{alert.message}
							</Text>
						</View>
					</Snackbar>
				)}
			</Portal>
		</PaperProvider>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		row: {
			flexDirection: 'row',
			alignItems: 'center',
			gap: 20,
			marginRight: 30
		},
		error: {
			color: theme.colors.onError,
			backgroundColor: theme.colors.error,
			alignItems: 'flex-start'
		},
		success: {
			color: theme.colors.onPrimary,
			backgroundColor: 'green',
			alignItems: 'flex-start'
		},
		warning: {
			color: theme.colors.onPrimary,
			backgroundColor: 'orange',
			alignItems: 'flex-start'
		},
		info: {
			color: theme.colors.onSecondary,
			backgroundColor: theme.colors.secondary,
			alignItems: 'flex-start'
		},
		bottom: {
			bottom: 50
		},
		top: {
			top: 50
		},
		center: {
			top: '45%'
		}
	})
