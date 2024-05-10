import { act, renderHook } from '@testing-library/react'
import { useAlertStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

describe('AlertStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(async () => {
		process.env = OLD_ENV
		jest.clearAllMocks()
		jest.useRealTimers()
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
			createAt: new Date(),
			type: 'success',
			message: 'success'
		})
	})

	it('should set alert with undefined', async () => {
		const { result } = renderHook(() => useAlertStore())
		const { setAlert } = result.current
		expect(result.current.alert).toBe(undefined)
		await act(async () => {
			await setAlert(undefined)
		})
		expect(result.current.alert).toBe(undefined)
	})

	it('should add alert to the history', async () => {
		const { result } = renderHook(() => useAlertStore())
		const { setAlert } = result.current
		expect(result.current.alert).toBe(undefined)
		expect(result.current.alertHistory).toStrictEqual([])
		await act(async () => {
			await setAlert({
				type: 'success',
				message: 'success'
			})
		})
		expect(result.current.alertHistory).toStrictEqual([
			{
				createAt: new Date(),
				type: 'success',
				message: 'success'
			}
		])
	})

	it('should unset the alert on timeout but not clear the history', async () => {
		jest.useFakeTimers()
		const { result } = renderHook(() => useAlertStore())
		const { setAlert } = result.current
		expect(result.current.alert).toBe(undefined)
		const history = [
			{
				createAt: new Date(),
				type: 'success',
				message: 'success'
			}
		]
		await act(async () => {
			await setAlert({
				type: 'success',
				message: 'success'
			})
			await jest.advanceTimersToNextTimerAsync(5000)
		})
		expect(result.current.alert).toBe(undefined)
		expect(result.current.alertHistory).toStrictEqual(history)
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
			createAt: new Date(),
			type: 'success',
			message: 'success'
		})
		await act(async () => {
			await clearState()
		})
		expect(result.current.alert).toBe(undefined)
		expect(result.current.alertHistory).toStrictEqual([])
	})

	it('should add hidden alert to history without setting the alert', async () => {
		const { result } = renderHook(() => useAlertStore())
		const { addHiddenAlertToHistory } = result.current
		expect(result.current.alertHistory).toStrictEqual([])
		await act(async () => {
			await addHiddenAlertToHistory({
				type: 'success',
				message: 'success'
			})
		})
		expect(result.current.alert).toBe(undefined)
		expect(result.current.alertHistory).toStrictEqual([
			{
				createAt: new Date(),
				type: 'success',
				message: 'success'
			}
		])
	})
})
