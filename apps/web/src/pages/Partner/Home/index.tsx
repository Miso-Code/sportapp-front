import NavbarTop from '@/components/NavbarTop'
import Spinner from '@/components/Spinner'
import TransitionAlert from '@/components/TransitionAlert'
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Container,
	Switch,
	Typography
} from '@mui/material'
import { Product } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product'

import { usePartnerProductStore } from '@sportapp/stores'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function HomePartner() {
	const { t } = useTranslation()
	const { getProducts } = usePartnerProductStore()
	const { loading, error } = usePartnerProductStore()
	const [alert, setAlert] = useState(false)
	const [products, setProducts] = useState<Product[]>([])

	const handleGetProducts = useCallback(async () => {
		const response = await getProducts({ limit: 5, offset: 0 })

		if (response) setProducts(response)
	}, [getProducts])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	useEffect(() => {
		handleGetProducts()
	}, [handleGetProducts])

	return (
		<>
			<div className='home-partner-page'>
				<NavbarTop />
				<Container maxWidth='xl' className='mt-4'>
					<Typography className='mb-4' variant='h3'>
						{t('productObtain.title')}
					</Typography>

					{loading ? (
						<Box
							sx={{
								display: 'grid',
								placeContent: 'center',
								width: '100%',
								height: '100%'
							}}>
							<Spinner />
							<Typography className='my-4' variant='h6'>
								{t('loading')}
							</Typography>
						</Box>
					) : (
						<Box
							style={{
								display: 'grid',
								gridTemplateColumns:
									'repeat(auto-fill, minmax(300px, 1fr))',
								gap: '2rem',
								marginTop: '2rem',
								paddingBottom: '2rem'
							}}>
							{products.map((product) => (
								<Card key={product.product_id}>
									<CardContent>
										<div className='flex justify-between'>
											<div className='flex'>
												<Avatar variant='square'>
													{product.name[0]}
												</Avatar>
												<Typography
													className='ml-4'
													variant='h6'>
													{t(product.name)}
												</Typography>
											</div>
											<Switch
												defaultChecked={product.active}
											/>
										</div>
									</CardContent>
									<CardContent>
										<Typography
											style={{
												height: '4rem',
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												display: '-webkit-box',
												WebkitLineClamp: 3,
												WebkitBoxOrient: 'vertical'
											}}
											variant='caption'>
											{product.summary}
										</Typography>
									</CardContent>
								</Card>
							))}
						</Box>
					)}
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
