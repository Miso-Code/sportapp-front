import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
	Typography
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { ReactElement, forwardRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import CardPaymentPlan from './components/CardPaymentPlan'
import { PlanType, PlanTypes } from './interfaces'

const Transition = forwardRef<
	unknown,
	TransitionProps & { children: ReactElement }
>((props, ref) => {
	return <Slide direction='up' ref={ref} {...props} />
})

export default function PaymentPlans() {
	const { t } = useTranslation()
	const [open, setOpen] = useState(false)
	const [selected, setSelected] = useState<PlanType>('free')
	const [selectedModal, setSelectedModal] = useState<PlanType>(PlanTypes.NONE)

	const handleOpen = (plan: PlanType) => {
		setSelectedModal(plan)
		setOpen(true)
	}
	const handleClose = () => setOpen(false)
	const handleSelect = () => {
		setSelected(selectedModal)
		handleClose()
	}

	return (
		<div className='payment-plan-form'>
			<Box className='px-3'>
				<Typography className='personal-data-form-title' variant='h3'>
					{t('paymentPlans.title')}
				</Typography>
				<Box className='payment-plan-form-container'>
					<CardPaymentPlan
						className='payment-card'
						isActive={selected === 'free'}
						activeText={t('paymentPlans.active')}
						name={t('paymentPlans.free.title')}
						description={t('paymentPlans.free.description')}
						benefits={[
							{
								description: t(
									'paymentPlans.benefits.information.0'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.1'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.2'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.3'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.4'
								),
								isActive: false
							},
							{
								description: t(
									'paymentPlans.benefits.information.5'
								),
								isActive: false
							},
							{
								description: t(
									'paymentPlans.benefits.information.6'
								),
								isActive: false
							},
							{
								description: t(
									'paymentPlans.benefits.information.7'
								),
								isActive: false
							}
						]}
						duration='mes'
						price={0}
						onClick={() => handleOpen('free')}
					/>
					<CardPaymentPlan
						className='payment-card'
						isActive={selected === 'basic'}
						name={t('paymentPlans.basic.title')}
						description={t('paymentPlans.basic.description')}
						benefits={[
							{
								description: t(
									'paymentPlans.benefits.information.0'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.1'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.2'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.3'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.4'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.5'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.6'
								),
								isActive: false
							},
							{
								description: t(
									'paymentPlans.benefits.information.7'
								),
								isActive: false
							}
						]}
						duration='mes'
						price={5}
						onClick={() => handleOpen('basic')}
					/>
					<CardPaymentPlan
						className='payment-card'
						isActive={selected === 'premium'}
						name={t('paymentPlans.premium.title')}
						description={t('paymentPlans.premium.description')}
						benefits={[
							{
								description: t(
									'paymentPlans.benefits.information.0'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.1'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.2'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.3'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.4'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.5'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.6'
								),
								isActive: true
							},
							{
								description: t(
									'paymentPlans.benefits.information.7'
								),
								isActive: true
							}
						]}
						duration='mes'
						price={10}
						onClick={() => handleOpen('premium')}
					/>
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
							<b>{t(`paymentPlans.${selected}.title`)}.</b>
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button color='error' onClick={handleClose}>
							{t('form.disagree')}
						</Button>
						<Button onClick={handleSelect}>
							{t('form.agree')}
						</Button>
					</DialogActions>
				</Dialog>
			</Box>
		</div>
	)
}
