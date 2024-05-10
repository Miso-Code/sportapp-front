import React, { useEffect, useMemo, useState } from 'react'

import { View, ScrollView, StyleSheet } from 'react-native'
import { ActivityIndicator, Text, useTheme } from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useSportSessionStore, useBusinessPartnerStore } from '@sportapp/stores'
import Kpi from '@/components/Kpi'
import { useTranslation } from 'react-i18next'
import ProductServiceCard from '@/components/ProductServiceCard'
import { router } from 'expo-router'

const SportSessionSummary: React.FC = () => {
	const theme = useTheme()
	const { t } = useTranslation()
	// const { sportSession } = useSportSessionStore()
	const { getSportSessions } = useSportSessionStore()
	const { setProductToCheckout, suggestProduct } = useBusinessPartnerStore()

	const [loadingSuggestedProduct, setLoadingSuggestedProduct] = useState(false)
	const [suggestedProduct, setSuggestedProduct] = useState<Awaited<ReturnType<typeof suggestProduct>>>()

	const sportSession: Awaited<ReturnType<typeof getSportSessions>>[number] = useMemo(() => ({
		calories: 10,
		duration: 10,
		steps: 10,
		distance: 10,
		average_speed: 10,
		min_heartrate: 10,
		avg_heartrate: 10,
		max_heartrate: 10,
		session_id: "1",
		sport_id: "1",
		started_at: new Date().toISOString(),
		user_id: "1"
	}), [])

	useEffect(() => {
		if (sportSession) {
			setLoadingSuggestedProduct(true)
				; (async () => {
					// const product = await suggestProduct({
					// 	sport_id: sportSession.sport_id,
					// })
					const product = {
						name: 'Verduritas',
						description: 'pa los gordos',
						price: 10,
						payment_frequency: 'monthly' as const,
						image_url: 'https://www.cspinet.org/sites/default/files/styles/700x530/public/2023-09/Gheorghita_fruitVeg_adobe_hero_700x530px.jpg?h=61bc1599',
						category: 'equipement' as const,
						product_id: '1',
						business_partner_id: '1',
						url: 'https://example.com',
						payment_type: 'unique' as const,
						summary: 'summary',
						active: true
					}
					setSuggestedProduct(product)
					setLoadingSuggestedProduct(false)
				}
				)()
		}
	}, [sportSession])

	return (
		<SafeAreaProvider>
			<ScrollView contentContainerStyle={styles.container}>
				{sportSession ? (
					<>
						<Text variant='headlineMedium'>
							{t('session.nutritionalSuggestionTitle')}
						</Text>
						<Text>
							{t('session.nutritionalSuggestion')}
						</Text>
						{loadingSuggestedProduct ? <ActivityIndicator /> : suggestedProduct && <View style={styles.suggestedProductContainer}>
							<ProductServiceCard
								title={suggestedProduct.name}
								description={suggestedProduct.description}
								price={suggestedProduct.price}
								priceFrequency={suggestedProduct.payment_frequency}
								image={suggestedProduct.image_url}
								category={suggestedProduct.category}
								onPress={() => {
									setProductToCheckout(suggestedProduct)
									router.push({
										pathname:
											'training/servicesAndProductsCheckout',
										params: {
											quantity: 1
										}
									})
								}}
								small
							/>
						</View>}
						<Text variant='headlineMedium'>Métricas</Text>
						<View>
							<Kpi
								color={theme.colors.error}
								type='progress'
								value={sportSession.calories ?? 0}
								max={10}
								label={t('session.calories')}
								valueSuffix='kcal'
								icon='fire'
							/>
							<Kpi
								color={theme.colors.secondary}
								type='progress'
								value={sportSession.duration ?? 0}
								max={60}
								label={t('session.duration')}
								valueSuffix='s'
								icon='timer'
							/>
							<Kpi
								color={theme.colors.primary}
								type='progress'
								value={sportSession.steps ?? 0}
								max={115}
								label={t('session.steps')}
								valueSuffix=''
								icon='walk'
							/>
							<Kpi
								color={theme.colors.inversePrimary}
								type='progress'
								value={sportSession.distance ?? 0}
								max={133}
								label={t('session.distance')}
								valueSuffix='km'
								icon='map-marker'
							/>

							<Kpi
								color={theme.colors.tertiary}
								type='progress'
								value={sportSession.average_speed ?? 0}
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
									sportSession.min_heartrate ?? 0,
									sportSession.avg_heartrate ?? 0,
									sportSession.max_heartrate ?? 0
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
	},
	suggestedProductContainer: {
		width: '100%',
	}
})

export default SportSessionSummary
