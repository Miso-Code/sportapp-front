import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'

import { useLocation } from '../useLocation'

import {
	startLocationUpdatesAsync,
	watchPositionAsync,
	stopLocationUpdatesAsync,
	requestForegroundPermissionsAsync
} from 'expo-location'

jest.mock('expo-location', () => ({
	requestForegroundPermissionsAsync: jest
		.fn()
		.mockReturnValue({ status: 'granted' }),
	startLocationUpdatesAsync: jest.fn(),
	watchPositionAsync: jest.fn(),
	stopLocationUpdatesAsync: jest.fn(),
	Accuracy: {
		High: 1
	}
}))

describe('useLocation', () => {
	let component: ReactTestRenderer

	let testLocationUpdates: ReturnType<typeof useLocation>['locationUpdates']
	let testIsLocationAvailable: boolean

	const TestComponent = () => {
		const { locationUpdates, isLocationAvailable } = useLocation()
		testLocationUpdates = locationUpdates
		testIsLocationAvailable = isLocationAvailable
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

	afterAll(() => {
		jest.clearAllMocks()
	})

	it('should return location updates and location availability', () => {
		expect(testLocationUpdates).toEqual([])
		expect(testIsLocationAvailable).toBe(true)
	})

	it('should call startLocationUpdates', () => {
		expect(startLocationUpdatesAsync).toHaveBeenCalled()
	})

	it('should call watchPositionAsync', () => {
		expect(watchPositionAsync).toHaveBeenCalled()
	})

	it('should call stopLocationUpdates on unmount', () => {
		act(() => {
			component.unmount()
		})
		expect(stopLocationUpdatesAsync).toHaveBeenCalled()
	})

	it('should set location is not available if permission is not granted', async () => {
		;(requestForegroundPermissionsAsync as jest.Mock).mockReturnValue({
			status: 'denied'
		})
		act(() => {
			component.unmount()
			component = create(<TestComponent />)
		})

		await act(async () => {
			await Promise.resolve()
		})

		expect(testIsLocationAvailable).toBe(false)
	})

	it('should set location is not available if an error occurs', async () => {
		;(requestForegroundPermissionsAsync as jest.Mock).mockRejectedValue(
			new Error('error')
		)
		act(() => {
			component.update(<TestComponent />)
		})

		await act(async () => {
			await Promise.resolve()
		})

		expect(testIsLocationAvailable).toBe(false)
	})

	it('should add location to locationUpdates when watchPositionAsync is called', async () => {
		const location = { coords: { latitude: 1, longitude: 1 } }
		const watchPositionCallback = (watchPositionAsync as jest.Mock).mock
			.calls[0][1]
		act(() => {
			watchPositionCallback(location)
		})

		expect(testLocationUpdates).toEqual([location])
	})
})
