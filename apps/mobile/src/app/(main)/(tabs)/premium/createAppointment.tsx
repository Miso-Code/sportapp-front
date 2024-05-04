import React from 'react'

import { View, StyleSheet } from 'react-native'

import { List } from 'react-native-paper'

import ListItem from '@/components/ListItem'

import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'

const CreateAppointment: React.FC = () => {
	const { t } = useTranslation()
	return (
		<View style={styles.container}>
			<List.Section>
				<ListItem
					title={t('preference.virtualAppointment.title')}
					icon='laptop'
					onPress={() =>
						router.push('premium/createVirtualAppointment')
					}
				/>
				<ListItem
					title={t('preference.inPersonAppointment.title')}
					icon='tree-outline'
					onPress={() =>
						router.push('premium/createInPersonAppointment')
					}
				/>
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

export default CreateAppointment
