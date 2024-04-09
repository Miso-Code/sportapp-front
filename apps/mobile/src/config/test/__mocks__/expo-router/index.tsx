import React from 'react'
import { View, Text } from 'react-native'

const Tabs = ({ screenOptions, children }) => (
	<View testID={screenOptions.headerShown}>
		{screenOptions.headerShown && <Text testID='header'>header</Text>}
		{children}
	</View>
)

Tabs.Screen = ({ options }) => (
	<View>
		<Text>{options.title}</Text>
		<>{options.tabBarIcon({ color: 'blue' })}</>
	</View>
)

const useSegments = jest.fn(() => [{ title: 'test' }])
const router = {
	back: jest.fn()
}

export { Tabs, useSegments, router }
