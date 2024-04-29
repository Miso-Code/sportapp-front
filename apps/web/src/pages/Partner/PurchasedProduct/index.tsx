import NavbarTop from '@/components/NavbarTop'
import TransitionAlert from '@/components/TransitionAlert'
import CustomPaginationActionsTable from '@/pages/Partner/PurchasedProduct/containers/Table'
import { Card, Container, Typography } from '@mui/material'
import { usePartnerProductStore } from '@sportapp/stores'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function ViewPurchasedProduct() {
	const { t } = useTranslation()
	const { error } = usePartnerProductStore()
	const [alert, setAlert] = useState(false)

	return (
		<>
			<div>
				<NavbarTop />
				<Container maxWidth='xl'>
					<main className='my-8'>
						<Typography className='mb-4' variant='h4'>
							{t('paymentPurchased.title')}
						</Typography>
						<Card variant='outlined'>
							<CustomPaginationActionsTable />
						</Card>
					</main>
				</Container>
			</div>
			<TransitionAlert
				containerClassName='alert-partner-purchased-product-container'
				isOpen={alert}
				handleClose={setAlert}
				message={t(error ?? 'errors.partner.updateProduct.base')}
				severity='error'
			/>
		</>
	)
}
