import { renderHook, waitFor } from '@testing-library/react'

import { useLocation } from '../useLocation'

describe('useLocation', () => {
	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should return the location', async () => {
		const { result } = renderHook(() => useLocation())
		await waitFor(() => result.current.loading === false)
		expect(result.current.location).toEqual({ latitude: 10, longitude: 10 })
	})

	it('should return an error when geolocation is denied for user', async () => {
		const mockGeolocation = {
			getCurrentPosition: jest.fn().mockImplementation((_, error) =>
				Promise.resolve(
					error({
						code: 1,
						message: 'User denied the request for Geolocation'
					})
				)
			)
		}
		// @ts-ignore
		global.navigator.geolocation = mockGeolocation

		const { result } = renderHook(() => useLocation())
		await waitFor(() => result.current.loading === false)
		expect(result.current.error).toEqual(
			'User denied the request for Geolocation'
		)
	})

	it('should return an error when location information is unavailable', async () => {
		const mockGeolocation = {
			getCurrentPosition: jest.fn().mockImplementation((_, error) =>
				Promise.resolve(
					error({
						code: 2,
						message: 'Location information is unavailable'
					})
				)
			)
		}
		// @ts-ignore
		global.navigator.geolocation = mockGeolocation

		const { result } = renderHook(() => useLocation())
		await waitFor(() => result.current.loading === false)
		expect(result.current.error).toEqual(
			'Location information is unavailable'
		)
	})

	it('should return an error when the request to get user location times out', async () => {
		const mockGeolocation = {
			getCurrentPosition: jest.fn().mockImplementation((_, error) =>
				Promise.resolve(
					error({
						code: 3,
						message: 'The request to get user location timed out'
					})
				)
			)
		}
		// @ts-ignore
		global.navigator.geolocation = mockGeolocation

		const { result } = renderHook(() => useLocation())
		await waitFor(() => result.current.loading === false)
		expect(result.current.error).toEqual(
			'The request to get user location timed out'
		)
	})

	it('should return an error when an unknown error occurs', async () => {
		const mockGeolocation = {
			getCurrentPosition: jest.fn().mockImplementation((_, error) =>
				Promise.resolve(
					error({
						code: 99,
						message: 'An unknown error occurred'
					})
				)
			)
		}
		// @ts-ignore
		global.navigator.geolocation = mockGeolocation

		const { result } = renderHook(() => useLocation())
		await waitFor(() => result.current.loading === false)
		expect(result.current.error).toEqual('An unknown error occurred')
	})
})
