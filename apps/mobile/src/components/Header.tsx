import React, { ComponentProps } from 'react'
import { View, StyleSheet } from 'react-native'
import { Stack } from 'expo-router/stack'
import { router } from 'expo-router'

import { IconButton, Text } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const Header = ({
	back,
	options,
	route
}: ComponentProps<
	ComponentProps<typeof Stack.Screen>['options']['header']
>) => {
	const title =
		(route?.params as { title: string } | undefined)?.title || options.title
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
					testID='title'
					variant='displaySmall'
					style={styles.headerTitle}
					numberOfLines={1}
					ellipsizeMode='tail'>
					{title}
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
