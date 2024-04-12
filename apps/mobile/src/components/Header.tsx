import React, { ComponentProps } from 'react'
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router/stack'
import { router } from 'expo-router'

import { IconButton, Text } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Header = ({
	back,
	options
}: ComponentProps<
	ComponentProps<typeof Stack.Screen>['options']['header']
>) => {
	return (
		<SafeAreaProvider style={styles.safeArea}>
			<View style={styles.header} testID='header'>
				{back && (
					<IconButton
						testID='back'
						icon='chevron-left'
						size={35}
						onPress={() => router.back()}
					/>
				)}
				<Text
					variant='displaySmall'
					style={styles.headerTitle}
					numberOfLines={1}
					ellipsizeMode='tail'>
					{options.title}
				</Text>
			</View>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	header: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 45,
		gap: 5,
		backgroundColor: '#f2f2f2'
	},
	headerTitle: {
		flex: 1,
		fontSize: 34,
		fontWeight: 'normal',
		height: 50,
		maxWidth: '70%'
	},
	safeArea: {
		backgroundColor: '#f2f2f2'
	}
})

export default Header
