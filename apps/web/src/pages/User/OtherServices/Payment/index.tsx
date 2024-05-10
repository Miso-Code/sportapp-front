import ContainerLayout from '@/components/ContainerLayout'
import PaymentForm from '@/containers/PaymentForm'
import { FormPaymentData } from '@/containers/PaymentForm/utils/schema'
import { currencyByCountry } from '@/pages/Partner/PurchasedProduct/containers/Table/utils'
import {
	Backdrop,
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	CircularProgress,
	Paper,
	Typography
} from '@mui/material'
import {
	useAlertStore,
	useBusinessPartnerStore,
	useUserStore
} from '@sportapp/stores'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './_index.scss'
import TransitionAlert from '@/components/TransitionAlert'

export default function PaymentOtherServicePage() {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const { productToCheckout } = useBusinessPartnerStore()
	const { purchaseProduct, setProductToCheckout } = useBusinessPartnerStore()
	const { alert } = useAlertStore()
	const { setAlert } = useAlertStore()
	const { user } = useUserStore()

	const [loading, setLoading] = useState(false)
	const [alertShow, setAlertShow] = useState(false)

	const handleSubmit = async (data: FormPaymentData) => {
		if (productToCheckout) {
			setLoading(true)
			const response = await purchaseProduct({
				user_name: `${user?.profileData?.first_name} ${user?.profileData?.last_name}`,
				user_email: `${user?.profileData?.email}`,
				payment_data: {
					card_number: data.number,
					card_holder: data.name,
					card_cvv: data.cvc,
					card_expiration_date: data.expiry,
					amount: data.amount
				},
				product_id: productToCheckout.product_id
			})
			setLoading(false)

			if (response) {
				setAlert({
					message: t('productService.paymentSuccess'),
					type: 'success'
				})
				setProductToCheckout(undefined)
				handleCancel()
				return
			}
			setAlertShow(true)
			setAlert({
				message: t('productService.paymentFailed'),
				type: 'error'
			})
		}
	}

	const handleCancel = () => {
		navigate('/other-services')
	}

	return (
		<ContainerLayout
			className='other-service-pay-page'
			withSecondarySection={false}>
			<TransitionAlert
				isOpen={alertShow}
				message={t(alert?.message ?? '')}
				severity='error'
				handleClose={() => setAlertShow(false)}
			/>
			<section className='other-service-pay-page-section'>
				<Typography className='other-service-page-title' variant='h3'>
					{t('productService.pay')}
				</Typography>
			</section>
			<Box
				component='main'
				sx={{
					display: 'grid',
					gridTemplateColumns: 'minmax(0, 37rem) minmax(0, 22rem)',
					gap: '2rem',
					marginTop: '2rem',
					alignItems: 'start',
					'@media (max-width: 768px)': {
						gridTemplateColumns: 'minmax(0, 100%)',
						height: '100%',
						overflowY: 'auto'
					}
				}}>
				<Box component='section'>
					<PaymentForm
						onSubmit={handleSubmit}
						onCancel={handleCancel}
						options={[
							{
								label: `${productToCheckout?.price}`,
								value: `${productToCheckout?.price}`
							}
						]}
						price={productToCheckout?.price}
					/>
				</Box>
				<Card
					id='card-price-other-service'
					sx={{ maxHeight: '25rem', minHeight: '20rem' }}>
					{productToCheckout && (
						<>
							<CardMedia
								component='img'
								height='190'
								image={productToCheckout.image_url}
								alt={productToCheckout.name}
							/>
							<CardContent>
								<Typography
									gutterBottom
									variant='h5'
									component='div'>
									{productToCheckout.name}
								</Typography>
								<Typography
									variant='body2'
									sx={{
										height: '2.6rem',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										display: '-webkit-box',
										WebkitLineClamp: 3,
										WebkitBoxOrient: 'vertical'
									}}
									color='text.secondary'>
									{productToCheckout.summary}
								</Typography>
								<Box
									sx={{
										mt: 2,
										display: 'flex',
										justifyContent: 'space-between'
									}}>
									<Chip
										label={t(
											`productService.${productToCheckout.category}`
										)}
									/>
									<Chip
										color='secondary'
										label={`${currencyByCountry(
											productToCheckout.price,
											i18n.language === 'es'
												? 'COP'
												: 'USD'
										)} `}
									/>
								</Box>
							</CardContent>
						</>
					)}
				</Card>
			</Box>
			<Backdrop
				sx={{
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1
				}}
				open={loading}>
				<Paper
					sx={{
						width: '20rem',
						height: '5rem',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						padding: '1.5rem',
						flexDirection: 'column'
					}}>
					<CircularProgress color='primary' />
					<Typography className='mt-4'>
						{t('productService.loading')}
					</Typography>
				</Paper>
			</Backdrop>
		</ContainerLayout>
	)
}
