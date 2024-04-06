import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { router, useRootNavigationState } from 'expo-router'
import { useAuthStore } from '@sportapp/stores'

const Index: React.FC = () => {
	const { isAuth } = useAuthStore()
	const rootNavigationState = useRootNavigationState()

	useEffect(() => {
		if (rootNavigationState?.key)
			router.navigate(isAuth ? 'profile' : 'login')
	}, [isAuth, rootNavigationState?.key])

	return (
		<View style={styles.container}>
			<ActivityIndicator
				animating={true}
				size='large'
				testID='progressBar'
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
})

export default Index
