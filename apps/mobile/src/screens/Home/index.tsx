import React from 'react'

import TestComponent from '@components/TestComponent'
import { SafeAreaView } from 'react-native'
import {
	ActivityIndicator,
	Button,
	Icon,
	MD2Colors,
	MD3Colors,
	PaperProvider
} from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'

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
