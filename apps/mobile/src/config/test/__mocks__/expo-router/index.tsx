import React from 'react'
import { View, Text } from 'react-native'

const Tabs = ({ screenOptions, children }) => (
	<View>
		{screenOptions.headerBackground?.()}
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

const Slot = ({ children }) => <>{children}</>

const useSegments = jest.fn(() => [{ title: 'test' }])
const useRootNavigationState = jest.fn().mockReturnValue({ key: 'key' })
const router = {
	push: jest.fn(),
	back: jest.fn(),
	navigate: jest.fn()
}

export { Tabs, Slot, useSegments, router, useRootNavigationState }
