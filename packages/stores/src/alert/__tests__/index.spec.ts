import { act, renderHook } from '@testing-library/react'
import { useAlertStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

describe('AlertStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(async () => {
		process.env = OLD_ENV
		jest.clearAllMocks()
	})

	it('should set alert', async () => {
		const { result } = renderHook(() => useAlertStore())
		const { setAlert } = result.current
		expect(result.current.alert).toBe(undefined)
		await act(async () => {
			await setAlert({
				type: 'success',
				message: 'success'
			})
		})
		expect(result.current.alert).toStrictEqual({
			type: 'success',
			message: 'success'
		})
	})

	it('should unset the alert on timeout', async () => {
		jest.useFakeTimers()
		const { result } = renderHook(() => useAlertStore())
		const { setAlert } = result.current
		expect(result.current.alert).toBe(undefined)
		await act(async () => {
			await setAlert({
				type: 'success',
				message: 'success'
			})
			await jest.advanceTimersToNextTimerAsync(5000)
		})
		expect(result.current.alert).toBe(undefined)
	})

	it('should clear state', async () => {
		const { result } = renderHook(() => useAlertStore())
		const { setAlert, clearState } = result.current
		expect(result.current.alert).toBe(undefined)
		await act(async () => {
			await setAlert({
				type: 'success',
				message: 'success'
			})
		})
		expect(result.current.alert).toStrictEqual({
			type: 'success',
			message: 'success'
		})
		await act(async () => {
			await clearState()
		})
		expect(result.current.alert).toBe(undefined)
	})
})
