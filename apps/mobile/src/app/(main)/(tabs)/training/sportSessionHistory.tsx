import dayjs from 'dayjs'
import 'dayjs/locale/en' // import English locale
import 'dayjs/locale/es' // import French locale
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter' // load isSameOrAfter plugin
import weekday from 'dayjs/plugin/weekday' // load weekday plugin

dayjs.extend(isSameOrAfter) // use isSameOrAfter plugin
dayjs.extend(weekday) // use weekday plugin

import React, { ComponentProps, useEffect, useState, useMemo } from 'react'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'
import { useTranslation } from 'react-i18next'

import { View, ScrollView, StyleSheet, LayoutChangeEvent } from 'react-native'
import { Calendar, ICalendarEventBase } from 'react-native-big-calendar'
import {
	Switch,
	SegmentedButtons,
	Text,
	useTheme,
	ActivityIndicator,
	Portal,
	Button
} from 'react-native-paper'

import {
	useSportSessionStore,
	initialSportSessionState,
	useTrainingPlanStore,
	initialTrainingPlanState,
	useSportEventStore,
	initialSportEventState
} from '@sportapp/stores'
import { router } from 'expo-router'

import KeyboardAvoidingDialog from '@/components/KeyboardAvoidingDialog'
import TrianingCard from '@/components/TrainingCard'
import EventCard from '@/components/EventCard'
import { useLocation } from '@/hooks/useLocation'

interface SportSessionHistoryEvent extends ICalendarEventBase {
	id: string
	type?: 'session' | 'training' | 'event'
}

const CustomCalendar = Calendar<SportSessionHistoryEvent>

const sportSessionToCalendarEvent = (
	session: (typeof initialSportSessionState)['sportSession'],
	title?: string,
	type: SportSessionHistoryEvent['type'] = 'session'
): SportSessionHistoryEvent => {
	return {
		id: session.session_id,
		title: title,
		start: dayjs(session.started_at).toDate(),
		end: dayjs(session.started_at)
			.add(session.duration, 'seconds')
			.toDate(),
		type: type
	}
}

const generateFutureDates = (
	dayOfWeek: string,
	time: string,
	count: number
) => {
	const daysOfWeek = [
		'sunday',
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday'
	]
	const dayIndex = daysOfWeek.indexOf(dayOfWeek.toLowerCase())

	let [hour, minute] = time.slice(0, -3).split(':').map(Number)
	const isPM = time.toLowerCase().includes('pm')

	// Convert to 24-hour format
	if (hour < 12 && isPM) {
		hour += 12
	} else if (hour === 12 && !isPM) {
		hour = 0
	}

	let date = dayjs().locale('en').startOf('day').hour(hour).minute(minute)

	// If today is not the desired day of the week, move to the next desired day of the week
	if (date.weekday() !== dayIndex) {
		date = date.weekday(dayIndex)
	}

	// If the desired time has already passed today, move to the next desired day of the week
	if (date.isBefore(dayjs(), 'days')) {
		date = date.add(1, 'week')
	}

	const dates = []
	for (let i = 0; i < count; i++) {
		dates.push(date.toDate())
		date = date.add(1, 'week')
	}

	return dates
}

const trainingPlanSessionToCalendarEvents = (
	session: (typeof initialTrainingPlanState)['trainingPlanSessions'][number],
	title?: string,
	type: SportSessionHistoryEvent['type'] = 'training'
): SportSessionHistoryEvent[] => {
	const dates = generateFutureDates(session.weekday, session.start_time, 30)

	const totalDuration =
		session.warm_up + session.cardio + session.strength + session.cool_down

	return dates.map((date) => ({
		id: session.training_plan_session_id,
		title: title,
		start: date,
		end: dayjs(date).add(totalDuration, 'hours').toDate(),
		type: type
	}))
}

const sportEventToCalendarEvent = (
	event: (typeof initialSportEventState)['sportEvents'][number],
	title?: string,
	type: SportSessionHistoryEvent['type'] = 'event'
): SportSessionHistoryEvent => {
	return {
		id: event.event_id,
		title: title,
		start: dayjs(event.start_date).toDate(),
		end: dayjs(event.end_date).toDate(),
		type: type
	}
}

const CalendarHeader: React.FC<{
	date?: Date
	leadingItem?: ICalendarEventBase[]
}> = ({ date, leadingItem }) => {
	const { i18n, t } = useTranslation()
	const { sportSessions } = useSportSessionStore()
	const { trainingPlanSessions } = useTrainingPlanStore()
	const { sportEvents } = useSportEventStore()

	const sportSessionEvents = useMemo(
		() =>
			sportSessions.map((session) =>
				sportSessionToCalendarEvent(session, t('navbar.training'))
			),
		[sportSessions, t]
	)

	const trainingPlanSessionEvents = useMemo(
		() =>
			trainingPlanSessions.flatMap((session) =>
				trainingPlanSessionToCalendarEvents(
					session,
					t('navbar.training')
				)
			),
		[trainingPlanSessions, t]
	)

	const sportEventsCalendarEvents = useMemo(
		() =>
			sportEvents.map((event) =>
				sportEventToCalendarEvent(event, event.title)
			),
		[sportEvents]
	)

	const calendarEvents = useMemo(
		() => [
			...sportSessionEvents,
			...trainingPlanSessionEvents,
			...sportEventsCalendarEvents
		],
		[
			sportSessionEvents,
			trainingPlanSessionEvents,
			sportEventsCalendarEvents
		]
	)

	let formattedDate = dayjs(date).locale(i18n.language).format('MMMM YYYY')

	if (leadingItem?.length) {
		let lastKey = null
		const nextDateMap = calendarEvents.reduce((acc, curr) => {
			const key = curr.start.toISOString()
			const result = { ...acc, [key]: null, [lastKey]: key }
			lastKey = key
			return result
		}, {})

		const nextDate =
			nextDateMap[leadingItem[leadingItem.length - 1].start.toISOString()]
		const shouldRender =
			dayjs(nextDate).format('YYYY-MM') !==
			dayjs(leadingItem[leadingItem.length - 1].start).format('YYYY-MM')

		if (!shouldRender) return null
		formattedDate = dayjs(nextDate)
			.locale(i18n.language)
			.format('MMMM YYYY')
	}

	return (
		<Text
			style={styles.calendarHeader}
			variant='titleLarge'
			testID='calendarHeader'>
			{formattedDate}
		</Text>
	)
}

const SportSessionHistory: React.FC = () => {
	const theme = useTheme()
	const { t, i18n } = useTranslation()

	const { locationUpdates } = useLocation()

	const { sportSessions, setSportSession, getSportSessions } =
		useSportSessionStore()
	const { trainingPlanSessions, getTrainingPlan } = useTrainingPlanStore()
	const { sportEvents, getSportEvents } = useSportEventStore()

	const [isLoading, setIsLoading] = useState(true)
	const [isCalendarActive, setIsCalendarActive] = useState(true)
	const [calendarHeight, setCalendarHeight] = useState(0)
	const [calendarMode, setCalendarMode] =
		useState<ComponentProps<typeof Calendar>['mode']>('month')
	const [calendarHeader, setCalendarHeader] = useState<Date>(new Date())
	const [selectedTrainingPlanSession, setSelectedTrainingPlanSession] =
		useState<
			(typeof trainingPlanSessions)[number] & {
				startDate?: Date
				endDate?: Date
			}
		>(null)
	const [selectedSportEvent, setSelectedSportEvent] =
		useState<(typeof sportEvents)[number]>(null)

	const sportSessionEvents = useMemo(
		() =>
			sportSessions.map((session) =>
				sportSessionToCalendarEvent(session, t('navbar.training'))
			),
		[sportSessions, t]
	)

	const trainingPlanSessionEvents = useMemo(
		() =>
			trainingPlanSessions.flatMap((session) =>
				trainingPlanSessionToCalendarEvents(
					session,
					t('navbar.training')
				)
			),
		[trainingPlanSessions, t]
	)

	const sportEventsCalendarEvents = useMemo(
		() =>
			sportEvents.map((event) =>
				sportEventToCalendarEvent(event, event.title, 'event')
			),
		[sportEvents]
	)

	const calendarEvents = useMemo(
		() => [
			...sportSessionEvents,
			...trainingPlanSessionEvents,
			...sportEventsCalendarEvents
		],
		[
			sportSessionEvents,
			trainingPlanSessionEvents,
			sportEventsCalendarEvents
		]
	)

	const updateCalendarHeight = (event: LayoutChangeEvent) => {
		setCalendarHeight(event.nativeEvent.layout.height)
	}

	const onPressEvent = (event: SportSessionHistoryEvent) => {
		switch (event.type) {
			case 'session': {
				const session = sportSessions.find(
					(sportSession) => sportSession.session_id === event.id
				)
				setSportSession(session)
				router.push({
					pathname: 'training/sportSessionSummary',
					params: {
						title: event.title
					}
				})
				break
			}
			case 'training': {
				const trainingPlanSession = trainingPlanSessions.find(
					(session) => session.training_plan_session_id === event.id
				)
				setSelectedTrainingPlanSession({
					...trainingPlanSession,
					startDate: event.start,
					endDate: event.end
				})
				break
			}
			case 'event': {
				const sportEvent = sportEvents.find(
					(sE) => sE.event_id === event.id
				)
				setSelectedSportEvent(sportEvent)
				break
			}
		}
	}

	useEffect(() => {
		if (!isCalendarActive) setCalendarHeader(new Date())
		else if (calendarMode === 'schedule' && calendarEvents.length > 0)
			setCalendarHeader(calendarEvents[0].start)
	}, [calendarMode, isCalendarActive, calendarEvents])

	useEffect(() => {
		;(async () => {
			setIsLoading(true)
			await getSportSessions()
			await getTrainingPlan()
			if (locationUpdates?.length) {
				const lastLocation = locationUpdates[locationUpdates.length - 1]
				await getSportEvents(
					lastLocation.coords.latitude,
					lastLocation.coords.longitude
				)
			}
			setIsLoading(false)
		})()
	}, [getSportSessions, getTrainingPlan, getSportEvents, locationUpdates])

	return (
		<>
			<Portal>
				<KeyboardAvoidingDialog
					testID='trainingModal'
					visible={!!selectedTrainingPlanSession}
					onDismiss={() => setSelectedTrainingPlanSession(null)}>
					<View style={styles.modalContent}>
						{selectedTrainingPlanSession && (
							<>
								<Text variant='titleLarge'>
									{t('training.upcomingTraining')}
								</Text>
								<Text variant='labelMedium'>
									{dayjs(
										selectedTrainingPlanSession?.startDate
									)
										.locale(i18n.language)
										.format('dddd, DD MMMM YYYY')}
								</Text>
								<Text variant='labelMedium'>
									{dayjs(
										selectedTrainingPlanSession?.startDate
									)
										.locale(i18n.language)
										.format('hh:mm A')}{' '}
									-{' '}
									{dayjs(selectedTrainingPlanSession?.endDate)
										.locale(i18n.language)
										.format('hh:mm A')}
								</Text>
								<View style={styles.trainingInfo}>
									<View style={styles.trainingDetail}>
										<Text variant='titleSmall'>
											{t('training.warmUp')}
										</Text>
										<Text variant='bodyMedium'>
											{(
												selectedTrainingPlanSession?.warm_up *
												60
											).toFixed(0)}{' '}
											{t('training.minutes')}
										</Text>
									</View>
									<View style={styles.trainingDetail}>
										<Text variant='titleSmall'>
											{t('training.cardio')}
										</Text>
										<Text variant='bodyMedium'>
											{(
												selectedTrainingPlanSession?.cardio *
												60
											).toFixed(0)}{' '}
											{t('training.minutes')}
										</Text>
									</View>
									<View style={styles.trainingDetail}>
										<Text variant='titleSmall'>
											{t('training.strength')}
										</Text>
										<Text variant='bodyMedium'>
											{(
												selectedTrainingPlanSession?.strength *
												60
											).toFixed(0)}{' '}
											{t('training.minutes')}
										</Text>
									</View>
									<View style={styles.trainingDetail}>
										<Text variant='titleSmall'>
											{t('training.coolDown')}
										</Text>
										<Text variant='bodyMedium'>
											{(
												selectedTrainingPlanSession?.cool_down *
												60
											).toFixed(0)}{' '}
											{t('training.minutes')}
										</Text>
									</View>
									<View style={styles.trainingDetail}>
										<Text variant='titleMedium'>
											{t('training.totalDuration')}
										</Text>
										<Text variant='bodyLarge'>
											{(
												selectedTrainingPlanSession?.cardio +
												selectedTrainingPlanSession?.cool_down +
												selectedTrainingPlanSession?.strength +
												selectedTrainingPlanSession?.warm_up
											).toFixed(1)}{' '}
											{t('training.hours')}
										</Text>
									</View>
								</View>
								<View style={styles.actionsContainer}>
									<Button
										testID='cancelButton'
										textColor={theme.colors.error}
										onPress={() =>
											setSelectedTrainingPlanSession(null)
										}>
										{t('productService.close')}
									</Button>
								</View>
							</>
						)}
					</View>
				</KeyboardAvoidingDialog>
				<KeyboardAvoidingDialog
					testID='eventModal'
					visible={!!selectedSportEvent}
					onDismiss={() => setSelectedSportEvent(null)}>
					<View style={styles.modalContent}>
						{selectedSportEvent && (
							<>
								<Text variant='titleLarge'>
									{selectedSportEvent.title}
								</Text>
								<Text variant='labelMedium'>
									{dayjs(selectedSportEvent.start_date)
										.locale(i18n.language)
										.format('dddd, DD MMMM YYYY')}
								</Text>
								<Text variant='labelMedium'>
									{dayjs(selectedSportEvent.start_date)
										.locale(i18n.language)
										.format('hh:mm A')}{' '}
									-{' '}
									{dayjs(selectedSportEvent.end_date)
										.locale(i18n.language)
										.format('hh:mm A')}
								</Text>
								<MapView
									provider={PROVIDER_GOOGLE}
									initialRegion={{
										latitude:
											selectedSportEvent.location_latitude,
										longitude:
											selectedSportEvent.location_longitude,
										latitudeDelta: 0.0922,
										longitudeDelta: 0.0421
									}}
									initialCamera={{
										center: {
											latitude:
												selectedSportEvent.location_latitude,
											longitude:
												selectedSportEvent.location_longitude
										},
										zoom: 1,
										pitch: 0,
										heading: 0
									}}
									style={styles.map}
								/>
								<Text variant='bodyLarge'>
									{selectedSportEvent.description}
								</Text>
								<View style={styles.actionsContainer}>
									<Button
										testID='cancelButton'
										textColor={theme.colors.error}
										onPress={() =>
											setSelectedSportEvent(null)
										}>
										{t('productService.close')}
									</Button>
								</View>
							</>
						)}
					</View>
				</KeyboardAvoidingDialog>
			</Portal>
			<View style={styles.container}>
				{isLoading && (
					<ActivityIndicator
						animating
						size={'large'}
						testID='progressBar'
					/>
				)}
				{!isLoading && (
					<View style={styles.actions} testID='actionsContainer'>
						<View style={styles.horizontalContainer}>
							<Switch
								testID='calendarSwitch'
								value={isCalendarActive}
								onValueChange={setIsCalendarActive}
							/>
							<Text>{t('training.calendar')}</Text>
						</View>
						{isCalendarActive && (
							<>
								<SegmentedButtons
									data-testid='calendarMode'
									value={calendarMode}
									onValueChange={(
										mode: typeof calendarMode
									) => setCalendarMode(mode)}
									buttons={[
										{
											value: 'month',
											label: t('training.month')
										},
										{
											value: 'week',
											label: t('training.week')
										},
										{
											value: 'day',
											label: t('training.day')
										},
										{
											value: 'schedule',
											label: t('training.schedule')
										}
									]}
								/>
								<CalendarHeader date={calendarHeader} />
							</>
						)}
					</View>
				)}
				{!isLoading && isCalendarActive && (
					<View
						testID='calendarContainer'
						style={styles.calendarContainer}
						onLayout={updateCalendarHeight}>
						<CustomCalendar
							data-testid='calendar'
							events={calendarEvents}
							height={calendarHeight}
							mode={calendarMode}
							onSwipeEnd={setCalendarHeader}
							locale={i18n.language}
							itemSeparatorComponent={CalendarHeader}
							eventCellStyle={(event) => ({
								backgroundColor:
									event.type === 'training'
										? theme.colors.primary
										: event.type === 'session'
										? theme.colors.secondary
										: theme.colors.tertiary
							})}
							onPressEvent={onPressEvent}
						/>
					</View>
				)}
				{!isLoading && !isCalendarActive && (
					<View style={styles.eventsContainer}>
						<ScrollView
							contentContainerStyle={styles.eventsWrapper}
							testID='upcoming'>
							<Text variant='headlineSmall'>
								{t('training.nextTrainings')}
							</Text>
							{trainingPlanSessionEvents.length ? (
								trainingPlanSessionEvents
									.filter((event) =>
										dayjs(event.start).isSameOrAfter(
											dayjs(),
											'days'
										)
									)
									.sort(
										(a, b) =>
											a.start.getTime() -
											b.start.getTime()
									)
									.slice(0, 5)
									.map((event, i) => (
										<TrianingCard
											key={'card-' + event.id + '-' + i}
											date={event.start}
											trainingSession={trainingPlanSessions.find(
												(session) =>
													session.training_plan_session_id ===
													event.id
											)}
										/>
									))
							) : (
								<Text variant='bodyLarge'>
									{t('training.nextTrainingsEmpty')}
								</Text>
							)}
							<Text variant='headlineSmall'>
								{t('training.nextEvents')}
							</Text>
							{sportEvents.length ? (
								sportEvents
									.filter((event) =>
										dayjs(event.start_date).isSameOrAfter(
											dayjs(),
											'days'
										)
									)
									.sort(
										(a, b) =>
											new Date(a.start_date).getTime() -
											new Date(b.start_date).getTime()
									)
									.slice(0, 5)
									.map((event, i) => (
										<EventCard
											key={
												'card-event-' +
												event.id +
												'-' +
												i
											}
											date={event.start_date}
											title={event.title}
											description={event.description}
										/>
									))
							) : (
								<Text variant='bodyLarge'>
									{t('training.nextEventsEmpty')}
								</Text>
							)}
						</ScrollView>
					</View>
				)}
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		marginTop: 110,
		gap: 10
	},
	calendarContainer: {
		flex: 1,
		width: '100%'
	},
	eventsContainer: {
		flex: 1,
		width: '100%',
		paddingVertical: 20,
		marginBottom: 20
	},
	eventsWrapper: {
		paddingHorizontal: 20,
		gap: 10,
		marginBottom: 20,
		minHeight: 500
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10
	},
	actions: {
		paddingHorizontal: 20,
		alignItems: 'center',
		gap: 10
	},
	calendarHeader: {
		textTransform: 'capitalize',
		textAlign: 'center'
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end'
	},
	trainingInfo: {
		marginVertical: 10
	},
	trainingDetail: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 5
	},
	modalContent: {
		minHeight: 250
	},
	map: {
		height: 200,
		width: '100%',
		marginVertical: 10
	}
})

export default SportSessionHistory
