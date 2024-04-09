import React from 'react'

import { View, StyleSheet } from 'react-native'

import { List } from 'react-native-paper'

import ListItem from '@/components/ListItem'

import { router } from 'expo-router'

const Training: React.FC = () => {
	return (
		<View style={styles.container}>
			<List.Section>
				<ListItem
					title='Iniciar Entrenamiento'
					icon='heart'
					onPress={() => router.push('training/sportSession')}
				/>
				<ListItem
					title='Entrenamientos y eventos'
					icon='calendar-blank'
				/>
				<ListItem title='Plan alimenticio' icon='receipt' />
				<ListItem title='Otros servicios' icon='cart' />
				<ListItem title='Preferenciales' icon='star' />
			</List.Section>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		marginHorizontal: 15,
		marginTop: 100
	}
})

export default Training
