import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

const Preferences: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Hello From Preferences</Text>
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

export default Preferences
