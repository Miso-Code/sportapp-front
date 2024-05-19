import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'
import {
	useAlertStore,
	useAuthStore,
	useNutritionalPlanStore,
	useSportSessionStore,
	useSportStore,
	useTrainingPlanStore,
	useUserStore
} from '@sportapp/stores'
import { useLocation } from '@/hooks/useLocation'

import SportSession from '../sportSession'
import { usePedometer } from '@/hooks/usePedometer'

jest.mock('expo-router')
jest.mock('@sportapp/stores', () => {
	return {
		useAuthStore: jest.fn(),
		useUserStore: jest.fn(),
		useSportSessionStore: jest.fn(),
		useSportStore: jest.fn(),
		useAlertStore: jest.fn(),
		useTrainingPlanStore: jest.fn(),
		useNutritionalPlanStore: jest.fn()
	}
})
jest.mock('@/hooks/usePedometer', () => {
	return {
		usePedometer: jest.fn().mockReturnValue({
			isPedometerAvailable: true,
			currentStepCount: 0
		})
	}
})
jest.mock('@/hooks/useLocation', () => {
	return {
		useLocation: jest.fn().mockReturnValue({
			locationUpdates: [
				{
					coords: {
						latitude: 0,
						longitude: 0,
						altitude: 0,
						accuracy: 0,
						altitudeAccuracy: 0,
						heading: 0,
						speed: 0
					}
				}
			],
			isLocationAvailable: true
		})
	}
})

jest.mock('@/components/TimerRing', () => {
	const native = jest.requireActual('react-native')
	return {
		__esModule: true,
		default: ({ currentTime, ...props }) => {
			return (
				<native.View>
					<native.Text testID='timer' {...props}>
						{currentTime}
					</native.Text>
				</native.View>
			)
		}
	}
})

describe('SportSession', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.useFakeTimers()
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			user: {
				id: '1'
			}
		})
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				sportData: {
					favourite_sport_id: '1'
				}
			},
			getSport: jest.fn()
		})
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValue({
			startSportSession: jest.fn().mockReturnValue({
				session_id: '1'
			}),
			finishSportSession: jest.fn(),
			addSessionLocation: jest.fn()
		})
		;(useSportStore as unknown as jest.Mock).mockReturnValue({
			getSports: jest.fn(),
			sports: [
				{
					sport_id: '1',
					name: 'Running'
				}
			]
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			setAlert: jest.fn()
		})
		;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
			trainingPlanSessions: [
				{
					training_plan_session_id: 'training_plan_session_id',
					weekday: 'monday',
					start_time: '00:00 AM',
					warm_up: 1 / 360,
					cardio: 1 / 360,
					strength: 1 / 360,
					cool_down: 1 / 360,
					user_id: 'user_id'
				}
			]
		})
		;(useNutritionalPlanStore as unknown as jest.Mock).mockReturnValue({
			notifyCaloryIntake: jest.fn()
		})
		component = renderer.create(<SportSession />)
	})

	afterEach(() => {
		component.unmount()
		jest.useRealTimers()
		jest.clearAllMocks()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call getSports on mount', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		expect(useSportStore().getSports).toHaveBeenCalled()
	})

	it('should stop when the timer is maxed out', async () => {
		const startButton = component.root.findByProps({
			testID: 'startButton'
		})
		await act(async () => {
			startButton.props.onPress()
			await jest.advanceTimersByTimeAsync((4 / 360) * 3_600_000) // check mock data in useTrainingPlanStore, is in hours so we advance 4/360 of an hour
		})
		expect(startButton).toBeTruthy()

		expect(() =>
			component.root.findByProps({ testID: 'pauseButton' })
		).toThrow()
		expect(() =>
			component.root.findByProps({ testID: 'continueButton' })
		).toThrow()
		expect(() =>
			component.root.findByProps({ testID: 'stopButton' })
		).toThrow()

		expect(
			component.root.findByProps({ testID: 'timer' }).props.children
		).toBe(0)

		expect(useSportSessionStore().finishSportSession).toHaveBeenCalled()

		expect(router.push).toHaveBeenCalledWith('training/sportSessionSummary')
	})

	it('should update the location when there is an update', async () => {
		;(useLocation as jest.Mock).mockReturnValue({
			locationUpdates: [
				{
					coords: {
						latitude: 0,
						longitude: 0,
						altitude: 0,
						accuracy: 0,
						altitudeAccuracy: 0,
						heading: 0,
						speed: 0
					}
				},
				{
					coords: {
						latitude: 1,
						longitude: 1,
						altitude: 1,
						accuracy: 1,
						altitudeAccuracy: 1,
						heading: 1,
						speed: 1
					}
				}
			],
			isLocationAvailable: true
		})
		await act(async () => {
			component.update(<SportSession />)
			component.root
				.findByProps({ testID: 'startButton' })
				.props.onPress()
			await jest.advanceTimersByTimeAsync(1000)
		})
		expect(useSportSessionStore().addSessionLocation).toHaveBeenCalledWith({
			latitude: 1,
			longitude: 1,
			altitude: 1,
			accuracy: 1,
			altitudeAccuracy: 1, // not intended but due to spread operator
			altitude_accuracy: 1,
			heading: 1,
			speed: 1,
			session_id: '1'
		})
	})

	describe('Start Button', () => {
		it('should start the timer', () => {
			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(0)
			act(() => {
				startButton.props.onPress()

				jest.advanceTimersByTime(1000)
			})
			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(1)

			act(() => {
				jest.advanceTimersByTime(5000)
			})
			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(6)
		})

		it('should hide the start button when the timer is running', () => {
			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			expect(startButton).toBeTruthy()

			act(() => {
				startButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'startButton' })
			).toThrow()
		})

		it('should show the pause button when the timer is running', () => {
			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			act(() => {
				startButton.props.onPress()
			})

			const pauseButton = component.root.findByProps({
				testID: 'pauseButton'
			})
			expect(pauseButton).toBeTruthy()
		})

		it('should show the stop button when the timer is running', () => {
			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			act(() => {
				startButton.props.onPress()
			})

			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			expect(stopButton).toBeTruthy()
		})

		it('should not show the continue button when the timer is running', () => {
			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			act(() => {
				startButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'continueButton' })
			).toThrow()
		})

		it('should not show the start button when the timer is running', () => {
			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			act(() => {
				startButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'startButton' })
			).toThrow()
		})

		it('should call startSportSession when the timer is started', () => {
			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			act(() => {
				startButton.props.onPress()
			})

			expect(useSportSessionStore().startSportSession).toHaveBeenCalled()
		})
	})

	describe('Pause Button', () => {
		beforeEach(() => {
			act(() => {
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
			})
		})

		it('should pause the timer', () => {
			const pauseButton = component.root.findByProps({
				testID: 'pauseButton'
			})
			act(() => {
				jest.advanceTimersByTime(1000)
				pauseButton.props.onPress()
			})
			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(1)

			act(() => {
				jest.advanceTimersByTime(5000)
			})

			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(1)
		})

		it('should show the continue button when the timer is paused', () => {
			const pauseButton = component.root.findByProps({
				testID: 'pauseButton'
			})
			act(() => {
				pauseButton.props.onPress()
			})

			const continueButton = component.root.findByProps({
				testID: 'continueButton'
			})
			expect(continueButton).toBeTruthy()
		})

		it('should show the stop button when the timer is paused', () => {
			const pauseButton = component.root.findByProps({
				testID: 'pauseButton'
			})
			act(() => {
				pauseButton.props.onPress()
			})

			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			expect(stopButton).toBeTruthy()
		})

		it('should not show the start button when the timer is paused', () => {
			const pauseButton = component.root.findByProps({
				testID: 'pauseButton'
			})
			act(() => {
				pauseButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'startButton' })
			).toThrow()
		})

		it('should not show the pause button when the timer is paused', () => {
			const pauseButton = component.root.findByProps({
				testID: 'pauseButton'
			})
			act(() => {
				pauseButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'pauseButton' })
			).toThrow()
		})
	})

	describe('Continue Button', () => {
		beforeEach(() => {
			act(() => {
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
			})
			act(() => {
				jest.advanceTimersByTime(1000)
				component.root
					.findByProps({ testID: 'pauseButton' })
					.props.onPress()
			})
		})

		it('should continue the timer', () => {
			const continueButton = component.root.findByProps({
				testID: 'continueButton'
			})
			act(() => {
				jest.advanceTimersByTime(1000)
				continueButton.props.onPress()
			})
			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(1)

			act(() => {
				jest.advanceTimersByTime(5000)
			})

			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(6)
		})

		it('should show the pause button when the timer is continued', () => {
			const continueButton = component.root.findByProps({
				testID: 'continueButton'
			})
			act(() => {
				continueButton.props.onPress()
			})

			const pauseButton = component.root.findByProps({
				testID: 'pauseButton'
			})
			expect(pauseButton).toBeTruthy()
		})

		it('should show the stop button when the timer is continued', () => {
			const continueButton = component.root.findByProps({
				testID: 'continueButton'
			})
			act(() => {
				continueButton.props.onPress()
			})

			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			expect(stopButton).toBeTruthy()
		})

		it('should not show the continue button when the timer is continued', () => {
			const continueButton = component.root.findByProps({
				testID: 'continueButton'
			})
			act(() => {
				continueButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'continueButton' })
			).toThrow()
		})

		it('should not show the start button when the timer is continued', () => {
			const continueButton = component.root.findByProps({
				testID: 'continueButton'
			})
			act(() => {
				continueButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'startButton' })
			).toThrow()
		})
	})

	describe('Stop Button', () => {
		beforeEach(async () => {
			await act(async () => {
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(5000)
			})
		})

		it('should stop the timer and set it to 0', () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			act(() => {
				stopButton.props.onPress()
			})
			expect(
				component.root.findByProps({ testID: 'timer' }).props.children
			).toBe(0)
		})

		it('should show the start button when the timer is stopped', () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			act(() => {
				stopButton.props.onPress()
			})

			const startButton = component.root.findByProps({
				testID: 'startButton'
			})
			expect(startButton).toBeTruthy()
		})

		it('should not show the stop button when the timer is stopped', () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			act(() => {
				stopButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'stopButton' })
			).toThrow()
		})

		it('should not show the pause button when the timer is stopped', () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			act(() => {
				stopButton.props.onPress()
			})

			expect(() =>
				component.root.findByProps({ testID: 'pauseButton' })
			).toThrow()
		})

		it('should call finishSportSession when the timer is stopped', () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			act(() => {
				stopButton.props.onPress()
			})

			expect(useSportSessionStore().finishSportSession).toHaveBeenCalled()
		})

		it('should natigate to the sport session summary when the timer is stopped', async () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			await act(async () => {
				stopButton.props.onPress()
				await Promise.resolve()
			})

			expect(router.push).toHaveBeenCalledWith(
				'training/sportSessionSummary'
			)
		})

		it('should call notifyCaloryIntake when the timer is stopped', async () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			await act(async () => {
				stopButton.props.onPress()
				await Promise.resolve()
			})

			expect(
				useNutritionalPlanStore().notifyCaloryIntake
			).toHaveBeenCalled()
		})
	})

	describe('Motivation Alerts', () => {
		it('should show a motivation alert 3 times during the session', async () => {
			;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
				trainingPlanSessions: [
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 30 / 3_600, // sum is 2 mins so we should get 3 alerts every 40 seconds
						cardio: 30 / 3_600,
						strength: 30 / 3_600,
						cool_down: 30 / 3_600,
						user_id: 'user_id'
					}
				]
			})
			await act(async () => {
				component.update(<SportSession />)
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(120_000)
			})
			expect(useAlertStore().setAlert).toHaveBeenCalledTimes(3)
		})

		it('should show a motivation alert every 30 seconds if the session is shorter than 2 minutes', async () => {
			;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
				trainingPlanSessions: [
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 30 / 3_600, // sum is 1 min so we should get 2 alerts every 30 seconds
						cardio: 30 / 3_600,
						strength: 0,
						cool_down: 0,
						user_id: 'user_id'
					}
				]
			})
			await act(async () => {
				component.update(<SportSession />)
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(60_000)
			})
			expect(useAlertStore().setAlert).toHaveBeenCalledTimes(2)
		})

		it('should show a motivation alert every 2 minutes if the session is longer than 6 minutes', async () => {
			;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
				trainingPlanSessions: [
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 120 / 3_600, // sum is 8 mins so we should get 1 alert every 2 minutes
						cardio: 120 / 3_600,
						strength: 120 / 3_600,
						cool_down: 120 / 3_600,
						user_id: 'user_id'
					}
				]
			})
			await act(async () => {
				component.update(<SportSession />)
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(480_000)
			})
			expect(useAlertStore().setAlert).toHaveBeenCalledTimes(4)
		})
		it('should not show a motivation alert if the session is paused', async () => {
			;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
				trainingPlanSessions: [
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 30 / 3_600, // sum is 2 mins so we should get 3 alerts every 40 seconds
						cardio: 30 / 3_600,
						strength: 30 / 3_600,
						cool_down: 30 / 3_600,
						user_id: 'user_id'
					}
				]
			})

			await act(async () => {
				component.update(<SportSession />)
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(1_000) // 1 second then pause
				component.root
					.findByProps({ testID: 'pauseButton' })
					.props.onPress()
			})
			await jest.advanceTimersByTimeAsync(120_000)
			expect(useAlertStore().setAlert).toHaveBeenCalledTimes(0)
		})

		it('should not show a motivation alert if the session is stopped', async () => {
			;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
				trainingPlanSessions: [
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 30 / 3_600, // sum is 2 mins so we should get 3 alerts every 40 seconds
						cardio: 30 / 3_600,
						strength: 30 / 3_600,
						cool_down: 30 / 3_600,
						user_id: 'user_id'
					}
				]
			})

			await act(async () => {
				component.update(<SportSession />)
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(1_000) // 1 second then stop
				component.root
					.findByProps({ testID: 'stopButton' })
					.props.onPress()
			})
			await jest.advanceTimersByTimeAsync(120_000)
			expect(useAlertStore().setAlert).toHaveBeenCalledTimes(0)
		})

		it('should show a motivation alert if there is a decrease on delta steps', async () => {
			;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
				trainingPlanSessions: [
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 30 / 3_600,
						cardio: 30 / 3_600,
						strength: 30 / 3_600,
						cool_down: 30 / 3_600,
						user_id: 'user_id'
					}
				]
			})
			;(usePedometer as jest.Mock).mockReturnValue({
				isPedometerAvailable: true,
				currentStepCount: 0
			})
			await act(async () => {
				component.update(<SportSession />)
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(10_000)
				usePedometer().currentStepCount = 100 // diff is 100 so it speeds up
				await jest.advanceTimersByTimeAsync(10_000)
				usePedometer().currentStepCount = 105 // diff is 10 so it slows down but not so much
				await jest.advanceTimersByTimeAsync(10_000)
			})
			expect(useAlertStore().setAlert).toHaveBeenCalledTimes(1)
		})

		it('should not show a motivation alert if there is a decrease on delta steps greater then 5', async () => {
			;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
				trainingPlanSessions: [
					{
						training_plan_session_id: 'training_plan_session_id',
						weekday: 'monday',
						start_time: '00:00 AM',
						warm_up: 30 / 3_600,
						cardio: 30 / 3_600,
						strength: 30 / 3_600,
						cool_down: 30 / 3_600,
						user_id: 'user_id'
					}
				]
			})
			;(usePedometer as jest.Mock).mockReturnValue({
				isPedometerAvailable: true,
				currentStepCount: 0
			})
			await act(async () => {
				component.update(<SportSession />)
				component.root
					.findByProps({ testID: 'startButton' })
					.props.onPress()
				await jest.advanceTimersByTimeAsync(10_000)
				usePedometer().currentStepCount = 100 // diff is 100 so it speeds up
				await jest.advanceTimersByTimeAsync(10_000)
				usePedometer().currentStepCount = 110 // diff is 10 so it slows down but not so much
				await jest.advanceTimersByTimeAsync(10_000)
			})
			expect(useAlertStore().setAlert).toHaveBeenCalledTimes(0)
		})
	})

	it('should set max time to 30 mins if there is no training plan', async () => {
		;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
			trainingPlanSessions: []
		})
		await act(async () => {
			component.update(<SportSession />)
		})
		expect(
			component.root.findByProps({ testID: 'timer' }).props.maxTime
		).toBe(1800)
	})

	it('should set max time to the sum of the closest training plan session times', async () => {
		;(useTrainingPlanStore as unknown as jest.Mock).mockReturnValue({
			trainingPlanSessions: [
				{
					training_plan_session_id: 'training_plan_session_id',
					weekday: 'tuesday', // closest to monday (mocked always to be monday)
					start_time: '00:00 AM',
					warm_up: 2 / 360,
					cardio: 2 / 360,
					strength: 2 / 360,
					cool_down: 2 / 360,
					user_id: 'user_id'
				},
				{
					training_plan_session_id: 'training_plan_session_id',
					weekday: 'saturday',
					start_time: '00:00 AM',
					warm_up: 1 / 360,
					cardio: 1 / 360,
					strength: 1 / 360,
					cool_down: 1 / 360,
					user_id: 'user_id'
				}
			]
		})
		await act(async () => {
			component.update(<SportSession />)
		})
		expect(
			component.root.findByProps({ testID: 'timer' }).props.maxTime
		).toBe((8 / 360) * 3_600)
	})
})
