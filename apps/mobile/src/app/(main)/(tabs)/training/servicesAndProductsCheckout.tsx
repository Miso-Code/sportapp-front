import React, { useEffect, useState } from 'react'

import { ScrollView, StyleSheet, View } from 'react-native'
import {
	Button,
	TextInput,
	Portal,
	Text,
	ActivityIndicator
} from 'react-native-paper'
import { useLocalSearchParams, router } from 'expo-router'
import ProductServiceCard from '@/components/ProductServiceCard'
import KeyboardAvoidingDialog from '@/components/KeyboardAvoidingDialog'
import { useAlertStore, useBusinessPartnerStore } from '@sportapp/stores'
import Markdown from 'react-native-markdown-display'
import { useTranslation } from 'react-i18next'

const ServiceAndProductsCheckout: React.FC = () => {
	const params = useLocalSearchParams()
	const { t } = useTranslation()
	const { setAlert } = useAlertStore()

	const [isLoading, setIsLoading] = useState(false)

	const [quantity, setQuantity] = useState(params?.quantity?.toString() ?? '')

	const [cardNumber, setCardNumber] = useState('')
	const [cardHolder, setCardHolder] = useState('')
	const [expirationDate, setExpirationDate] = useState('')
	const [cvv, setCvv] = useState('')

	const { productToCheckout } = useBusinessPartnerStore()

	const formatCardNumber = (value: string) => {
		if (!value) return
		const numbers = value.replace(/\D/g, '')
		return numbers
			.match(/.{1,4}/g)
			.join(' ')
			.trim()
	}
	const formatExpirationDate = (value: string) => {
		if (!value) return
		const numbers = value.replace(/\D/g, '')
		return numbers
			.match(/.{1,2}/g)
			.join('/')
			.trim()
	}

	const processPayment = async () => {
		setIsLoading(true)
		await new Promise((resolve) => setTimeout(resolve, 2000))
		setIsLoading(false)

		if (cardNumber === '4242424242424242') {
			setAlert({
				type: 'success',
				message: t('productService.paymentSuccess')
			})
		} else {
			setAlert({
				type: 'error',
				message: t('productService.paymentFailed')
			})
		}

		router.back()
	}

	const isReadyToProcess = () => {
		return (
			quantity &&
			cardNumber.length === 16 &&
			cardHolder &&
			expirationDate.length === 4 &&
			cvv.length === 3
		)
	}

	useEffect(() => {
		if (!productToCheckout) {
			setAlert({
				type: 'error',
				message: 'No se ha seleccionado un producto'
			})
			router.back()
		}
	}, [productToCheckout, setAlert])

	return (
		<>
			<Portal>
				<KeyboardAvoidingDialog
					testID='modalProcessing'
					visible={isLoading}>
					<View style={styles.center}>
						<ActivityIndicator size='large' />
						<Text variant='bodyLarge'>
							{t('productService.processingPayment')}
						</Text>
					</View>
				</KeyboardAvoidingDialog>
			</Portal>
			<ScrollView
				contentInsetAdjustmentBehavior='automatic'
				contentContainerStyle={styles.container}>
				{productToCheckout && (
					<>
						<ProductServiceCard
							title={productToCheckout.name}
							price={productToCheckout.price}
							priceFrequency={productToCheckout.payment_frequency}
							description={productToCheckout.summary}
							category={productToCheckout.category}
							image={productToCheckout.image_url}
						/>
						<View>
							<Markdown>{productToCheckout.description}</Markdown>
						</View>
					</>
				)}
				<TextInput
					testID='quantity'
					label={t('productService.quantity')}
					mode='outlined'
					keyboardType='numeric'
					value={quantity}
					onChangeText={setQuantity}
					style={styles.input}
				/>
				<TextInput
					testID='cardNumber'
					label={t('productService.cardNumber')}
					mode='outlined'
					keyboardType='numeric'
					value={formatCardNumber(cardNumber)}
					onChangeText={(val) =>
						setCardNumber(val.replaceAll(' ', '').slice(0, 16))
					}
					style={styles.input}
					left={<TextInput.Icon icon='credit-card-outline' />}
				/>
				<TextInput
					testID='cardHolder'
					label={t('productService.cardHolder')}
					mode='outlined'
					value={cardHolder}
					onChangeText={(val) => setCardHolder(val.toUpperCase())}
					style={styles.input}
					left={<TextInput.Icon icon='account' />}
				/>
				<View style={styles.row}>
					<TextInput
						testID='expirationDate'
						label={t('productService.expirationDate')}
						mode='outlined'
						keyboardType='numeric'
						value={formatExpirationDate(expirationDate)}
						onChangeText={(val) =>
							setExpirationDate(val.replace('/', '').slice(0, 4))
						}
						left={<TextInput.Icon icon='calendar' />}
					/>
					<TextInput
						testID='cvv'
						label='CVV/CVV2'
						mode='outlined'
						keyboardType='numeric'
						value={cvv}
						onChangeText={(val) => setCvv(val.slice(0, 3))}
						left={<TextInput.Icon icon='lock' />}
					/>
				</View>
				<Button
					testID='payButton'
					mode='contained'
					style={styles.button}
					onPress={processPayment}
					disabled={!isReadyToProcess()}>
					{t('productService.pay')}
				</Button>
				<Button
					testID='cancelButton'
					mode='outlined'
					style={styles.button}
					onPress={() => router.back()}>
					{t('productService.cancel')}
				</Button>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
	center: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10
	},
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 15,
		gap: 20,
		paddingTop: 110,
		paddingBottom: 110
	},
	input: {
		width: '100%'
	},
	button: {
		width: '100%',
		borderRadius: 5
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	}
})

export default ServiceAndProductsCheckout
