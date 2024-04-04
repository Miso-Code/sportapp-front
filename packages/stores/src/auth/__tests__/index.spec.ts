import { act, renderHook } from '@testing-library/react'
import { useAuthStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

describe('AuthStore', () => {
	const OLD_ENV = process.env
	beforeEach(() => {
		jest.resetModules()
		process.env = { ...OLD_ENV }
	})

	afterEach(() => {
		process.env = OLD_ENV
	})

	it('should login and logout', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { login, logout } = result.current
		expect(result.current.isAuth).toBe(false)
		await act(async () => {
			await login('a', 'b')
		})
		expect(result.current.isAuth).toBe(true)
		await act(async () => {
			await logout()
		})
		expect(result.current.isAuth).toBe(false)
	})

	it('should set error', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { setError } = result.current
		expect(result.current.error).toBe(undefined)
		await act(async () => {
			await setError('error')
		})
		expect(result.current.error).toBe('error')
	})

	it('should set loading', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { setLoading } = result.current
		expect(result.current.loading).toBe(false)
		await act(async () => {
			await setLoading(true)
		})
		expect(result.current.loading).toBe(true)
	})

	it('should not login with wrong credentials', async () => {
		const { result } = renderHook(() => useAuthStore())
		const { login } = result.current
		expect(result.current.isAuth).toBe(false)
		await act(async () => {
			await login('c', 'd')
		})
		expect(result.current.isAuth).toBe(false)
	})
})
