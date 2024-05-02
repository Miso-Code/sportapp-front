import ListItem from '@/components/ListItem'
import { useAuthStore } from '@sportapp/stores'
import { router } from 'expo-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { View, StyleSheet } from 'react-native'
import { List } from 'react-native-paper'

const Settings: React.FC = () => {
	const { t } = useTranslation()
	const { logout } = useAuthStore()
	return (
		<View style={styles.container}>
			<List.Section>
				<ListItem
					title={t('config.menu.language')}
					icon='translate'
					onPress={() => router.push('profile/language')}
				/>
				<ListItem
					title={t('config.menu.logout')}
					icon='logout'
					onPress={() => {
						logout()
						router.push('login')
					}}
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
		marginBottom: 15,
		marginTop: 100
	}
})

export default Settings
