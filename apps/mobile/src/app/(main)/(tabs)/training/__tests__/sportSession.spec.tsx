import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'
import { useSportSessionStore, useSportStore } from '@sportapp/stores'
import { useLocation } from '@/hooks/useLocation'

import SportSession from '../sportSession'

jest.mock('expo-router')
jest.mock('@sportapp/stores', () => {
	return {
		useAuthStore: jest.fn().mockReturnValue({
			user: {
				id: '1'
			}
		}),
		useSportSessionStore: jest.fn().mockReturnValue({
			startSportSession: jest.fn().mockReturnValue({
				session_id: '1'
			}),
			finishSportSession: jest.fn(),
			addSessionLocation: jest.fn()
		}),
		useSportStore: jest.fn().mockReturnValue({
			getSports: jest.fn(),
			sports: [
				{
					sport_id: '1',
					name: 'Running'
				}
			]
		})
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
		default: ({ currentTime }) => {
			return (
				<native.View>
					<native.Text testID='timer'>{currentTime}</native.Text>
				</native.View>
			)
		}
	}
})

describe('SportSession', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.useFakeTimers()
		component = renderer.create(<SportSession />)
	})

	afterEach(() => {
		jest.useRealTimers()
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call getSports on mount', () => {
		expect(useSportStore().getSports).toHaveBeenCalled()
	})

	it('should stop when the timer is maxed out', async () => {
		const startButton = component.root.findByProps({
			testID: 'startButton'
		})
		await act(async () => {
			startButton.props.onPress()
			await jest.advanceTimersByTimeAsync(60000)
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

		it('should natigate to the sport session summary when the timer is stopped', () => {
			const stopButton = component.root.findByProps({
				testID: 'stopButton'
			})
			act(() => {
				stopButton.props.onPress()
			})

			expect(router.push).toHaveBeenCalledWith(
				'training/sportSessionSummary'
			)
		})
	})
})
