import { SportEvent } from '@sportapp/sportapp-repository/src/sportEvent/interfaces'
import {
	sportEventToCalendarEvent,
	sportSessionToCalendarEvent,
	trainingPlanSessionToCalendarEvents
} from '..'
import { FullSportSessionResponse } from '@sportapp/sportapp-repository/src/user/interfaces'
import { TrainingPlanSession } from '@sportapp/sportapp-repository/src/trainingPlan/interfaces'
import { EventTypes } from '../../containers/CustomCalendar/interfaces'

describe('CalendarPageUtils', () => {
	let spy: jest.SpyInstance

	beforeEach(() => {
		const mockedDate = new Date(2024, 6, 19)

		spy = jest.spyOn(global, 'Date').mockImplementation(() => mockedDate)
	})

	afterEach(() => {
		spy.mockRestore()
	})

	describe('sportEventToCalendarEvent', () => {
		it('should return a calendar event from a sport event', () => {
			const sportEvent: SportEvent = {
				event_id: '1',
				sport_id: '1',
				location_latitude: 0,
				location_longitude: 0,
				start_date: '2024-01-01T00:00:00Z',
				end_date: '2024-01-01T01:00:00Z',
				title: 'Event',
				capacity: 0,
				description: ''
			}

			const result = sportEventToCalendarEvent(sportEvent, 'Event')

			const expected = {
				id: '1',
				title: 'Event',
				start: new Date('2024-01-01T00:00:00Z'),
				end: new Date('2024-01-01T01:00:00Z'),
				description: '',
				type: EventTypes.EVENT
			}

			expect(result).toEqual(expected)
		})

		it('should return a calendar event from a sport event with default title', () => {
			const sportEvent: SportEvent = {
				event_id: '1',
				sport_id: '1',
				location_latitude: 0,
				location_longitude: 0,
				start_date: '2024-01-01T00:00:00Z',
				end_date: '2024-01-01T01:00:00Z',
				title: '',
				capacity: 0,
				description: ''
			}

			const result = sportEventToCalendarEvent(sportEvent)

			const expected = {
				id: '1',
				title: undefined,
				start: new Date('2024-01-01T00:00:00Z'),
				end: new Date('2024-01-01T01:00:00Z'),
				description: '',
				type: EventTypes.EVENT
			}

			expect(result).toEqual(expected)
		})
	})

	describe('sportSessionToCalendarEvent', () => {
		it('should return a calendar event from a sport session', () => {
			const sportSession: FullSportSessionResponse = {
				session_id: '1',
				user_id: '1',
				sport_id: '1',
				started_at: '2024-01-01T00:00:00Z',
				duration: 60
			}

			const result = sportSessionToCalendarEvent(sportSession, 'Session')

			const expected = {
				id: '1',
				title: 'Session',
				start: new Date('2024-01-01T00:00:00Z'),
				end: new Date('2024-01-01T01:00:00Z'),
				type: EventTypes.SESSION
			}

			expect(result).toEqual(expected)
		})

		it('should return a calendar event from a sport session with default title', () => {
			const sportSession: FullSportSessionResponse = {
				session_id: '1',
				user_id: '1',
				sport_id: '1',
				started_at: '2024-01-01T00:00:00Z',
				duration: 60
			}

			const result = sportSessionToCalendarEvent(sportSession)

			const expected = {
				id: '1',
				title: undefined,
				start: new Date('2024-01-01T00:00:00Z'),
				end: new Date('2024-01-01T01:00:00Z'),
				type: EventTypes.SESSION
			}

			expect(result).toEqual(expected)
		})
	})

	describe('trainingPlanSessionToCalendarEvents', () => {
		it('should return a calendar event from a training plan session', () => {
			const trainingPlanSession: TrainingPlanSession = {
				training_plan_session_id: '1',
				weekday: 'monday',
				start_time: '00:00',
				warm_up: 10,
				cardio: 10,
				strength: 10,
				cool_down: 10,
				user_id: '1'
			}

			const result = trainingPlanSessionToCalendarEvents(
				trainingPlanSession,
				'Session',
				EventTypes.TRAINING,
				1
			)

			const expected = [
				{
					id: '1',
					title: 'Session',
					start: new Date('2024-07-22T00:00:00Z'),
					end: new Date('2024-07-22T01:40:00Z'),
					type: EventTypes.TRAINING,
					warm_up: 10,
					cardio: 10,
					strength: 10,
					cool_down: 10
				}
			]

			expect(result).toEqual(expected)
		})

		it('should return an array with structure', () => {
			const trainingPlanSession: TrainingPlanSession = {
				training_plan_session_id: '1',
				weekday: 'monday',
				start_time: '00:00',
				warm_up: 10,
				cardio: 10,
				strength: 10,
				cool_down: 10,
				user_id: '1'
			}

			const result = trainingPlanSessionToCalendarEvents(
				trainingPlanSession,
				'Session'
			)

			const expected = expect.arrayContaining([
				expect.objectContaining({
					id: '1',
					title: 'Session',
					start: new Date('2024-07-22T00:00:00Z'),
					end: new Date('2024-07-22T01:40:00Z'),
					type: EventTypes.TRAINING,
					warm_up: 10,
					cardio: 10,
					strength: 10,
					cool_down: 10
				})
			])

			expect(result).toEqual(expected)
		})
	})
})
