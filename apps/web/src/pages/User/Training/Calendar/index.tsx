import ContainerLayout from '@/components/ContainerLayout'
import Spinner from '@/components/Spinner'
import { useLocation } from '@/hooks/useLocation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { Box, IconButton, List, ListItem, Typography } from '@mui/material'
import {
	useSportEventStore,
	useSportSessionStore,
	useTrainingPlanStore
} from '@sportapp/stores'
import { format } from 'date-fns/format'
import { es } from 'date-fns/locale'
import { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './_index.scss'
import InfoCards from './components/InfoCards'
import CustomCalendar from './containers/CustomCalendar'
import { CustomEvent, EventTypes } from './containers/CustomCalendar/interfaces'
import { DialogEvent } from './containers/DialogEvent'
import {
	sportEventToCalendarEvent,
	sportSessionToCalendarEvent,
	trainingPlanSessionToCalendarEvents
} from './utils'

const CalendarTrainingPage = () => {
	const { t } = useTranslation()
	const { sportSessions, getSportSessions } = useSportSessionStore()
	const { trainingPlanSessions, getTrainingPlan } = useTrainingPlanStore()
	const { getSportEvents, sportEvents } = useSportEventStore()
	const { location, loading: loadingLocation } = useLocation()
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [selectedValue, setSelectedValue] = useState<CustomEvent>()

	const handleGetApiData = useCallback(async () => {
		setLoading(true)
		Promise.all([
			getSportSessions(),
			getTrainingPlan(),
			getSportEvents(location.latitude, location.longitude)
		]).finally(() => setLoading(false))
	}, [
		getSportEvents,
		getSportSessions,
		getTrainingPlan,
		location.latitude,
		location.longitude
	])

	const trainingPlanSessionEvents = useMemo(
		() =>
			trainingPlanSessions
				.flatMap((session) =>
					trainingPlanSessionToCalendarEvents(
						session,
						t('navbar.training')
					)
				)
				.sort((a, b) => {
					if (a.start && b.start) {
						return a.start.getTime() - b.start.getTime()
					} else {
						return 0
					}
				}),
		[trainingPlanSessions, t]
	)

	const sportSessionEvents = useMemo(
		() =>
			sportSessions
				? sportSessions.map((session) =>
						sportSessionToCalendarEvent(
							session,
							t('navbar.training')
						)
					)
				: [],
		[sportSessions, t]
	)

	const sportEventsCalendarEvents = useMemo(
		() =>
			sportEvents.map((event) =>
				sportEventToCalendarEvent(event, event.title)
			),
		[sportEvents]
	)

	const calendarEvents = useMemo(() => {
		return [
			...trainingPlanSessionEvents,
			...sportSessionEvents,
			...sportEventsCalendarEvents
		]
	}, [
		sportEventsCalendarEvents,
		sportSessionEvents,
		trainingPlanSessionEvents
	])

	const handleShowModalEvent = useCallback((event: CustomEvent) => {
		if (event && event.type !== EventTypes.SESSION) {
			setSelectedValue(event)
			setOpenDialog(true)
		} else {
			// TODO: go to session detail
			setOpenDialog(false)
		}
	}, [])

	useEffect(() => {
		if (!loadingLocation) handleGetApiData()
	}, [handleGetApiData, loadingLocation])

	return (
		<ContainerLayout
			withSecondarySection={false}
			className='training-calendar'>
			<section className='training-calendar-section'>
				<Typography className='training-title' variant='h3'>
					<IconButton
						aria-label='back'
						size='large'
						onClick={() => navigate(-1)}>
						<ArrowBackIosIcon />
					</IconButton>
					{t('training.history')}
				</Typography>
			</section>
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
					sx={{
						display: 'grid',
						gridTemplateColumns: 'minmax(10rem, 20rem) 1fr',
						gap: '2rem',
						height: 'calc(100% - 150px)',
						marginTop: '2rem',
						'@media (max-width: 850px)': {
							gridTemplateColumns: '1fr',
							overflowY: 'auto'
						}
					}}>
					<Box
						sx={{
							order: 0,
							'@media (max-width: 850px)': { order: 1 }
						}}>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '.75rem'
							}}>
							{trainingPlanSessionEvents[0] && (
								<>
									<Typography
										className='training-title'
										variant='h5'>
										{t('training.upcomingTraining')}
									</Typography>
									<InfoCards
										titleComponent={t('navbar.training')}
										onClick={() =>
											handleShowModalEvent(
												trainingPlanSessionEvents[0]
											)
										}
										description={
											<>
												<List disablePadding>
													<ListItem
														disablePadding
														sx={{
															display: 'flex',
															justifyContent:
																'space-between'
														}}>
														<Typography
															sx={{
																fontWeight: 700
															}}>
															{t(
																'training.warmUp'
															)}
														</Typography>
														<Typography>
															{(trainingPlanSessionEvents[0]
																.warm_up || 0) *
																60}
														</Typography>
													</ListItem>
													<ListItem
														disablePadding
														sx={{
															display: 'flex',
															justifyContent:
																'space-between'
														}}>
														<Typography
															sx={{
																fontWeight: 700
															}}>
															{t(
																'training.cardio'
															)}
														</Typography>
														<Typography>
															{(trainingPlanSessionEvents[0]
																.cardio || 0) *
																60}
														</Typography>
													</ListItem>
													<ListItem
														disablePadding
														sx={{
															display: 'flex',
															justifyContent:
																'space-between'
														}}>
														<Typography
															sx={{
																fontWeight: 700
															}}>
															{t(
																'training.strength'
															)}
														</Typography>
														<Typography>
															{(trainingPlanSessionEvents[0]
																.strength ||
																0) * 60}
														</Typography>
													</ListItem>
													<ListItem
														disablePadding
														sx={{
															display: 'flex',
															justifyContent:
																'space-between'
														}}>
														<Typography
															sx={{
																fontWeight: 700
															}}>
															{t(
																'training.coolDown'
															)}
														</Typography>
														<Typography>
															{(trainingPlanSessionEvents[0]
																.cool_down ||
																0) * 60}
														</Typography>
													</ListItem>
												</List>
											</>
										}
										date={format(
											trainingPlanSessionEvents[0]
												.start as Date,
											'dd MMMM yyyy hh:mm a',
											{
												locale: es
											}
										)}
										state={{
											type: 'NEXT',
											text: t('training.upcoming')
										}}
									/>
								</>
							)}
						</Box>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: '0.75rem',
								marginTop: '2rem'
							}}>
							<Typography className='training-title' variant='h5'>
								{t('training.nextEvents')}
							</Typography>
							{sportEventsCalendarEvents
								.filter(
									(event) =>
										(event.start || new Date()).getTime() >
										Date.now()
								)
								.slice(0, 2)
								.map((nextSportSession) => (
									<InfoCards
										key={nextSportSession.id}
										onClick={() =>
											handleShowModalEvent(
												nextSportSession
											)
										}
										titleComponent={nextSportSession.title}
										description={
											nextSportSession.description
										}
										date={format(
											nextSportSession.start as Date,
											'dd MMMM yyyy hh:mm a',
											{
												locale: es
											}
										)}
										state={{
											type: 'NEXT',
											text: t('training.previous')
										}}
									/>
								))}
						</Box>
					</Box>
					<Typography component='section'>
						<CustomCalendar
							events={calendarEvents}
							onSelectEvent={handleShowModalEvent}
						/>
					</Typography>
					{selectedValue && (
						<DialogEvent
							open={openDialog}
							onClose={() => setOpenDialog(false)}
							selectedValue={selectedValue}
						/>
					)}
				</Box>
			)}
		</ContainerLayout>
	)
}

const CalendarTrainingPageMemo = memo(CalendarTrainingPage)

export default CalendarTrainingPageMemo
