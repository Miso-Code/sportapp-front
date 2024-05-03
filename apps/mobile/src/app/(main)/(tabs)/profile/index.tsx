import React from 'react'

import { View, StyleSheet } from 'react-native'

import {
	List,
	Divider,
	Avatar,
	Text,
	useTheme,
	MD3Theme
} from 'react-native-paper'

import ListItem from '@/components/ListItem'

import { router } from 'expo-router'
import { useTranslation } from 'react-i18next'
import { useUserStore } from '@sportapp/stores'

const Profile: React.FC = () => {
	const { t } = useTranslation()
	const { user } = useUserStore()
	const theme = useTheme()
	const styles = createStyles(theme)
	return (
		<View style={styles.container}>
			<View style={styles.row}>
				{(!!user?.profileData?.first_name ||
					!!user?.profileData?.last_name) && (
					<Avatar.Text
						size={42}
						label={
							user?.profileData?.first_name[0] +
							user?.profileData?.last_name[0]
						}
						style={styles.icon}
					/>
				)}
				<Text variant='titleMedium'>
					{user?.profileData?.first_name}{' '}
					{user?.profileData?.last_name}
				</Text>
			</View>
			<List.Section style={styles.group}>
				<ListItem
					title={t('profile.menu.personalData')}
					icon='account-circle-outline'
					variant='flat'
					onPress={() => router.navigate('profile/personalProfile')}
				/>
				<Divider />
				<ListItem
					title={t('profile.menu.sportData')}
					icon='shoe-sneaker'
					variant='flat'
					onPress={() => router.navigate('profile/sportsProfile')}
				/>
				<Divider />
				<ListItem
					title={t('profile.menu.nutritionData')}
					icon='tea-outline'
					variant='flat'
					onPress={() =>
						router.navigate('profile/nutritionalProfile')
					}
				/>
			</List.Section>

			<List.Section>
				<ListItem
					title={t('profile.menu.paymentPlans')}
					icon='tag-outline'
					onPress={() => router.navigate('profile/paymentPlans')}
				/>
				<ListItem
					title={t('navbar.settings')}
					icon='cog'
					onPress={() => router.navigate('profile/settings')}
				/>
			</List.Section>
		</View>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			justifyContent: 'flex-start',
			marginHorizontal: 15
		},
		group: {
			marginVertical: 5,
			borderColor: '#E0E0E0', // use theme colors
			borderWidth: 1,
			borderRadius: 5
		},
		row: {
			flexDirection: 'row',
			marginVertical: 5,
			borderColor: '#E0E0E0', // use theme colors
			borderWidth: 1,
			borderRadius: 5,
			paddingVertical: 8,
			paddingHorizontal: 8,
			alignItems: 'center',
			gap: 10
		},
		icon: {
			backgroundColor: theme.colors.tertiary
		}
	})

export default Profile
