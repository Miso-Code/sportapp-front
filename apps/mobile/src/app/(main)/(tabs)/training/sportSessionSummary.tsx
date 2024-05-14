import React, { useEffect, useState } from 'react'

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
	const { sportSession } = useSportSessionStore()
	const { setProductToCheckout, suggestProduct } = useBusinessPartnerStore()

	const [loadingSuggestedProduct, setLoadingSuggestedProduct] =
		useState(false)
	const [suggestedProduct, setSuggestedProduct] =
		useState<Awaited<ReturnType<typeof suggestProduct>>>()

	useEffect(() => {
		if (sportSession) {
			setLoadingSuggestedProduct(true)
			;(async () => {
				const product = await suggestProduct({
					category: 'nutrition'
				})
				setSuggestedProduct(product)
				setLoadingSuggestedProduct(false)
			})()
		}
	}, [sportSession, suggestProduct])

	return (
		<SafeAreaProvider>
			<ScrollView contentContainerStyle={styles.container}>
				{sportSession ? (
					<>
						{loadingSuggestedProduct ? (
							<ActivityIndicator />
						) : (
							<>
								{suggestedProduct && (
									<>
										<Text variant='headlineMedium'>
											{t(
												'session.nutritionalSuggestionTitle'
											)}
										</Text>
										<Text>
											{t('session.nutritionalSuggestion')}
										</Text>
										<View
											style={
												styles.suggestedProductContainer
											}>
											<ProductServiceCard
												title={suggestedProduct.name}
												description={
													suggestedProduct.summary
												}
												price={suggestedProduct.price}
												priceFrequency={
													suggestedProduct.payment_frequency
												}
												image={
													suggestedProduct.image_url
												}
												category={
													suggestedProduct.category
												}
												onPress={() => {
													setProductToCheckout(
														suggestedProduct
													)
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
										</View>
									</>
								)}
							</>
						)}
						<Text variant='headlineMedium'>Métricas</Text>
						<View>
							<Kpi
								testID='calories'
								color={theme.colors.error}
								type='progress'
								value={sportSession.calories ?? 0}
								max={10}
								label={t('session.calories')}
								valueSuffix='kcal'
								icon='fire'
							/>
							<Kpi
								testID='duration'
								color={theme.colors.secondary}
								type='progress'
								value={sportSession.duration ?? 0}
								max={60}
								label={t('session.duration')}
								valueSuffix='s'
								icon='timer'
							/>
							<Kpi
								testID='steps'
								color={theme.colors.primary}
								type='progress'
								value={sportSession.steps ?? 0}
								max={115}
								label={t('session.steps')}
								valueSuffix=''
								icon='walk'
							/>
							<Kpi
								testID='distance'
								color={theme.colors.inversePrimary}
								type='progress'
								value={sportSession.distance ?? 0}
								max={133}
								label={t('session.distance')}
								valueSuffix='km'
								icon='map-marker'
							/>

							<Kpi
								testID='speed'
								color={theme.colors.tertiary}
								type='progress'
								value={sportSession.average_speed ?? 0}
								max={3}
								label={t('session.speed')}
								valueSuffix='m/s'
								icon='speedometer'
							/>

							<Kpi
								testID='heartrate'
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
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 100,
		marginHorizontal: 20,
		gap: 20
	},
	loaderContainer: {
		width: '100%',
		marginVertical: 100
	},
	suggestedProductContainer: {
		width: '100%'
	}
})

export default SportSessionSummary
