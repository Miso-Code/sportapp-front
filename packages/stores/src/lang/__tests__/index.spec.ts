import { act, renderHook } from '@testing-library/react'
import { useLangStore } from '../index'

jest.mock('simple-zustand-devtools', () => ({
	mountStoreDevtool: jest.fn()
}))

describe('Lang Store', () => {
	it('should change lang', () => {
		const { result } = renderHook(() => useLangStore())
		act(() => {
			result.current.changeLang('en')
		})
		expect(result.current.lang).toBe('en')
	})

	it('should clear lang', () => {
		const { result } = renderHook(() => useLangStore())
		act(() => {
			result.current.changeLang('en')
		})
		act(() => {
			result.current.clearState()
		})
		expect(result.current.lang).toBe('es')
	})
})
