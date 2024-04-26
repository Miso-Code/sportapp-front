import NavbarTop from '@/components/NavbarTop'
import Spinner from '@/components/Spinner'
import TransitionAlert from '@/components/TransitionAlert'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import {
	Avatar,
	Box,
	Card,
	CardContent,
	Container,
	Pagination,
	Switch,
	Typography
} from '@mui/material'
import { Product } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product'

import { usePartnerProductStore } from '@sportapp/stores'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

export default function HomePartner() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const search = location.search
	const { getProducts, updateProduct } = usePartnerProductStore()
	const { loading, error, products } = usePartnerProductStore()
	const [alert, setAlert] = useState(false)
	const [page, setPage] = useState(1)

	const handleChange = async (
		_event: React.ChangeEvent<unknown>,
		value: number
	) => {
		setPage(value)
		await handleGetProducts()
	}

	const handleGetProducts = useCallback(async () => {
		await getProducts({ limit: 5, offset: page - 1 })
	}, [getProducts, page])

	const handleGoToUpdateProduct = (productId: string) => {
		navigate({
			pathname: `/partner/product/update`,
			search: search
				? `${search}&productId=${productId}`
				: `?productId=${productId}`
		})
	}

	const handleUpdateProduct = useCallback(
		async (productId: string, active: boolean, product: Product) => {
			const payload = { ...product, active }

			const response = await updateProduct({ ...payload }, productId)

			if (!response) {
				setAlert(true)
				return
			}

			await handleGetProducts()
		},
		[handleGetProducts, updateProduct]
	)

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
						<>
							<Box
								style={{
									display: 'grid',
									gridTemplateColumns:
										'repeat(auto-fill, minmax(300px, 1fr))',
									gap: '2rem',
									marginTop: '2rem',
									paddingBottom: '2rem'
								}}>
								{products &&
								Array.isArray(products) &&
								products.length > 0 ? (
									products.map((product) => (
										<Card
											key={product.product_id}
											className='cursor-pointer'
											onClick={() =>
												handleGoToUpdateProduct(
													product.product_id
												)
											}>
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
													<div
														onClick={(event) => {
															event.stopPropagation()
														}}
														onKeyDown={(event) => {
															if (
																event.key ===
																	'Enter' ||
																event.key ===
																	' '
															) {
																event.stopPropagation()
															}
														}}>
														<Switch
															checked={
																product.active
															}
															id={`${product.product_id}-switch`}
															onChange={(
																event: React.ChangeEvent<HTMLInputElement>
															) => {
																handleUpdateProduct(
																	product.product_id,
																	event.target
																		.checked,
																	product
																)
															}}
														/>
													</div>
												</div>
											</CardContent>
											<CardContent>
												<Typography
													style={{
														height: '4rem',
														overflow: 'hidden',
														textOverflow:
															'ellipsis',
														display: '-webkit-box',
														WebkitLineClamp: 3,
														WebkitBoxOrient:
															'vertical'
													}}
													variant='caption'>
													{product.summary}
												</Typography>
											</CardContent>
										</Card>
									))
								) : (
									<Box className='flex flex-col items-center col-span-full'>
										<SearchOffIcon
											color='action'
											style={{
												width: '6rem',
												height: '6rem'
											}}
										/>
										<Typography color='GrayText'>
											{t('productObtain.noProducts')}
										</Typography>
									</Box>
								)}
							</Box>
							<Pagination
								count={10}
								color='primary'
								page={page}
								onChange={handleChange}
								shape='rounded'
								className='w-fit mx-auto'
							/>
						</>
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
