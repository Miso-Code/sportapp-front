import NavbarTop from '@/components/NavbarTop'
import TransitionAlert from '@/components/TransitionAlert'
import LoadingButton from '@mui/lab/LoadingButton'
import { Card, Container, Typography } from '@mui/material'
import { usePartnerProductStore } from '@sportapp/stores'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

export default function UpdateProductPartnerPage() {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const location = useLocation()
	const { deleteProduct, setError } = usePartnerProductStore()
	const { loading, error } = usePartnerProductStore()
	const [alert, setAlert] = useState(false)


	const deleteProductHandler = async () => {
		const searchParams = new URLSearchParams(location.search)
		const productId = searchParams.get('productId')
		if (!productId) {
			setError('errors.partner.updateProduct.productId')
			setAlert(true)
			return
		}

		const response = await deleteProduct(productId)
		if (response) {
			navigate('/partner/home')
		}
	}
	return (
		<>
			<div>
				<NavbarTop />
				<Container maxWidth='xl'>
					<main className='my-8'>
						<Card
							variant='outlined'
							className='p-8 max-w-4xl mx-auto'>
							<Typography className='mb-4' variant='h4'>
								{t('productUpdate.title')}
							</Typography>

							<LoadingButton
								className='mt-4'
								loading={loading}
								fullWidth
								type='button'
								onClick={deleteProductHandler}
								variant='contained'
								color='error'>
								{t('productUpdate.delete')}
							</LoadingButton>
						</Card>
					</main>
				</Container>
			</div>
			<TransitionAlert
				containerClassName='alert-partner-update-product-container'
				isOpen={alert}
				handleClose={setAlert}
				message={t(error ?? 'errors.partner.updateProduct.base')}
				severity='error'
			/>
		</>
	)
}
