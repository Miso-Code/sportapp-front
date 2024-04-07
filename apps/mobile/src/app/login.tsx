import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import {
	TextInput,
	Text,
	HelperText,
	ActivityIndicator
} from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import SquaredButton from '@/components/SquaredButton'

import { useAuthStore } from '@sportapp/stores'
import { router } from 'expo-router'

export default function App() {
	const { login, loading, isAuth, error } = useAuthStore()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isError, setIsError] = useState(!!error)

	useEffect(() => {
		if (email.length > 0 || password.length > 0) {
			setIsError(false)
		}
	}, [email, password])

	useEffect(() => {
		if (isAuth) {
			router.navigate('profile')
		}
	}, [isAuth])

	useEffect(() => {
		if (error) {
			setIsError(true)
		}
	}, [error])

	const handleLogin = () => {
		login({ email, password })
	}

	const emailHasErrors = () => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return !emailRegex.test(email) && email.length > 0
	}

	return (
		<View style={styles.container}>
			<View style={styles.logoContainer}>
				<Image
					source={require('../../assets/icon.png')}
					style={styles.logo}
					testID='logo'
				/>
			</View>
			<Text style={styles.title}>SportApp</Text>
			<View style={styles.inputContainer}>
				<TextInput
					testID='text-input-email'
					label='Correo electronico'
					value={email}
					onChangeText={setEmail}
					mode='outlined'
					error={isError || emailHasErrors()}
				/>
				<HelperText
					type='error'
					visible={emailHasErrors()}
					testID='error-helper-text'>
					Email address is invalid!
				</HelperText>
				<TextInput
					testID='text-input-password'
					label='Contraseña'
					value={password}
					onChangeText={setPassword}
					secureTextEntry
					mode='outlined'
					style={styles.input}
					error={isError}
				/>
				<SquaredButton
					value='Ingresar'
					onPress={handleLogin}
					disabled={
						emailHasErrors() ||
						email.length === 0 ||
						password.length === 0
					}
				/>
			</View>
			<StatusBar style='auto' />
			{loading && (
				<ActivityIndicator
					animating={true}
					size='large'
					style={styles.spinner}
				/>
			)}
			<HelperText
				type='error'
				visible={isError}
				testID='unauthorized-helper-text'
				style={styles.center}>
				Error: Invalid email or password
			</HelperText>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		padding: 16,
		backgroundColor: 'white' // Assuming a white background
	},
	logoContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 0 // Adjust as needed
	},
	logo: {
		width: 150, // Adjust to match your logo's size
		height: 150, // Adjust to match your logo's size
		borderRadius: 75, // This creates a circular logo
		backgroundColor: 'grey', // Placeholder color for the logo
		marginBottom: 0 // Space between logo and title
	},
	input: {
		marginBottom: 10 // Space between input fields
	},
	title: {
		fontSize: 48,
		fontWeight: 'bold',
		textAlign: 'center',
		marginBottom: 10 // Space between title and input fields
	},
	inputContainer: {
		borderWidth: 1,
		borderColor: 'gray',
		padding: 15,
		borderRadius: 5
	},
	button: {
		marginTop: 16, // Space between the button and the input fields
		borderRadius: 5 // This creates a rounded button
	},
	spinner: {
		marginTop: 16
	},
	center: {
		textAlign: 'center'
	}
})
