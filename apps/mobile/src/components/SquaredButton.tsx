import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

interface SquaredButtonProps
	extends Omit<React.ComponentProps<typeof Button>, 'children'> {
	value?: string
	onPress?: () => void
}

const SquaredButton: React.FC<SquaredButtonProps> = ({
	value = 'Button',
	onPress = () => {},
	...props
}) => {
	return (
		<Button
			mode='contained'
			onPress={onPress}
			style={{ ...(props.style?.valueOf() as Object), ...styles.button }}
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

export default SquaredButton
