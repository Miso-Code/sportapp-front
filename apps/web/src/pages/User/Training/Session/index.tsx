import ContainerLayout from '@/components/ContainerLayout'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import RouteIcon from '@mui/icons-material/Route'
import SpeedIcon from '@mui/icons-material/Speed'
import TimerIcon from '@mui/icons-material/Timer'
import { Box, IconButton, Typography } from '@mui/material'
import { useBusinessPartnerStore, useSportSessionStore } from '@sportapp/stores'
import { format } from 'date-fns'
import { enUS, es } from 'date-fns/locale'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import './_index.scss'
import CardProduct from './components/CardProduct'
import GaugeChart from './components/Charts/Gauge'
import LineChart from './components/Charts/Lines'

export default function TrainingSession() {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const { sportSession, getSportSession } = useSportSessionStore()
	const { suggestProduct, setProductToCheckout } = useBusinessPartnerStore()
	const [suggestedProduct, setSuggestedProduct] =
		useState<Awaited<ReturnType<typeof suggestProduct>>>()
	const { id } = useParams()

	const [loadingProduct, setLoadingProduct] = useState(true)

	const handleGetSportSession = useCallback(async () => {
		if (id) {
			const result = await getSportSession(id)
			if (!result) navigate('/training/calendar')
			return
		}
		navigate('/training/calendar')
	}, [getSportSession, id, navigate])

	const handleSuggestProduct = useCallback(async () => {
		const product = await suggestProduct({
			category: 'nutrition'
		})
		setSuggestedProduct(product)
		setLoadingProduct(false)
	}, [suggestProduct])

	useEffect(() => {
		handleGetSportSession()
	}, [handleGetSportSession])

	useEffect(() => {
		if (sportSession) {
			handleSuggestProduct()
		}
	}, [handleSuggestProduct, sportSession])

	return (
		<ContainerLayout
			withSecondarySection={false}
			className='training-session'>
			<section className='training-session-section'>
				<Typography className='training-session-title' variant='h3'>
					<IconButton
						aria-label='back'
						size='large'
						color='primary'
						onClick={() => navigate(-1)}>
						<ArrowBackIosIcon />
					</IconButton>
					{t('session.nutritionalSuggestionTitle')}
				</Typography>
				{sportSession?.started_at && (
					<Typography
						className='training-session-subtitle'
						variant='subtitle1'
						color='GrayText'>
						{format(sportSession.started_at, 'dd MMMM yyyy', {
							locale: i18n.language === 'es' ? es : enUS
						})}
					</Typography>
				)}
			</section>
			{!loadingProduct && suggestedProduct && (
				<CardProduct
					title={suggestedProduct?.name}
					description={suggestedProduct?.summary}
					image={suggestedProduct?.image_url}
					onClick={() => {
						setProductToCheckout(suggestedProduct)
						navigate(
							`/other-services/checkout?product_id=${suggestedProduct.product_id}&quantity=1`
						)
					}}
				/>
			)}
			<Box
				component='section'
				sx={{
					height: 'calc(100% - 20.5rem)',
					overflowY: 'auto',
					'@media (min-width: 600px)': {
						height: 'calc(100% - 8rem)'
					},
					'@media (min-width: 768px)': {
						height: 'calc(100% - 17rem)'
					},
					mt: 2
				}}>
				<Box>
					<Typography variant='body1'>
						{t('session.nutritionalSuggestion')}
					</Typography>
				</Box>
				{sportSession && (
					<Box sx={{ mt: 2 }}>
						<Typography
							className='training-session-subtitle'
							variant='h4'>
							{t('session.metrics')}
						</Typography>
						<Typography
							component='div'
							sx={{
								display: 'grid',
								gridTemplateColumns:
									'repeat(auto-fill, minmax(12.5rem, 1fr))',
								gap: '1rem',
								mt: 1
							}}>
							{sportSession.calories && (
								<GaugeChart
									maxValue={10}
									value={sportSession.calories}>
									<LocalFireDepartmentIcon
										sx={{
											fontSize: '3rem',
											mx: 'auto'
										}}
										color='disabled'
									/>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h5'>
										{sportSession.calories} kcal
									</Typography>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h6'>
										{t('session.calories')}
									</Typography>
								</GaugeChart>
							)}
							{sportSession.duration && (
								<GaugeChart
									maxValue={60}
									color='#a042cb'
									value={sportSession.duration}>
									<TimerIcon
										sx={{
											fontSize: '3rem',
											mx: 'auto'
										}}
										color='disabled'
									/>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h5'>
										{sportSession.duration}s
									</Typography>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h6'>
										{t('session.duration')}
									</Typography>
								</GaugeChart>
							)}
							{sportSession.steps && (
								<GaugeChart
									maxValue={115}
									color='#dfd935'
									value={sportSession.steps}>
									<DirectionsRunIcon
										sx={{
											fontSize: '3rem',
											mx: 'auto'
										}}
										color='disabled'
									/>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h5'>
										{sportSession.steps}
									</Typography>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h6'>
										{t('session.steps')}
									</Typography>
								</GaugeChart>
							)}
							{sportSession.distance && (
								<GaugeChart
									color='#42cbc6'
									maxValue={133}
									value={sportSession.distance}>
									<RouteIcon
										sx={{
											fontSize: '3rem',
											mx: 'auto'
										}}
										color='disabled'
									/>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h5'>
										{sportSession.distance}km
									</Typography>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h6'>
										{t('session.distance')}
									</Typography>
								</GaugeChart>
							)}
							{sportSession.average_speed && (
								<GaugeChart
									color='#42cb49'
									maxValue={3}
									value={sportSession.average_speed}>
									<SpeedIcon
										sx={{
											fontSize: '3rem',
											mx: 'auto'
										}}
										color='disabled'
									/>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h5'>
										{sportSession.average_speed}m/s
									</Typography>
									<Typography
										sx={{ textAlign: 'center' }}
										variant='h6'>
										{t('session.speed')}
									</Typography>
								</GaugeChart>
							)}
							<LineChart
								data={[
									sportSession.min_heartrate ?? 0,
									sportSession.avg_heartrate ?? 0,
									sportSession.max_heartrate ?? 0
								]}
								label={t('session.heartRate')}
								sx={{
									gridColumn: 'span 1',
									'@media (min-width: 600px)': {
										gridColumn: 'span 2'
									}
								}}
							/>
						</Typography>
					</Box>
				)}
			</Box>
		</ContainerLayout>
	)
}
