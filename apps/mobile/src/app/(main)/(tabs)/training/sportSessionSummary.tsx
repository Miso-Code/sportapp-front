import React from 'react'

import { View, ScrollView, StyleSheet } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useSportSessionStore } from '@sportapp/stores'
import Kpi from '@/components/Kpi'
import { useTranslation } from 'react-i18next'

const SportSessionSummary: React.FC = () => {
	const theme = useTheme()
	const { t } = useTranslation()
	const { sportSession } = useSportSessionStore()
	return (
		<SafeAreaProvider>
			<ScrollView contentContainerStyle={styles.container}>
				{sportSession ? (
					<>
						<Text variant='headlineMedium'>
							Consumo Alimenticio
						</Text>
						<Text>
							Lorem ipsum dolor sit amet, consectetur adipiscing
							elit. Proin ultrices semper risus ac varius. Etiam
							vehicula tristique libero, eu laoreet augue dictum
							at. Nullam nec sem odio. Morbi consectetur ut velit
							ut mattis. Aliquam hendrerit massa ut mattis
							volutpat. Aenean congue eros nulla, at fermentum
							purus porta quis. Etiam tempor luctus turpis, in
							aliquet tortor porttitor sed. Mauris et nisl eget
							dolor lacinia tempus. Nam at diam vel odio vehicula
							gravida. Sed sed egestas lacus. Curabitur porttitor
							leo justo, sit amet euismod ipsum luctus quis.
						</Text>
						<Text variant='headlineMedium'>Métricas</Text>
						<View>
							<Kpi
								color={theme.colors.error}
								type='progress'
								value={sportSession.calories}
								max={10}
								label={t('session.calories')}
								valueSuffix='kcal'
								icon='fire'
							/>
							<Kpi
								color={theme.colors.secondary}
								type='progress'
								value={sportSession.duration}
								max={60}
								label={t('session.duration')}
								valueSuffix='min'
								icon='timer'
							/>
							<Kpi
								color={theme.colors.primary}
								type='progress'
								value={sportSession.steps}
								max={115}
								label={t('session.steps')}
								valueSuffix=''
								icon='walk'
							/>
							<Kpi
								color={theme.colors.inversePrimary}
								type='progress'
								value={sportSession.distance}
								max={133}
								label={t('session.distance')}
								valueSuffix='km'
								icon='map-marker'
							/>

							<Kpi
								color={theme.colors.tertiary}
								type='progress'
								value={sportSession.average_speed}
								max={3}
								label={t('session.speed')}
								valueSuffix='m/s'
								icon='speedometer'
							/>

							<Kpi
								color={theme.colors.error}
								type='lineChart'
								labels={['min', 'avg', 'max']}
								label={t('session.heartRate')}
								data={[
									sportSession.min_heartrate,
									sportSession.avg_heartrate,
									sportSession.max_heartrate
								]}
							/>
						</View>
					</>
				) : (
					<View style={styles.loaderContainer}>
						<ActivityIndicator
							animating={true}
							size='large'
							testID='progressBar'
						/>
					</View>
				)}
			</ScrollView>
		</SafeAreaProvider>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		paddingVertical: 100,
		marginHorizontal: 20,
		gap: 20
	},
	loaderContainer: {
		width: '100%',
		marginVertical: 100
	}
})

export default SportSessionSummary
