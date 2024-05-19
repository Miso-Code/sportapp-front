import NavbarTop from '@/components/NavbarTop'
import Spinner from '@/components/Spinner'
import TransitionAlert from '@/components/TransitionAlert'
import CreateProduct from '@/containers/Partner/CreateProduct'
import { FormData } from '@/containers/Partner/CreateProduct/utils/schema'
import { toBase64 } from '@/utils/files'
import LoadingButton from '@mui/lab/LoadingButton'
import { Box, Card, Container, Typography } from '@mui/material'
import {
	ProductCreateRequest,
	WithBase64Image,
	WithUrlImage
} from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-create'
import { usePartnerProductStore } from '@sportapp/stores'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import './_index.scss'

export default function UpdateProductPartnerPage() {
	const [product, setProduct] = useState<FormData>()
	const navigate = useNavigate()
	const { t } = useTranslation()
	const location = useLocation()
	const { deleteProduct, setError, getProduct, updateProduct } =
		usePartnerProductStore()
	const { loading, error } = usePartnerProductStore()
	const [alert, setAlert] = useState(false)

	const productId = useMemo(() => {
		const searchParams = new URLSearchParams(location.search)
		return searchParams.get('productId') ?? ''
	}, [location.search])

	const deleteProductHandler = useCallback(async () => {
		if (!productId) {
			setError('errors.partner.updateProduct.productId')
			setAlert(true)
			return
		}

		const response = await deleteProduct(productId)
		if (response) {
			navigate('/partner/home')
		}
	}, [deleteProduct, navigate, productId, setError])

	const handleGetProduct = useCallback(async () => {
		if (!productId) {
			setError('errors.partner.updateProduct.productId')
			setAlert(true)
			return
		}

		const response = await getProduct(productId)
		if (!response) {
			setAlert(true)
			return
		}

		const payload: FormData = {
			category: response.category,
			name: response.name,
			summary: response.summary,
			url: response.url,
			price: response.price,
			paymentType: response.payment_type,
			paymentFrequency: response.payment_frequency,
			description: response.description,
			imageUrl: response.image_url,
			typeImage: 'false',
			sport_id: response.sport_id ?? ''
		}
		setProduct(payload)
	}, [getProduct, productId, setError])

	const handleUpdateProduct = useCallback(
		async (productData: FormData) => {
			let image64 = ''
			try {
				image64 = productData.image_base64
					? await toBase64(productData.image_base64 as File)
					: ''
			} catch (error) {
				setError('errors.partner.createProduct.image')
			}

			const product: ProductCreateRequest =
				productData.typeImage === 'true'
					? ({
							category: productData.category,
							name: productData.name,
							summary: productData.summary,
							url: productData.url,
							price: productData.price,
							payment_type: productData.paymentType,
							payment_frequency: productData.paymentFrequency,
							description: productData.description,
							image_base64: image64,
							sport_id: productData.sport_id
					  } as WithBase64Image)
					: ({
							category: productData.category,
							name: productData.name,
							summary: productData.summary,
							url: productData.url,
							price: productData.price,
							payment_type: productData.paymentType,
							payment_frequency: productData.paymentFrequency,
							description: productData.description,
							image_url: productData.imageUrl,
							sport_id: productData.sport_id
					  } as WithUrlImage)

			const response = await updateProduct(product, productId)
			if (response) {
				navigate('/partner/home')
			}
		},
		[navigate, productId, setError, updateProduct]
	)

	useEffect(() => {
		handleGetProduct()
	}, [handleGetProduct])

	return (
		<Box>
			<NavbarTop />
			<Container maxWidth='xl' sx={{ position: 'relative' }}>
				<main className='my-8'>
					<Card variant='outlined' className='p-8 max-w-4xl mx-auto'>
						<Typography className='mb-4' variant='h4'>
							{t('productUpdate.title')}
						</Typography>

						{loading ? (
							<Box
								sx={{
									display: 'flex',
									justifyContent: 'center',
									width: '100%'
								}}>
								<Spinner />
								<Typography className='mb-4' variant='h4'>
									{t('loading')}
								</Typography>
							</Box>
						) : (
							<CreateProduct
								isLoading={loading}
								onHandleSubmit={handleUpdateProduct}
								defaultValues={product}
								buttonText='productUpdate.update'
							/>
						)}

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
				<TransitionAlert
					containerClassName='alert-partner-update-product-container'
					isOpen={alert}
					handleClose={setAlert}
					message={t(error ?? 'errors.partner.updateProduct.base')}
					severity='error'
				/>
			</Container>
		</Box>
	)
}
