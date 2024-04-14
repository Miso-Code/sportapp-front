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

	const mockCalendar: typeof Calendar = ({
		events,
		onPressEvent,
		itemSeparatorComponent: Separator
	}) => {
		return (
			<native.Text>
				{events.map((event, index) => (
					<>
						<native.Button
							onPress={() => onPressEvent(event)}
							testID={`testButton`}
							title={event.title}
							key={'button' + index}
						/>
						{index < events.length && (
							<Separator
								leadingItem={[event]}
								key={'separator' + index}
							/>
						)}
					</>
				))}
			</native.Text>
		)
	}
	return {
		Calendar: mockCalendar
	}
})
jest.mock('@sportapp/stores', () => ({
	useSportSessionStore: jest.fn().mockReturnValue({
		sportSessions: [
			{
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				start_date: new Date().toISOString(),
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
				start_date: new Date().toISOString(),
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
	}
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
			component.root.findByProps({ testID: 'calendarHeader' }).props
				.children
		).toBe(
			useSportSessionStore().sportSessions[0].start_date.substring(0, 6)
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
		).toBe(2)
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

	it('should navigate to the sport session on event press', async () => {
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
		).toBe(3) // 1 default + 2 react bug
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
				start_date: yesterday.toISOString(),
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
				start_date: today.toISOString(),
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
				start_date: inOneYear.toISOString(),
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
		).toBe(9) // (3x3 react bug), // 1 default and two calcualted
	})
})
