import React, { ComponentProps, useEffect, useState } from 'react'
import { Dialog, useTheme, MD3Theme } from 'react-native-paper'
import { Keyboard, Platform, StyleSheet } from 'react-native'

const KeyboardAvoidingDialog: React.FC<ComponentProps<typeof Dialog>> = ({
	visible,
	onDismiss,
	children
}) => {
	const [bottom, setBottom] = useState(0)
	const theme = useTheme()
	const styles = createStyles(theme)

	useEffect(() => {
		function onKeyboardChange(e) {
			if (e.endCoordinates.screenY < e.startCoordinates.screenY)
				setBottom(e.endCoordinates.height / 2)
			else setBottom(0)
		}

		if (Platform.OS === 'ios') {
			const subscription = Keyboard.addListener(
				'keyboardWillChangeFrame',
				onKeyboardChange
			)
			return () => subscription.remove()
		}

		const subscriptions = [
			Keyboard.addListener('keyboardDidHide', onKeyboardChange),
			Keyboard.addListener('keyboardDidShow', onKeyboardChange)
		]
		return () =>
			subscriptions.forEach((subscription) => subscription.remove())
	}, [])

	return (
		<Dialog
			testID='dialog'
			style={{ bottom, ...styles.dialog }}
			visible={visible}
			onDismiss={onDismiss}>
			{children}
		</Dialog>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		dialog: {
			backgroundColor: theme.colors.onPrimary,
			borderRadius: 0,
			paddingHorizontal: 20,
			paddingVertical: 10
		}
	})

export default KeyboardAvoidingDialog
