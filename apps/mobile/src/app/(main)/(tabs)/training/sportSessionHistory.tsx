import dayjs from 'dayjs'
import 'dayjs/locale/en' // import English locale
import 'dayjs/locale/es' // import French locale

import React, { ComponentProps, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { View, StyleSheet, LayoutChangeEvent } from 'react-native'
import { Calendar, ICalendarEventBase } from 'react-native-big-calendar'
import { Switch, SegmentedButtons, Text, useTheme } from 'react-native-paper'

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
		start: dayjs(session.start_date).toDate(),
		end: dayjs(session.start_date)
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

	const sportSessionEvents = sportSessions.map((session) =>
		sportSessionToCalendarEvent(session, t('navbar.training'))
	)

	const sorted = sportSessionEvents.sort(
		(a, b) => a.start.getTime() - b.start.getTime()
	)

	let formattedDate = dayjs(date).locale(i18n.language).format('MMMM YYYY')

	if (leadingItem && leadingItem.length) {
		let lastKey = null
		const nextDateMap = sorted.reduce((acc, curr) => {
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
		<Text style={styles.calendarHeader} variant='titleLarge'>
			{formattedDate}
		</Text>
	)
}

const SportSessionHistory: React.FC = () => {
	const theme = useTheme()
	const { t, i18n } = useTranslation()

	const { sportSessions, setSportSession } = useSportSessionStore()

	const [isCalendarActive, setIsCalendarActive] = useState(true)
	const [calendarHeight, setCalendarHeight] = useState(0)
	const [calendarMode, setCalendarMode] =
		useState<ComponentProps<typeof Calendar>['mode']>('month')
	const [calendarHeader, setCalendarHeader] = useState<Date>(new Date())

	const sportSessionEvents = sportSessions.map((session) =>
		sportSessionToCalendarEvent(session, t('navbar.training'))
	)

	const updateCalendarHeight = (event: LayoutChangeEvent) => {
		setCalendarHeight(event.nativeEvent.layout.height)
	}

	const navigateToSession = (event: SportSessionHistoryEvent) => {
		const session = sportSessions.find(
			(session) => session.session_id === event.id
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
		else if (calendarMode == 'schedule')
			setCalendarHeader(sportSessionEvents[0].start)
	}, [calendarMode, isCalendarActive, sportSessionEvents])

	return (
		<View style={styles.container}>
			<View style={styles.actions}>
				<View style={styles.horizontalContainer}>
					<Switch
						value={isCalendarActive}
						onValueChange={setIsCalendarActive}
					/>
					<Text>{t('training.calendar')}</Text>
				</View>
				{isCalendarActive && (
					<>
						<SegmentedButtons
							value={calendarMode}
							onValueChange={(mode: typeof calendarMode) =>
								setCalendarMode(mode)
							}
							buttons={[
								{ value: 'month', label: t('training.month') },
								{ value: 'week', label: t('training.week') },
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
			{isCalendarActive && (
				<View
					style={styles.calendarContainer}
					onLayout={updateCalendarHeight}>
					<CustomCalendar
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
			{!isCalendarActive && (
				<View style={styles.eventsContainer}>
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
