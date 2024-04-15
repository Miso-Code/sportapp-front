import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

export default function SquaredButton({
	value = 'Button',
	onPress = () => {},
	...props
}) {
	return (
		<Button
			mode='contained'
			onPress={onPress}
			style={styles.button}
			{...props}>
			{value}
		</Button>
	)
}

const styles = StyleSheet.create({
	button: {
		marginTop: 16, // Space between the button and the input fields
		borderRadius: 5 // This creates a rounded button
	}
})
