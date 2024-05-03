import React from 'react'

import { View, StyleSheet } from 'react-native'

import { List } from 'react-native-paper'

import ListItem from '@/components/ListItem'

import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { ESubscription } from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'
import { useUserStore } from '@sportapp/stores'

const Training: React.FC = () => {
	const { t } = useTranslation()
	const { user } = useUserStore()
	return (
		<View style={styles.container}>
			<List.Section>
				<ListItem
					title={t('training.startTraining')}
					icon='heart'
					onPress={() => router.push('training/sportSession')}
				/>
				<ListItem
					title={t('training.history')}
					icon='calendar-blank'
					onPress={() => router.push('training/sportSessionHistory')}
				/>
				<ListItem
					title={t('training.nutritionalPlan')}
					icon='receipt'
				/>
				<ListItem
					title={t('training.others')}
					icon='cart'
					onPress={() => router.push('training/servicesAndProducts')}
				/>
				{user?.profileData?.subscription_type ===
					ESubscription.PREMIUM && (
					<ListItem title={t('training.preferentials')} icon='star' />
				)}
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

export default Training
