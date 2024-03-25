import React from 'react'

import { SafeAreaView, Text } from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

function App(): React.JSX.Element {
	const backgroundStyle = {
		backgroundColor: Colors.lighter
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<Text>Mobile App</Text>
		</SafeAreaView>
	)
}

export default App
