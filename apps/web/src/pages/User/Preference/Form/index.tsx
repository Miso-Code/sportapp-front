import ContainerLayout from '@/components/ContainerLayout'
import DateTimeController from '@/components/Inputs/DateTimeController'
import SelectController from '@/components/Inputs/SelectController'
import TextFieldController from '@/components/Inputs/TexFieldController'
import TransitionAlert from '@/components/TransitionAlert'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import LoadingButton from '@mui/lab/LoadingButton'
import {
	Backdrop,
	Box,
	CircularProgress,
	IconButton,
	Paper,
	Typography
} from '@mui/material'
import { SportsmanAppointmentRequest } from '@sportapp/sportapp-repository/src/user/interfaces/api/trainer'
import { useSportsmanStore, useUserStore } from '@sportapp/stores'
import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import './_index.scss'
import {
	FormVirtualAppointmentData,
	virtualAppointmentSchema
} from './utils/schema'

export default function PreferenceFormPage() {
	const { t } = useTranslation()
	const locales = useLocation()
	const navigate = useNavigate()
	const { getAllTrainers, addSportsmanAppointment } = useSportsmanStore()
	const { trainers, loading } = useSportsmanStore()
	const { user } = useUserStore()
	const [available, setAvailable] = useState(false)
	const [inPerson, setInPerson] = useState(false)
	const [alert, setAlert] = useState(false)
	const [showMessage, setShowMessage] = useState(false)

	const {
		handleSubmit,
		setValue,
		control,
		formState: { isValid }
	} = useForm({
		resolver: yupResolver(virtualAppointmentSchema),
		mode: 'onChange'
	})

	const onSubmit = async (data: FormVirtualAppointmentData) => {
		setShowMessage(true)
		const payload: SportsmanAppointmentRequest = {
			appointment_date: format(data.date, 'yyyy-MM-dd HH:mm:ss'),
			appointment_type: data.type ? 'in_person' : 'virtual',
			trainer_id: data.training,
			appointment_reason: data.description
		}
		if (!data.type) {
			payload.appointment_location = data.address
		}
		const response = await addSportsmanAppointment(payload)
		if (response) {
			navigate('/preferences/selection?success=true')
			return
		}
		setAlert(true)
		navigate('/preferences/selection?success=false')
	}

	const handleGetAllTrainers = useCallback(async () => {
		if (available) {
			await getAllTrainers()
		}
	}, [available, getAllTrainers])

	const options = useMemo(() => {
		if (trainers)
			return trainers?.map((trainer) => ({
				value: trainer.trainer_id,
				label: `${trainer.first_name} ${trainer.last_name}`
			}))
		return []
	}, [trainers])

	const optionsDirections = [
		{
			value: 'P. Sherman Calle Wallaby 42, Sidney',
			label: 'P. Sherman Calle Wallaby 42, Sidney'
		},
		{
			value: 'Avenida Siempreviva 742, Springfield',
			label: 'Avenida Siempreviva 742, Springfield'
		},
		{
			value: 'Calle Falsa 123, Springfield',
			label: 'Calle Falsa 123, Springfield'
		},
		{ value: 'Callejón Diagon, Londres', label: 'Callejón Diagon, Londres' }
	]

	useEffect(() => {
		const search = locales.search
		const params = new URLSearchParams(search)
		const type = params.get('type')

		if (!type) {
			navigate('/home')
		}

		setValue('type', type === 'virtual')
		setInPerson(type === 'in-person')

		setAvailable(true)
	}, [locales.search, navigate, setValue])

	useEffect(() => {
		handleGetAllTrainers()
	}, [handleGetAllTrainers])

	useEffect(() => {
		if (user?.profileData?.subscription_type !== 'premium') {
			navigate('/home')
		}
		setAvailable(true)
	}, [user, navigate])

	return (
		<ContainerLayout
			withSecondarySection={false}
			className='preference-form'>
			{available && (
				<section className='preference-form-section relative'>
					<Typography className='preference-form-title' variant='h3'>
						<IconButton
							aria-label='back'
							size='large'
							onClick={() => navigate('/preferences/selection')}>
							<ArrowBackIosIcon />
						</IconButton>
						{t('preference.title2')}
					</Typography>
					<Paper
						sx={{
							marginTop: '2rem',
							maxWidth: '45rem'
						}}>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Box
								sx={{
									padding: '1.5rem',
									display: 'flex',
									flexDirection: 'column',
									gap: '1rem'
								}}>
								<Typography
									className='preference-form-title'
									variant='h4'>
									{t(
										`preference.form.${inPerson ? 'inPersonAppointment' : 'virtualAppointment'}.title`
									)}
								</Typography>
								<DateTimeController
									control={control}
									name='date'
									label={t('form.training.dateAndHour')}
								/>
								<SelectController
									control={control}
									isTranslated={false}
									selectProps={{ fullWidth: true }}
									label={t('form.training.trainer')}
									name='training'
									options={options}
								/>
								{inPerson && (
									<SelectController
										control={control}
										isTranslated={false}
										selectProps={{ fullWidth: true }}
										label={t('form.training.address')}
										name='address'
										options={optionsDirections}
									/>
								)}
								<TextFieldController
									control={control}
									name='description'
									type='text'
									multiline
									rows={4}
									label={t('form.training.description')}
									fullWidth
								/>

								<LoadingButton
									fullWidth
									size='large'
									color='primary'
									disabled={!isValid}
									loading={loading}
									type='submit'
									variant='contained'>
									{t('form.schedule')}
								</LoadingButton>
							</Box>
						</form>
					</Paper>
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
								{showMessage ? t('preference.loading') : ''}
							</Typography>
						</Paper>
					</Backdrop>
					<TransitionAlert
						isOpen={alert}
						handleClose={setAlert}
						className='absolute top-4 left-4 w-full max-w-xs'
						message={t('errors.preference.scheduleError')}
						containerClassName='mt-4'
						severity='error'
					/>
				</section>
			)}
		</ContainerLayout>
	)
}
