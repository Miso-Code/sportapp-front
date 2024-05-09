import React, { useRef } from 'react'
import dayjs from 'dayjs'
import { useAlertStore } from '@sportapp/stores'

import { ScrollView, View, StyleSheet } from 'react-native'
import { Text, FAB as Fab, Card } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

const Notifications: React.FC = () => {
	const { alertHistory } = useAlertStore()
	const { i18n } = useTranslation()
	const scrollViewRef = useRef<ScrollView>(null)

	return (
		<>
			<ScrollView
				contentContainerStyle={styles.container}
				ref={scrollViewRef}>
				<View style={styles.wrapper}>
					{alertHistory.map((alert, index) => (
						<Card
							elevation={1}
							style={styles.card}
							key={'alert' + index}>
							<Card.Content>
								<Text
									variant='labelLarge'
									style={styles.dateLabel}>
									{dayjs(alert.createAt)
										.locale(i18n.language)
										.format('DD MMMM YYYY hh:mm A')}
								</Text>
								<Text
									variant='titleLarge'
									style={styles.cardTitle}>
									{alert?.message}
								</Text>
							</Card.Content>
						</Card>
					))}
				</View>
			</ScrollView>
			<Fab
				testID='fabScrollUp'
				icon='arrow-up'
				onPress={() =>
					scrollViewRef.current?.scrollTo({ y: 0, animated: true })
				}
				style={styles.fab}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
		marginTop: 20
	},
	wrapper: {
		width: '100%',
		gap: 20,
		marginBottom: 200
	},
	card: {
		backgroundColor: '#f2f2f2',
		paddingBottom: 10
	},
	cardTitle: {
		fontWeight: 'bold'
	},
	dateLabel: {
		opacity: 0.5
	},
	fab: {
		position: 'absolute',
		margin: 16,
		right: 0,
		bottom: 0
	}
})

export default Notifications
