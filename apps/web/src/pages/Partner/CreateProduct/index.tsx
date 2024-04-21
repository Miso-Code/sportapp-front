import NavbarTop from '@/components/NavbarTop'
import TransitionAlert from '@/components/TransitionAlert'
import CreateProduct from '@/containers/Partner/CreateProduct'
import { FormData } from '@/containers/Partner/CreateProduct/utils/schema'
import { toBase64 } from '@/utils/files'
import { Card, Container, Typography } from '@mui/material'
import {
	ProductCreateRequest,
	WithBase64Image,
	WithUrlImage
} from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-create'
import { usePartnerProductStore } from '@sportapp/stores'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function CreateProductPartnerPage() {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { createProduct, setError } = usePartnerProductStore()
	const { loading, error } = usePartnerProductStore()
	const [alert, setAlert] = useState(false)

	const onSubmit = async (data: FormData) => {
		let image64 = ''
		try {
			image64 = data.image_base64
				? await toBase64(data.image_base64 as File)
				: ''
		} catch (error) {
			setError('errors.partner.createProduct.image')
		}

		const payload: ProductCreateRequest =
			data.typeImage === 'true'
				? ({
						category: data.category,
						name: data.name,
						summary: data.summary,
						url: data.url,
						price: data.price,
						payment_type: data.paymentType,
						payment_frequency: data.paymentFrequency,
						description: data.description,
						image_base64: image64
				  } as WithBase64Image)
				: ({
						category: data.category,
						name: data.name,
						summary: data.summary,
						url: data.url,
						price: data.price,
						payment_type: data.paymentType,
						payment_frequency: data.paymentFrequency,
						description: data.description,
						image_url: data.imageUrl
				  } as WithUrlImage)

		const result = await createProduct(payload)
		if (result) navigate('/partner/home')
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
								{t('app.name')}
							</Typography>

							<CreateProduct
								isLoading={loading}
								onHandleSubmit={onSubmit}
							/>
						</Card>
					</main>
				</Container>
			</div>
			<TransitionAlert
				containerClassName='alert-partner-login-container'
				isOpen={alert}
				handleClose={setAlert}
				message={t(error ?? 'errors.partner.createProduct.base')}
				severity='error'
			/>
		</>
	)
}
