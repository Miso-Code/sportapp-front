import PaymentForm from '@/containers/PaymentForm'
import { FormPaymentData } from '@/containers/PaymentForm/utils/schema'
import LoadingButton from '@mui/lab/LoadingButton'
import {
	Box,
	Button,
	CardActions,
	CardContent,
	Modal,
	Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Props } from './interfaces'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	minWidth: 300,
	width: '100%',
	maxWidth: 800,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4
}

export default function ModalStep({
	handleClose,
	handleSubmit,
	open,
	price,
	isFreePlan,
	isLoading
}: Props) {
	const { t } = useTranslation()

	const handleFreeSubmit = () => {
		const payload: FormPaymentData = {
			amount: 0,
			cvc: '123',
			expiry: '12/90',
			name: 'Test User',
			number: '4242424242424242'
		}
		handleSubmit(payload)
	}

	return (
		<>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					{isFreePlan ? (
						<Box>
							<CardContent>
								<Typography
									gutterBottom
									variant='h5'
									component='div'>
									{t('paymentPlans.freeCard.title')}
								</Typography>
								<Typography
									variant='body2'
									color='text.secondary'>
									{t('paymentPlans.freeCard.description')}
								</Typography>
							</CardContent>
							<CardActions>
								<Button
									onClick={handleClose}
									color='error'
									fullWidth
									variant='contained'>
									{t('form.cancel')}
								</Button>
								<LoadingButton
									color='success'
									fullWidth
									onClick={handleFreeSubmit}
									loading={isLoading}
									variant='contained'>
									{t('form.obtain')}
								</LoadingButton>
							</CardActions>
						</Box>
					) : (
						<PaymentForm
							onCancel={handleClose}
							onSubmit={handleSubmit}
							options={[
								{
									label: `$${price}`,
									value: `${price}`
								}
							]}
							price={price}
							isLoading={isLoading}
						/>
					)}
				</Box>
			</Modal>
		</>
	)
}
