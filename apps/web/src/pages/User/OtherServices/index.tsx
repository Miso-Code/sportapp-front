import ContainerLayout from '@/components/ContainerLayout'
import Spinner from '@/components/Spinner'
import TransitionAlert from '@/components/TransitionAlert'
import { useDebounce } from '@/hooks/useDebounce'
import { currencyByCountry } from '@/pages/Partner/PurchasedProduct/containers/Table/utils'
import SearchIcon from '@mui/icons-material/Search'
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	FormControl,
	InputAdornment,
	InputLabel,
	Modal,
	OutlinedInput,
	Typography
} from '@mui/material'
import { Product } from '@sportapp/sportapp-repository/src/businessPartner/interfaces'
import { useAlertStore, useBusinessPartnerStore } from '@sportapp/stores'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import './_index.scss'
import CardModalSelect from './components/CardModalSelect'

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400
}

export default function OtherServicePage() {
	const { t, i18n } = useTranslation()
	const { getAvailableProducts, setProductToCheckout } =
		useBusinessPartnerStore()
	const navigate = useNavigate()
	const { alert } = useAlertStore()
	const { setAlert } = useAlertStore()

	const [alertShow, setAlertShow] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [hasMore, setHasMore] = useState(true)
	const [page, setPage] = useState<number>(0)
	const [products, setProducts] = useState<Product[]>([])
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
	const [open, setOpen] = useState(false)
	const [quantity, setQuantity] = useState('1')

	const debouncedValue = useDebounce(searchQuery)

	const handleQuantityChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (
			e.target.value !== '' &&
			!isNaN(Number(e.target.value)) &&
			Number(e.target.value) >= 1
		) {
			setQuantity(e.target.value)
		}
	}

	const handleOpen = (product: Product) => {
		setSelectedProduct(product)
		setOpen(true)
	}
	const handleClose = () => setOpen(false)
	const handleSelectProduct = (product: Product) => {
		setProductToCheckout(product)
		handleClose()
		navigate(
			`/other-services/checkout?product_id=${product.product_id}&quantity=${quantity}`
		)
	}

	const filterNewProducts = useCallback(
		(availableProducts: Product[]) => {
			return availableProducts.filter(
				(product) =>
					!products.some((p) => p.product_id === product.product_id)
			)
		},
		[products]
	)

	const handleGetAvailableProducts = useCallback(async () => {
		const availableProducts = await getAvailableProducts({
			limit: 10,
			offset: page * 10,
			search: debouncedValue
		})
		if (!availableProducts || availableProducts.length === 0) {
			setHasMore(false)
			return
		}
		const newProducts = filterNewProducts(availableProducts)
		setProducts([...products, ...newProducts])
		setPage(page + 1)
	}, [
		debouncedValue,
		filterNewProducts,
		getAvailableProducts,
		page,
		products
	])

	const handleCloseAlert = () => {
		setAlertShow(false)
		setAlert(undefined)
	}

	useEffect(() => {
		handleGetAvailableProducts()
	}, [handleGetAvailableProducts])

	useEffect(() => {
		setPage(0)
		setProducts([])
		setHasMore(true)
	}, [debouncedValue])

	useEffect(() => {
		if (alert) {
			setAlertShow(true)
		}
	}, [alert])

	return (
		<>
			<ContainerLayout
				className='other-service-page'
				withSecondarySection={false}>
				<TransitionAlert
					isOpen={alertShow && !!alert?.message}
					message={t(alert?.message ?? '')}
					handleClose={handleCloseAlert}
				/>
				<section className='other-service-page-section'>
					<Typography
						className='other-service-page-title'
						variant='h3'>
						{t('otherService.title')}
					</Typography>
				</section>
				<FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
					<InputLabel htmlFor='outlined-adornment-search'>
						{t('productService.search')}
					</InputLabel>
					<OutlinedInput
						id='outlined-adornment-search'
						type='text'
						onChange={(e) => setSearchQuery(e.target.value)}
						endAdornment={
							<InputAdornment position='end'>
								<SearchIcon />
							</InputAdornment>
						}
						placeholder={t('productService.search')}
						label={t('productService.search')}
					/>
				</FormControl>
				<Box>
					<InfiniteScroll
						dataLength={products.length}
						next={() => {
							handleGetAvailableProducts()
						}}
						hasMore={hasMore}
						loader={
							<Box>
								<Spinner />
							</Box>
						}
						style={{
							display: 'grid',
							gridTemplateColumns:
								'repeat(auto-fill, minmax(24rem, 1fr))',
							gap: '2rem',
							marginTop: '2rem',
							paddingBottom: '2rem',
							overflowY: 'auto',
							height: 'calc(100vh - 20rem)'
						}}>
						{products.map((product) => (
							<Card
								className='other-service-page-card'
								sx={{ height: '22.5rem' }}
								key={product.product_id}>
								<CardActionArea
									data-testid='card-action-area'
									sx={{ height: '100%' }}
									onClick={() => handleOpen(product)}>
									<CardMedia
										component='img'
										height='190'
										image={product.image_url}
										alt={product.name}
									/>
									<CardContent>
										<Typography
											className='other-service-page-card-title'
											gutterBottom
											title={product.name}
											variant='h5'
											component='div'>
											{product.name}
										</Typography>
										<Typography
											variant='body2'
											className='other-service-page-card-description'
											color='text.secondary'>
											{product.summary}
										</Typography>
										<Box
											sx={{
												mt: 2,
												display: 'flex',
												justifyContent: 'space-between'
											}}>
											<Chip
												label={t(
													`productService.${product.category}`
												)}
											/>
											<Chip
												color='secondary'
												label={`${currencyByCountry(
													product.price,
													i18n.language === 'es'
														? 'COP'
														: 'USD'
												)} `}
											/>
										</Box>
									</CardContent>
								</CardActionArea>
							</Card>
						))}
					</InfiniteScroll>
				</Box>
			</ContainerLayout>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Card id='card-modal-other-service' sx={{ ...style }}>
					{selectedProduct && (
						<CardModalSelect
							selectedProduct={selectedProduct}
							quantity={quantity}
							handleQuantityChange={handleQuantityChange}
							handleClose={handleClose}
							handleSuccess={() =>
								handleSelectProduct(selectedProduct)
							}
						/>
					)}
				</Card>
			</Modal>
		</>
	)
}
