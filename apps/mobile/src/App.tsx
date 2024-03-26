import React from 'react'

import { SafeAreaView } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import TestComponent from './TestComponent'

function App(): React.JSX.Element {
	const backgroundStyle = {
		backgroundColor: Colors.lighter
	}

	return (
		<SafeAreaView style={backgroundStyle}>
			<TestComponent />
		</SafeAreaView>
	)
}

export default App
