import ContainerLayout from '@/components/ContainerLayout'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import MonitorIcon from '@mui/icons-material/Monitor'
import {
	Box,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography
} from '@mui/material'
import { useSportsmanStore, useUserStore } from '@sportapp/stores'
import { AddToCalendarButton } from 'add-to-calendar-button-react'
import { format } from 'date-fns'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './_index.scss'
import { createData } from './utils'

export default function ListSchedulePreferencePage() {
	const { t, i18n } = useTranslation()
	const navigate = useNavigate()
	const { getAllSportsmanAppointments, getAllTrainers } = useSportsmanStore()
	const { sportsmanAppointments, trainers } = useSportsmanStore()
	const { user } = useUserStore()
	const [available, setAvailable] = useState(false)

	const rows = useMemo(() => {
		if (sportsmanAppointments) {
			return sportsmanAppointments.map((appointment) => {
				return createData(
					appointment.appointment_id,
					appointment.appointment_date,
					appointment.appointment_type,
					appointment.trainer_id,
					appointment.appointment_location
				)
			})
		}
		return []
	}, [sportsmanAppointments])

	const rowsHeader = [
		t('preference.table.header.dateAndTime'),
		t('preference.table.header.type'),
		t('preference.table.header.location'),
		t('preference.table.header.trainingName'),
		t('preference.table.header.add')
	]

	const handleGetAllSportsmanAppointments = useCallback(async () => {
		if (available) {
			await getAllSportsmanAppointments()
			await getAllTrainers()
		}
	}, [available, getAllSportsmanAppointments, getAllTrainers])

	const getTrainerFullName = useCallback(
		(trainerId: string) => {
			if (!trainers) {
				return ''
			}
			const trainer = trainers.find(
				(trainer) => trainer.trainer_id === trainerId
			)
			if (trainer) {
				return `${trainer.first_name} ${trainer.last_name}`
			}
			return ''
		},
		[trainers]
	)

	const getTitle = (type: string) => {
		return t(
			`preference.${
				type === 'virtual'
					? 'virtualAppointment'
					: 'inPersonAppointment'
			}.title`
		)
	}

	const getFormattedDate = (dateAndTime: string) => {
		return format(new Date(dateAndTime), 'yyyy-MM-dd')
	}

	const getFormattedTime = (dateAndTime: string) => {
		return format(new Date(dateAndTime), 'HH:mm')
	}

	const getEndDate = (dateAndTime: string) => {
		return format(new Date(dateAndTime).setMinutes(60), 'yyyy-MM-dd')
	}

	const getEndTime = (dateAndTime: string) => {
		return format(new Date(dateAndTime).setMinutes(60), 'HH:mm')
	}

	useEffect(() => {
		handleGetAllSportsmanAppointments()
	}, [handleGetAllSportsmanAppointments])

	useEffect(() => {
		if (user?.profileData?.subscription_type !== 'premium') {
			navigate('/home')
		}
		setAvailable(true)
	}, [user, navigate])

	return (
		<ContainerLayout
			withSecondarySection={false}
			className='preference-list-form'>
			{available && (
				<section className='preference-list-section pt-4'>
					<Typography className='preference-list-title' variant='h3'>
						<IconButton
							aria-label='back'
							size='large'
							onClick={() => navigate('/premium')}>
							<ArrowBackIosIcon />
						</IconButton>
						{t('preference.title')}
					</Typography>
					<TableContainer
						sx={{
							marginTop: '2rem'
						}}
						component={Paper}>
						<Table sx={{ minWidth: 650 }} aria-label='simple table'>
							<TableHead>
								<TableRow>
									{rowsHeader.map((header) => (
										<TableCell key={header}>
											{header}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.map((row) => (
									<TableRow
										key={row.id}
										sx={{
											'&:last-child td, &:last-child th':
												{ border: 0 }
										}}>
										<TableCell component='th' scope='row'>
											{format(
												new Date(row.dateAndTime),
												'yyyy-MM-dd HH:mm'
											)}
										</TableCell>
										<TableCell>
											{row.type === 'virtual' ? (
												<Box
													sx={{
														display: 'flex',
														gap: '0.5rem',
														flexDirection: 'row',
														alignItems: 'center'
													}}>
													<MonitorIcon />{' '}
													{t('preference.virtual')}
												</Box>
											) : (
												<Box
													sx={{
														display: 'flex',
														gap: '0.5rem',
														flexDirection: 'row',
														alignItems: 'center'
													}}>
													<LocationOnIcon />
													{t('preference.inPerson')}
												</Box>
											)}
										</TableCell>
										<TableCell>
											{row.location
												? row.location
												: t('preference.noLocation')}
										</TableCell>
										<TableCell>
											{getTrainerFullName(
												row.trainingName
											)}
										</TableCell>
										<TableCell>
											<AddToCalendarButton
												name={getTitle(row.type)}
												options={['Apple', 'Google']}
												location={
													row.location
														? row.location
														: 'googleMeet'
												}
												startDate={getFormattedDate(
													row.dateAndTime
												)}
												endDate={getEndDate(
													row.dateAndTime
												)}
												startTime={getFormattedTime(
													row.dateAndTime
												)}
												endTime={getEndTime(
													row.dateAndTime
												)}
												timeZone='America/Bogota'
												language={
													i18n.language as 'en' | 'es'
												}
												forceOverlay={true}
											/>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</section>
			)}
		</ContainerLayout>
	)
}
