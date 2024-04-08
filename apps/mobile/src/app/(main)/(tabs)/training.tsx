import React from 'react'

import { View, Text, StyleSheet } from 'react-native'

const Profile: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Hello From Trainig</Text>
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

export default Profile