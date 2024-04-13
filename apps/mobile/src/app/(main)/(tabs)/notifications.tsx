import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

const Notifications: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Hello From Notifications</Text>
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

export default Notifications