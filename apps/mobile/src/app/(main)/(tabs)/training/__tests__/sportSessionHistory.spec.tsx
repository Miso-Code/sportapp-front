import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import { useSportSessionStore } from '@sportapp/stores'

import { router } from 'expo-router'

import SportSessionHistory from '../sportSessionHistory'

import { Calendar } from 'react-native-big-calendar'

jest.mock('dayjs')
jest.mock('expo-router')
jest.mock('react-native-safe-area-context')
jest.mock('react-native-big-calendar', () => {
	const native = jest.requireActual('react-native')
	const react = jest.requireActual('react')

	const mockCalendar: typeof Calendar = ({
		events,
		onPressEvent,
		itemSeparatorComponent: Separator
	}) => {
		return (
			<native.View>
				{events.map((event, index) => (
					<react.Fragment key={'mockCalendar' + index}>
						<native.Button
							onPress={() => onPressEvent(event)}
							testID={`testButton`}
							title={event.title}
						/>
						{index < events.length && (
							<Separator leadingItem={[event]} />
						)}
					</react.Fragment>
				))}
			</native.View>
		)
	}
	return {
		Calendar: mockCalendar
	}
})

jest.mock('react-native-paper', () => {
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children)
	}
})

jest.mock('@/components/KeyboardAvoidingDialog', () =>
	jest.fn(({ children }) => children)
)
jest.mock('@/components/TrainingCard', () => {
	const native = jest.requireActual('react-native')
	return jest.fn(({ date, ...props }) => (
		<native.View {...props} testID='trainingCard'>
			{date.toISOString()}
		</native.View>
	))
})

jest.mock('@/hooks/useLocation', () => ({
	useLocation: jest.fn().mockReturnValue({
		locationUpdates: [
			{
				coords: {
					latitude: 1,
					longitude: 1
				}
			}
		]
	})
}))

jest.mock('@sportapp/stores', () => ({
	useSportSessionStore: jest.fn().mockReturnValue({
		sportSessions: [
			{
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				started_at: new Date().toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			},
			{
				session_id: '2',
				sport_id: '1',
				user_id: '1',
				started_at: new Date().toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			}
		],
		setSportSession: jest.fn(),
		getSportSessions: jest.fn()
	}),
	initialSportSessionState: {
		sportSession: null
	},
	useTrainingPlanStore: jest.fn().mockReturnValue({
		trainingPlanSessions: [
			{
				training_plan_session_id: '1',
				weekday: 'monday',
				start_time: '10:00 AM',
				warm_up: 0.35,
				cardio: 0.7,
				strength: 0.525,
				cool_down: 0.175,
				user_id: '1'
			}
		],
		getTrainingPlan: jest.fn()
	}),
	useSportEventStore: jest.fn().mockReturnValue({
		sportEvents: [
			{
				event_id: '1',
				sport_id: '1',
				location_latitude: 1,
				location_longitude: 1,
				start_date: new Date().toISOString(),
				end_date: new Date().toISOString(),
				title: 'title',
				capacity: 10,
				description: 'description'
			},
			{
				event_id: '2',
				sport_id: '1',
				location_latitude: 1,
				location_longitude: 1,
				start_date: new Date().toISOString(),
				end_date: new Date().toISOString(),
				title: 'title',
				capacity: 10,
				description: 'description'
			}
		],
		getSportEvents: jest.fn()
	})
}))

describe('SportSessionHistory', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<SportSessionHistory />)
	})

	afterEach(() => {
		component.unmount()
	})

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should fetch the sport sessions on mount', async () => {
		expect(useSportSessionStore().getSportSessions).toHaveBeenCalled()
	})

	it('should render a progress bar on mount', () => {
		expect(
			component.root.findByProps({ testID: 'progressBar' })
		).toBeDefined()
	})

	it('should update calendar height on parent layout update', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		act(() => {
			component.root
				.findByProps({ testID: 'calendarContainer' })
				.props.onLayout({
					nativeEvent: {
						layout: {
							height: 145
						}
					}
				})
		})
		expect(
			component.root.findByProps({ 'data-testid': 'calendar' }).props
				.height
		).toBe(145)
	})

	it('should render a calendar and actions after load', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		expect(
			component.root.findByProps({ testID: 'actionsContainer' })
		).toBeDefined()
		expect(
			component.root.findByProps({ 'data-testid': 'calendar' })
		).toBeDefined()
	})

	it('should set the calendar header to the first event start date', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		expect(
			component.root.findAllByProps({ testID: 'calendarHeader' })[0].props
				.children
		).toBe(
			useSportSessionStore().sportSessions[0].started_at.substring(0, 10)
		)
	})
	it('should hide the calendar on switch off', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const [switchComponent] = component.root.findAllByProps({
			testID: 'calendarSwitch'
		})
		switchComponent.props.onValueChange(false)
		expect(
			component.root.findAllByProps({ 'data-testid': 'calendar' }).length
		).toBe(0)
	})

	it('should show the upcoming events and trainings on switch off', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const [switchComponent] = component.root.findAllByProps({
			testID: 'calendarSwitch'
		})
		switchComponent.props.onValueChange(false)

		expect(
			component.root.findAllByProps({ testID: 'upcoming' }).length
		).toBe(3) // ScrollView renders 3 children (2x react bug)
	})

	it('should render only upcoming events on switch off', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const [switchComponent] = component.root.findAllByProps({
			testID: 'calendarSwitch'
		})
		switchComponent.props.onValueChange(false)

		const cards = component.root.findAllByProps({ testID: 'trainingCard' })
		expect(cards.length).toBe(10) // not more than 5 entries are rendered (2x react bug)
		expect(
			new Date(cards[0].props.children).getTime()
		).toBeGreaterThanOrEqual(new Date(cards[1].props.children).getTime())
	})

	it('should show the calendar on switch on', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const [switchComponent] = component.root.findAllByProps({
			testID: 'calendarSwitch'
		})
		switchComponent.props.onValueChange(true)
		expect(
			component.root.findAllByProps({ 'data-testid': 'calendar' }).length
		).toBe(1)
	})

	it('should hide the upcoming events and trainings on switch on', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const [switchComponent] = component.root.findAllByProps({
			testID: 'calendarSwitch'
		})
		switchComponent.props.onValueChange(true)
		expect(
			component.root.findAllByProps({ testID: 'upcoming' }).length
		).toBe(0)
	})

	it('should navigate to the sport session on event press if event is session', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const [sportSession] = useSportSessionStore().sportSessions
		const [button] = component.root.findAllByProps({ testID: 'testButton' })
		button.props.onPress()
		expect(useSportSessionStore().setSportSession).toHaveBeenCalledWith(
			sportSession
		)
		expect(router.push).toHaveBeenCalledWith({
			pathname: 'training/sportSessionSummary',
			params: {
				title: 'navbar.training'
			}
		})

		expect(router.push).toHaveBeenCalledTimes(1)
	})

	it('should show the training plan on event press if event is training', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const eventButtons = component.root.findAllByProps({
			testID: 'testButton'
		})
		const button = eventButtons[Math.floor(eventButtons.length / 2)]
		button.props.onPress()
		const trainingModal = component.root.findByProps({
			testID: 'trainingModal'
		})
		expect(trainingModal.props.visible).toBe(true)
	})

	it('should show the event details on event press if event is event', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const eventButtons = component.root
			.findAllByProps({
				testID: 'testButton'
			})
			.filter((button) => button.props.onPress)

		const button = eventButtons[eventButtons.length - 1]
		button.props.onPress()
		const eventModal = component.root.findByProps({
			testID: 'eventModal'
		})
		expect(eventModal.props.visible).toBe(true)
	})

	it('should hide the training plan on close', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const eventButtons = component.root.findAllByProps({
			testID: 'testButton'
		})
		const button = eventButtons[Math.floor(eventButtons.length / 2)]
		button.props.onPress()
		const trainingModal = component.root.findByProps({
			testID: 'trainingModal'
		})
		trainingModal.props.onDismiss()
		expect(trainingModal.props.visible).toBe(false)
	})

	it('should hide the event details on close', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const eventButtons = component.root
			.findAllByProps({
				testID: 'testButton'
			})
			.filter((button) => button.props.onPress)

		const button = eventButtons[eventButtons.length - 1]
		button.props.onPress()
		const eventModal = component.root.findByProps({
			testID: 'eventModal'
		})
		eventModal.props.onDismiss()
		expect(eventModal.props.visible).toBe(false)
	})

	it('should render a single header when calendar mode is not schedule', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const [switchComponent] = component.root.findAllByProps({
			testID: 'calendarSwitch'
		})
		switchComponent.props.onValueChange(true)
		component.root
			.findByProps({
				'data-testid': 'calendarMode'
			})
			.props.onValueChange('month')

		expect(
			component.root.findAllByProps({ testID: 'calendarHeader' }).length
		).toBe(93) // this is buggy
	})

	it('should render unique calendar headers on calendar mode schedule', async () => {
		const today = new Date('2020-01-02T00:00:00.000Z')
		const yesterday = new Date(today)
		yesterday.setDate(today.getDate() - 1)
		const inOneYear = new Date(today)
		inOneYear.setDate(today.getDate() + 365)

		useSportSessionStore().sportSessions = [
			{
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				started_at: yesterday.toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			},
			{
				session_id: '2',
				sport_id: '1',
				user_id: '1',
				started_at: today.toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			},
			{
				session_id: '3',
				sport_id: '1',
				user_id: '1',
				started_at: inOneYear.toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			}
		]

		await act(async () => {
			component.update(<SportSessionHistory />)
			await Promise.resolve()
		})
		const [switchComponent] = component.root.findAllByProps({
			testID: 'calendarSwitch'
		})
		switchComponent.props.onValueChange(true)
		component.root
			.findByProps({
				'data-testid': 'calendarMode'
			})
			.props.onValueChange('schedule')

		expect(
			component.root.findAllByProps({ testID: 'calendarHeader' }).length
		).toBe(102)
	})
})
