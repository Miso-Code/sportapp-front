import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'

import { usePedometer } from '../usePedometer'

import { Pedometer } from 'expo-sensors'

jest.mock('expo-sensors', () => ({
	Pedometer: {
		isAvailableAsync: jest.fn().mockResolvedValue(true),
		watchStepCount: jest.fn(),
		getStepCountAsync: jest.fn().mockResolvedValue({ steps: 10 })
	}
}))

describe('usePedometer', () => {
	let component: ReactTestRenderer

	let testIsPedemeterAvailable: string
	let testPastStepCount: number
	let testCurrentStepCount: number

	const TestComponent = () => {
		const { isPedometerAvailable, pastStepCount, currentStepCount } =
			usePedometer()
		testIsPedemeterAvailable = isPedometerAvailable
		testPastStepCount = pastStepCount
		testCurrentStepCount = currentStepCount
		return null
	}

	beforeEach(async () => {
		act(() => {
			component = create(<TestComponent />)
		})

		// Wait for the async effects to complete
		await act(async () => {
			await Promise.resolve()
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should return isPedometerAvailable, pastStepCount and currentStepCount', () => {
		expect(testIsPedemeterAvailable).toBe('available')
		expect(testPastStepCount).toBe(10)
		expect(testCurrentStepCount).toBe(0)
	})

	it('should return when is not available', async () => {
		;(Pedometer.isAvailableAsync as jest.Mock).mockResolvedValueOnce(false)
		// Wait for the async effects to complete
		await act(async () => {
			component.unmount()
			component = create(<TestComponent />)
			await Promise.resolve()
		})

		expect(testIsPedemeterAvailable).toBe('unavailable')
	})

	it('should call isAvailableAsync', () => {
		expect(Pedometer.isAvailableAsync).toHaveBeenCalled()
	})

	it('should call watchStepCount', () => {
		expect(Pedometer.watchStepCount).toHaveBeenCalled()
	})

	it('should call getStepCountAsync', () => {
		expect(Pedometer.getStepCountAsync).toHaveBeenCalled()
	})

	it('should call watchStepCount with null on unmouont', () => {
		act(() => {
			component.unmount()
		})
		expect(Pedometer.watchStepCount).toHaveBeenCalledWith(null)
	})

	it('should update currentStepCount when watchStepCount is called', async () => {
		const watchStepCountCallback = (Pedometer.watchStepCount as jest.Mock)
			.mock.calls[0][0]
		await act(() => {
			watchStepCountCallback({ steps: 20 })
		})

		expect(testCurrentStepCount).toBe(20)
	})

	it('should not call functions when is not available', async () => {
		act(() => component.unmount())
		jest.resetAllMocks()
		;(Pedometer.isAvailableAsync as jest.Mock).mockResolvedValueOnce(false)

		// Wait for the async effects to complete
		await act(async () => {
			component = create(<TestComponent />)
			await Promise.resolve()
		})

		expect(Pedometer.watchStepCount).not.toHaveBeenCalled()
		expect(Pedometer.getStepCountAsync).not.toHaveBeenCalled()
	})
})
