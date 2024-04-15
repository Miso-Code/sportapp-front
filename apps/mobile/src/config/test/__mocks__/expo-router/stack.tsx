import React from 'react'
import { View, Text } from 'react-native'

const Stack = ({ children }) => <View>{children}</View>

Stack.Screen = ({ options }) => {
	const defaultOptions = { headerShown: true, header: null }
	const optionsFinal = { ...defaultOptions, ...options }
	const { headerShown, header } = optionsFinal

	const shouldRenderDefaultHeader = headerShown && header === null

	if (shouldRenderDefaultHeader) {
		return (
			<View>
				<Text testID='default-header'>Header</Text>
				<Text>Mock Screen</Text>
			</View>
		)
	}

	return headerShown ? (
		<View>
			{optionsFinal.header({ back: true, options: optionsFinal })}
			<Text>Mock Screen</Text>
		</View>
	) : null
}

export { Stack }
