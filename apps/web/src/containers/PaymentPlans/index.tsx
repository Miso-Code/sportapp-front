import {
	Alert,
	Box,
	Button,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import {
	ESubscription,
	PaymentData,
	subscriptionType
} from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'
import {
	useAuthStore,
	usePaymentPlanStore,
	useUserStore
} from '@sportapp/stores'
import { ReactElement, forwardRef, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormPaymentData } from '../PaymentForm/utils/schema'
import './_index.scss'
import CardPaymentPlan from './components/CardPaymentPlan'
import ModalStep from './container/ModalStep'

const Transition = forwardRef<
	unknown,
	TransitionProps & { children: ReactElement }
>((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />
})

const pricePlans = {
	[ESubscription.FREE]: 0,
	[ESubscription.INTERMEDIATE]: 10000,
	[ESubscription.PREMIUM]: 20000
}

export default function PaymentPlans() {
	const { t } = useTranslation()
	const { selectedPlan, loading } = usePaymentPlanStore()
	const { setSelectedPlan, setPaymentData, updatePlan } =
		usePaymentPlanStore()
	const { getProfile } = useUserStore()
	const { refreshToken } = useAuthStore()
	const { user, loading: loadingUser } = useUserStore()
	const [open, setOpen] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const [alert, setAlert] = useState<{
		show: boolean
		type: 'success' | 'error' | 'warning' | 'info'
		message: string
	}>({ show: false, type: 'success', message: '' })

	const currentPlan =
		user?.profileData?.subscription_type || ESubscription.FREE

	const handleOpen = useCallback(
		(plan: subscriptionType) => {
			setSelectedPlan(plan)
			setOpen(true)
		},
		[setSelectedPlan]
	)
	const handleOpenModal = useCallback(() => setOpenModal(true), [])

	const handleClose = useCallback(() => setOpen(false), [])
	const handleCloseModal = useCallback(() => setOpenModal(false), [])
	const handleCloseAll = useCallback(() => {
		handleClose()
		handleCloseModal()
	}, [handleClose, handleCloseModal])
	const handleCloseAlert = useCallback(
		() => setAlert((prev) => ({ ...prev, show: false })),
		[]
	)

	const handleSelect = useCallback(
		async (data: FormPaymentData) => {
			const payload: PaymentData = {
				amount: data.amount,
				card_cvv: data.cvc,
				card_expiration_date: data.expiry,
				card_holder: data.name,
				card_number: data.number
			}
			setPaymentData(payload)
			const response = await updatePlan()

			if (response) {
				setAlert({
					show: true,
					type: 'success',
					message: t('paymentPlans.alert.success')
				})
			} else {
				setAlert({
					show: true,
					type: 'error',
					message: t('paymentPlans.alert.error')
				})
			}
			await getProfile()
			await refreshToken()
			window.scrollTo(0, 0)
			handleCloseAll()
		},
		[
			getProfile,
			handleCloseAll,
			refreshToken,
			setPaymentData,
			t,
			updatePlan
		]
	)

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
	]

	paymentPlans.sort((a, b) => a.order - b.order)

	return (
		<>
			<Collapse in={alert.show}>
				<Alert severity={alert.type} onClose={handleCloseAlert}>
					{alert.message}
				</Alert>
			</Collapse>
			<div className='payment-plan-form'>
				<Box className='px-3'>
					<Typography
						className='personal-data-form-title'
						variant='h3'>
						{t('paymentPlans.title')}
					</Typography>
					<Box className='payment-plan-form-container'>
						{paymentPlans.map((plan, index) => (
							<CardPaymentPlan
								key={index}
								className='payment-card'
								isActive={plan.isActive}
								name={plan.name}
								description={plan.description}
								benefits={plan.benefits}
								duration={plan.duration}
								price={plan.price}
								onClick={plan.onClick}
							/>
						))}
					</Box>
					<Dialog
						open={open}
						TransitionComponent={Transition}
						keepMounted
						onClose={handleClose}
						aria-describedby='alert-dialog-slide-description'>
						<DialogTitle>
							{t('paymentPlans.selection.title')}
						</DialogTitle>
						<DialogContent>
							<DialogContentText id='alert-dialog-slide-description'>
								{t('paymentPlans.selection.description')}
								<b>
									{t(`paymentPlans.${selectedPlan}.title`)}.
								</b>
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button color='error' onClick={handleClose}>
								{t('form.disagree')}
							</Button>

							<Button onClick={handleOpenModal}>
								{t('form.agree')}
							</Button>

							<ModalStep
								handleClose={handleCloseModal}
								handleSubmit={handleSelect}
								open={openModal}
								price={
									pricePlans[selectedPlan as ESubscription]
								}
								isFreePlan={selectedPlan === ESubscription.FREE}
								isLoading={loading || loadingUser}
							/>
						</DialogActions>
					</Dialog>
				</Box>
			</div>
		</>
	)
}
