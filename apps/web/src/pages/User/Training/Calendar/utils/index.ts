import { TrainingPlanSession } from '@sportapp/sportapp-repository/src/trainingPlan/interfaces'
import {
	CustomEvent,
	EventTypes
} from '../containers/CustomCalendar/interfaces'
import { FullSportSessionResponse } from '@sportapp/sportapp-repository/src/user/interfaces'
import { SportEvent } from '@sportapp/sportapp-repository/src/sportEvent/interfaces'

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

	const dateTime = time.slice(0, -3).split(':').map(Number)
	let hour = dateTime[0]
	const minute = dateTime[1]
	const isPM = time.toLowerCase().includes('pm')

	// Convert to 24-hour format
	if (hour < 12 && isPM) {
		hour += 12
	} else if (hour === 12 && !isPM) {
		hour = 0
	}

	const date = new Date()
	date.setHours(hour)
	date.setMinutes(minute)
	date.setSeconds(0)
	date.setMilliseconds(0)
	// If today is not the desired day of the week, move to the next desired day of the week
	if (date.getDay() !== dayIndex) {
		date.setDate(date.getDate() + ((dayIndex + 7 - date.getDay()) % 7))
	}
	// If the desired time has already passed today, move to the next desired day of the week
	if (date < new Date()) {
		date.setDate(date.getDate() + 7)
	}

	const dates = []
	for (let i = 0; i < count; i++) {
		dates.push(new Date(date))
		date.setDate(date.getDate() + 7)
	}

	return dates
}

export const trainingPlanSessionToCalendarEvents = (
	session: TrainingPlanSession,
	title?: string,
	type: `${EventTypes}` = EventTypes.TRAINING,
	counts = 30
): CustomEvent[] => {
	const dates = generateFutureDates(
		session.weekday,
		session.start_time,
		counts
	)

	const totalDuration =
		session.warm_up + session.cardio + session.strength + session.cool_down

	const events: CustomEvent[] = dates
		? dates.map((date) => {
				const endDate = new Date(date.getTime())
				endDate.setMinutes(endDate.getMinutes() + totalDuration * 60)

				return {
					id: session.training_plan_session_id,
					title: title,
					start: date,
					end: endDate,
					type: type,
					warm_up: session.warm_up,
					cardio: session.cardio,
					strength: session.strength,
					cool_down: session.cool_down
				}
			})
		: []

	return events
}

export const sportSessionToCalendarEvent = (
	session: FullSportSessionResponse,
	title?: string,
	type: `${EventTypes}` = EventTypes.SESSION
): CustomEvent => {
	const endDate = new Date(session.started_at)
	endDate.setSeconds(
		new Date(session.started_at).getSeconds() + session.duration
	)
	return {
		id: session.session_id,
		title: title,
		start: new Date(session.started_at),
		end: endDate,
		type: type
	}
}

export const sportEventToCalendarEvent = (
	event: SportEvent,
	title?: string,
	type: `${EventTypes}` = EventTypes.EVENT
): CustomEvent => {
	return {
		id: event.event_id,
		title: title,
		start: new Date(event.start_date),
		end: new Date(event.end_date),
		type: type,
		description: event.description
	}
}
