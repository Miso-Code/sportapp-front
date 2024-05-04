import React from 'react'

import { View, StyleSheet } from 'react-native'

import { List } from 'react-native-paper'

import ListItem from '@/components/ListItem'

import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'

const Premium: React.FC = () => {
	const { t } = useTranslation()
	return (
		<View style={styles.container}>
			<List.Section>
				<ListItem
					title={t('preference.menu.schedule')}
					icon='calendar-blank'
					onPress={() => router.push('premium/createAppointment')}
				/>
				<ListItem
					title={t('preference.menu.list')}
					icon='receipt'
					onPress={() => router.push('premium/appointments')}
				/>
			</List.Section>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		marginHorizontal: 15
	}
})

export default Premium
