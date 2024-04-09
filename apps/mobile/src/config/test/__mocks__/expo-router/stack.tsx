import React from 'react'
import { View, Text } from 'react-native'

const Stack = ({ children }) => <View>{children}</View>

Stack.Screen = ({ options }) => {
	const defaultOptions = { headerShown: true, header: null }
	const optionsFinal = { ...defaultOptions, ...options }
	return (
		<View>
			{optionsFinal.headerShown && !optionsFinal.header && (
				<Text testID='default-header'>Header</Text>
			)}
			{optionsFinal.headerShown &&
				optionsFinal.header &&
				optionsFinal.header({ back: true, options: optionsFinal })}
			<Text>Mock Screen</Text>
		</View>
	)
}

export { Stack }
