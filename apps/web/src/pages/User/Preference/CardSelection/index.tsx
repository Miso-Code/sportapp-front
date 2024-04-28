import InPersonImage from '@/assets/images/trainer_in_person.jpg'
import VirtualImage from '@/assets/images/trainer_virtual.jpg'
import ContainerLayout from '@/components/ContainerLayout'
import TransitionAlert from '@/components/TransitionAlert'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	IconButton,
	Typography
} from '@mui/material'
import { useUserStore } from '@sportapp/stores'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export default function PreferenceCardSelectionPage() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUserStore()
	const [currentQueryParameters, setSearchParams] = useSearchParams()
	const [alert, setAlert] = useState({
		type: 'success',
		message: '',
		open: false
	})
	const [available, setAvailable] = useState(true)

	const handleCloseAlert = useCallback(() => {
		setAlert((prev) => ({ ...prev, open: false }))
	}, [])

	const handleDeleteSuccessParam = useCallback(() => {
		const newQueryParameters: URLSearchParams = new URLSearchParams()
		newQueryParameters.delete('success')
		setSearchParams(newQueryParameters)
	}, [setSearchParams])

	useEffect(() => {
		if (currentQueryParameters.get('success') === 'true') {
			setAlert({
				type: 'success',
				message: t('preference.success'),
				open: true
			})
		}
		if (currentQueryParameters.get('success') === 'false') {
			setAlert({
				type: 'error',
				message: t('preference.error'),
				open: true
			})
		}
		handleDeleteSuccessParam()
	}, [currentQueryParameters, handleDeleteSuccessParam, location, t])

	useEffect(() => {
		if (user?.profileData?.subscription_type !== 'premium') {
			navigate('/home')
		}
		setAvailable(true)
	}, [user, navigate])

	return (
		<ContainerLayout withSecondarySection={false} className='preference'>
			{available && (
				<section className='preference-section pt-4'>
					<Typography className='preference-title' variant='h3'>
						<IconButton
							aria-label='back'
							size='large'
							onClick={() => navigate('/preferences')}>
							<ArrowBackIosIcon />
						</IconButton>
						{t('preference.title')}
					</Typography>

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							gap: '1.5rem',
							marginTop: '2rem'
						}}>
						<Card
							sx={{
								width: '100%'
							}}>
							<CardActionArea
								onClick={() =>
									navigate('/preferences/form?type=virtual')
								}>
								<CardMedia
									sx={{ height: 240 }}
									title='green iguana'>
									<img
										src={VirtualImage}
										className='h-full w-full object-cover object-center'
										alt='Virtual appointment'
									/>
								</CardMedia>
								<CardContent>
									<Typography
										gutterBottom
										variant='h5'
										component='div'>
										{t(
											'preference.virtualAppointment.title'
										)}
									</Typography>
									<Typography
										variant='body2'
										color='text.secondary'>
										{t(
											'preference.virtualAppointment.description'
										)}
									</Typography>
									<Chip
										sx={{
											marginTop: '1rem'
										}}
										label={t('preference.types.sport')}
									/>
								</CardContent>
							</CardActionArea>
						</Card>

						<Card
							sx={{
								width: '100%'
							}}>
							<CardActionArea
								onClick={() =>
									navigate('/preferences/form?type=in-person')
								}>
								<CardMedia
									sx={{
										height: 240
									}}
									title='green iguana'>
									<img
										src={InPersonImage}
										className='h-full w-full object-cover '
										alt='In person appointment'
									/>
								</CardMedia>
								<CardContent>
									<Typography
										gutterBottom
										variant='h5'
										component='div'>
										{t(
											'preference.inPersonAppointment.title'
										)}
									</Typography>
									<Typography
										variant='body2'
										color='text.secondary'>
										{t(
											'preference.inPersonAppointment.description'
										)}
									</Typography>
									<Chip
										sx={{
											marginTop: '1rem'
										}}
										label={t('preference.types.sport')}
									/>
								</CardContent>
							</CardActionArea>
						</Card>
					</Box>
				</section>
			)}
			<TransitionAlert
				isOpen={alert.open}
				handleClose={handleCloseAlert}
				className='absolute top-4 left-4 w-full max-w-xs'
				message={alert.message}
				containerClassName='mt-4'
				severity={alert.type as 'success' | 'error'}
			/>
		</ContainerLayout>
	)
}
