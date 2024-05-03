import React, { useEffect, useState } from 'react'
import {
	useAlertStore,
	usePaymentPlanStore,
	useUserStore
} from '@sportapp/stores'

import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import {
	Chip,
	Icon,
	MD3Theme,
	Portal,
	Surface,
	Text,
	useTheme,
	TextInput,
	Button,
	ActivityIndicator
} from 'react-native-paper'
import {
	ESubscription,
	PaymentData
} from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'
import { useTranslation } from 'react-i18next'
import KeyboardAvoidingDialog from '@/components/KeyboardAvoidingDialog'

const pricePlans = {
	[ESubscription.FREE]: 0,
	[ESubscription.INTERMEDIATE]: 10000,
	[ESubscription.PREMIUM]: 20000
}

const PaymentPlans: React.FC = () => {
	const theme = useTheme()
	const { t } = useTranslation()
	const { user, getProfile } = useUserStore()
	const { setAlert } = useAlertStore()
	const {
		setSelectedPlan: setPlanToUpdate,
		setPaymentData,
		updatePlan,
		loading
	} = usePaymentPlanStore()

	const styles = createStyles(theme)

	const [showModal, setShowModal] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<ESubscription>()

	const [cardNumber, setCardNumber] = useState('')
	const [cardHolder, setCardHolder] = useState('')
	const [expirationDate, setExpirationDate] = useState('')
	const [cvv, setCvv] = useState('')

	const currentPlan =
		user?.profileData?.subscription_type || ESubscription.FREE

	const handleOpen = (plan: ESubscription) => {
		setShowModal(true)
		setSelectedPlan(plan)
		setPlanToUpdate(plan)
	}

	const handleProcessPayment = async () => {
		const payload: PaymentData = {
			amount: 1,
			card_number: cardNumber,
			card_holder: cardHolder,
			card_expiration_date:
				expirationDate.slice(0, 2) + '/' + expirationDate.slice(2),
			card_cvv: cvv
		}
		setPaymentData(payload)
		const response = await updatePlan()
		setShowModal(false)

		if (response) {
			await getProfile()
			setAlert({
				type: 'success',
				message: t('paymentPlans.alert.success')
			})
		} else {
			setAlert({
				type: 'error',
				message: t('paymentPlans.alert.error')
			})
		}
	}

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

	const isReadyToProcess = () => {
		return (
			cardNumber.length === 16 &&
			cardHolder &&
			expirationDate.length === 4 &&
			cvv.length === 3
		)
	}

	const generateBenefits = (activeBenefitsCount: number) => {
		const benefits = []
		for (let i = 0; i < 8; i++) {
			benefits.push({
				description: t('paymentPlans.benefits.information.' + i),
				isActive: i < activeBenefitsCount
			})
		}
		return benefits
	}

	const paymentPlans = [
		{
			isActive: currentPlan === ESubscription.FREE,
			name: t('paymentPlans.free.title'),
			description: t('paymentPlans.free.description'),
			benefits: generateBenefits(4),
			duration: 'mes',
			price: pricePlans[ESubscription.FREE],
			onClick: () =>
				currentPlan !== ESubscription.FREE
					? handleOpen(ESubscription.FREE)
					: null,
			order: currentPlan === ESubscription.FREE ? 1 : 2
		},
		{
			isActive: currentPlan === ESubscription.INTERMEDIATE,
			name: t('paymentPlans.intermediate.title'),
			description: t('paymentPlans.intermediate.description'),
			benefits: generateBenefits(6),
			duration: 'mes',
			price: pricePlans[ESubscription.INTERMEDIATE],
			onClick: () =>
				currentPlan !== ESubscription.INTERMEDIATE
					? handleOpen(ESubscription.INTERMEDIATE)
					: null,
			order: currentPlan === ESubscription.INTERMEDIATE ? 1 : 2
		},
		{
			isActive: currentPlan === ESubscription.PREMIUM,
			name: t('paymentPlans.premium.title'),
			description: t('paymentPlans.premium.description'),
			benefits: generateBenefits(8),
			duration: 'mes',
			price: pricePlans[ESubscription.PREMIUM],
			onClick: () =>
				currentPlan !== ESubscription.PREMIUM
					? handleOpen(ESubscription.PREMIUM)
					: null,
			order: currentPlan === ESubscription.PREMIUM ? 1 : 2
		}
	].sort((a, b) => a.order - b.order)

	useEffect(() => {
		;(async () => {
			await getProfile()
		})()
	}, [getProfile])

	return (
		<>
			<Portal>
				<KeyboardAvoidingDialog
					visible={showModal}
					onDismiss={() => setShowModal(false)}>
					{loading ? (
						<ActivityIndicator />
					) : (
						<>
							{selectedPlan === ESubscription.FREE ? (
								<>
									<Text variant='titleMedium'>
										{t('paymentPlans.freeCard.title')}
									</Text>
									<Text style={styles.row}>
										{t('paymentPlans.freeCard.description')}
									</Text>
								</>
							) : (
								<>
									<Text variant='titleMedium'>
										{t('paymentPlans.selection.title')}
									</Text>
									<View style={styles.row}>
										<Text>
											{t(
												'paymentPlans.selection.description'
											)}
										</Text>
										<Text style={styles.selectedPlanText}>
											{t(
												`paymentPlans.${selectedPlan}.title`
											)}
										</Text>
									</View>
									<TextInput
										testID='cardNumber'
										label={t('productService.cardNumber')}
										mode='outlined'
										keyboardType='numeric'
										value={formatCardNumber(cardNumber)}
										onChangeText={(val) =>
											setCardNumber(
												val
													.replaceAll(' ', '')
													.slice(0, 16)
											)
										}
										style={styles.input}
										left={
											<TextInput.Icon icon='credit-card-outline' />
										}
									/>
									<TextInput
										testID='cardHolder'
										label={t('productService.cardHolder')}
										mode='outlined'
										value={cardHolder}
										onChangeText={(val) =>
											setCardHolder(val.toUpperCase())
										}
										style={styles.input}
										left={<TextInput.Icon icon='account' />}
									/>
									<TextInput
										testID='expirationDate'
										label={t(
											'productService.expirationDate'
										)}
										mode='outlined'
										keyboardType='numeric'
										value={formatExpirationDate(
											expirationDate
										)}
										onChangeText={(val) =>
											setExpirationDate(
												val.replace('/', '').slice(0, 4)
											)
										}
										style={styles.input}
										left={
											<TextInput.Icon icon='calendar' />
										}
									/>
									<TextInput
										testID='cvv'
										label='CVV/CVV2'
										mode='outlined'
										keyboardType='numeric'
										value={cvv}
										onChangeText={(val) =>
											setCvv(val.slice(0, 3))
										}
										style={styles.input}
										left={<TextInput.Icon icon='lock' />}
									/>
								</>
							)}
							<View style={styles.ctas}>
								<Button
									testID='closeButton'
									onPress={() => setShowModal(false)}>
									{t('paymentPlans.selection.cancel')}
								</Button>
								<Button
									testID='acceptButton'
									disabled={
										selectedPlan !== ESubscription.FREE &&
										!isReadyToProcess()
									}
									onPress={handleProcessPayment}>
									{t('paymentPlans.selection.accept')}
								</Button>
							</View>
						</>
					)}
				</KeyboardAvoidingDialog>
			</Portal>
			<ScrollView contentContainerStyle={styles.container}>
				{paymentPlans.map((plan) => (
					<Surface style={styles.paymentCard} key={plan.name}>
						<Text variant='titleMedium'>{plan.name}</Text>
						<Text variant='bodySmall'>{plan.description}</Text>
						<Text variant='displaySmall'>
							{plan.price
								.toString()
								.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
							/{plan.duration}
						</Text>
						{plan.benefits.map((benefit, index) => (
							<View style={styles.benefit} key={'plan' + index}>
								<Icon
									source={
										benefit.isActive
											? 'check-circle'
											: 'close-circle'
									}
									size={20}
									color={theme.colors.onSurfaceDisabled}
								/>
								<Text variant='bodySmall'>
									{benefit.description}
								</Text>
							</View>
						))}
						{plan.isActive && (
							<Chip
								mode='outlined'
								textStyle={styles.chipText}
								style={styles.chip}>
								{t('paymentPlans.active')}
							</Chip>
						)}
						<Pressable
							testID='paymentPressable'
							style={styles.paymentPressable}
							onPress={plan.onClick}
						/>
					</Surface>
				))}
			</ScrollView>
		</>
	)
}

const createStyles = (theme: MD3Theme) =>
	StyleSheet.create({
		container: {
			justifyContent: 'center',
			alignItems: 'center',
			paddingHorizontal: 15,
			marginTop: 120,
			paddingBottom: 120
		},
		paymentCard: {
			padding: 20,
			margin: 10,
			borderRadius: 10,
			gap: 10,
			width: '90%'
		},
		chip: {
			position: 'absolute',
			top: 2,
			right: 10,
			alignSelf: 'center',
			marginTop: 10,
			borderColor: theme.colors.primary,
			backgroundColor: theme.colors.primaryContainer
		},
		chipText: {
			color: theme.colors.primary
		},
		benefit: {
			flex: 1,
			flexDirection: 'row',
			alignItems: 'center',
			gap: 20
		},
		paymentPressable: {
			position: 'absolute',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0
		},
		input: {
			width: '100%',
			marginVertical: 10
		},
		row: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			marginVertical: 10
		},
		selectedPlanText: {
			fontWeight: 'bold'
		},
		ctas: {
			flexDirection: 'row',
			justifyContent: 'flex-end',
			marginTop: 20
		}
	})

export default PaymentPlans
