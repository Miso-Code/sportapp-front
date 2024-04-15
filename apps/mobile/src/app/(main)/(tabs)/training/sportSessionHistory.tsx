import dayjs from 'dayjs'
import 'dayjs/locale/en' // import English locale
import 'dayjs/locale/es' // import French locale

import React, { ComponentProps, useEffect, useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { View, StyleSheet, LayoutChangeEvent } from 'react-native'
import { Calendar, ICalendarEventBase } from 'react-native-big-calendar'
import {
	Switch,
	SegmentedButtons,
	Text,
	useTheme,
	ActivityIndicator
} from 'react-native-paper'

import {
	useSportSessionStore,
	initialSportSessionState
} from '@sportapp/stores'
import { router } from 'expo-router'

interface SportSessionHistoryEvent extends ICalendarEventBase {
	id: string
	type?: 'training' | 'event'
}

const CustomCalendar = Calendar<SportSessionHistoryEvent>

const sportSessionToCalendarEvent = (
	session: (typeof initialSportSessionState)['sportSession'],
	title?: string,
	type: SportSessionHistoryEvent['type'] = 'training'
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

const CalendarHeader: React.FC<{
	date?: Date
	leadingItem?: ICalendarEventBase[]
}> = ({ date, leadingItem }) => {
	const { i18n, t } = useTranslation()
	const { sportSessions } = useSportSessionStore()

	const sportSessionEvents = useMemo(
		() =>
			sportSessions
				.map((session) =>
					sportSessionToCalendarEvent(session, t('navbar.training'))
				)
				.sort((a, b) => a.start.getTime() - b.start.getTime()),
		[sportSessions, t]
	)

	let formattedDate = dayjs(date).locale(i18n.language).format('MMMM YYYY')

	if (leadingItem?.length) {
		let lastKey = null
		const nextDateMap = sportSessionEvents.reduce((acc, curr) => {
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

	const { sportSessions, setSportSession, getSportSessions } =
		useSportSessionStore()

	const [isLoading, setIsLoading] = useState(true)
	const [isCalendarActive, setIsCalendarActive] = useState(true)
	const [calendarHeight, setCalendarHeight] = useState(0)
	const [calendarMode, setCalendarMode] =
		useState<ComponentProps<typeof Calendar>['mode']>('month')
	const [calendarHeader, setCalendarHeader] = useState<Date>(new Date())

	const sportSessionEvents = useMemo(
		() =>
			sportSessions.map((session) =>
				sportSessionToCalendarEvent(session, t('navbar.training'))
			),
		[sportSessions, t]
	)

	const updateCalendarHeight = (event: LayoutChangeEvent) => {
		setCalendarHeight(event.nativeEvent.layout.height)
	}

	const navigateToSession = (event: SportSessionHistoryEvent) => {
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
	}

	useEffect(() => {
		if (!isCalendarActive) setCalendarHeader(new Date())
		else if (calendarMode === 'schedule' && sportSessionEvents.length > 0)
			setCalendarHeader(sportSessionEvents[0].start)
	}, [calendarMode, isCalendarActive, sportSessionEvents])

	useEffect(() => {
		;(async () => {
			await getSportSessions()
			setIsLoading(false)
		})()
	}, [getSportSessions])

	return (
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
								onValueChange={(mode: typeof calendarMode) =>
									setCalendarMode(mode)
								}
								buttons={[
									{
										value: 'month',
										label: t('training.month')
									},
									{
										value: 'week',
										label: t('training.week')
									},
									{ value: 'day', label: t('training.day') },
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
						events={sportSessionEvents}
						height={calendarHeight}
						mode={calendarMode}
						onSwipeEnd={setCalendarHeader}
						locale={i18n.language}
						itemSeparatorComponent={CalendarHeader}
						eventCellStyle={(event) => ({
							backgroundColor:
								event.type === 'training'
									? theme.colors.primary
									: theme.colors.tertiary
						})}
						onPressEvent={navigateToSession}
					/>
				</View>
			)}
			{!isLoading && !isCalendarActive && (
				<View style={styles.eventsContainer} testID='upcoming'>
					<Text variant='headlineSmall'>
						{t('training.nextTrainings')}
					</Text>
					<Text variant='bodyLarge'>
						{t('training.nextTrainingsEmpty')}
					</Text>
					<Text variant='headlineSmall'>
						{t('training.nextEvents')}
					</Text>
					<Text variant='bodyLarge'>
						{t('training.nextEventsEmpty')}
					</Text>
				</View>
			)}
		</View>
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
		paddingHorizontal: 20,
		gap: 10
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
	}
})

export default SportSessionHistory
