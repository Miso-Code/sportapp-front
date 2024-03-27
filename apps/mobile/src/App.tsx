import React from 'react'

import { SafeAreaView } from 'react-native'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { PaperProvider } from 'react-native-paper'
import {
	ActivityIndicator,
	MD2Colors,
	Button,
	Icon,
	MD3Colors
} from 'react-native-paper'
import TestComponent from './TestComponent'

function App(): React.JSX.Element {
	const backgroundStyle = {
		backgroundColor: Colors.lighter
	}

	return (
		<PaperProvider>
			<SafeAreaView style={backgroundStyle}>
				<ActivityIndicator animating={true} color={MD2Colors.red800} />
				<TestComponent />
				<Button
					icon='camera'
					mode='contained'
					onPress={() => console.log('Pressed')}>
					Press me
				</Button>
				<Icon source='camera' color={MD3Colors.error50} size={20} />
			</SafeAreaView>
		</PaperProvider>
	)
}

export default App
