import {
	RenderResult,
	fireEvent,
	render,
	waitFor,
	act
} from '@testing-library/react'

import { useDebounce } from '../useDebounce'
import { useState } from 'react'

describe('useDebounce', () => {
	let component: RenderResult

	const TestComponent = () => {
		const [val, setVal] = useState('')
		const debouncedValue = useDebounce(val)
		return (
			<input
				type='text'
				value={debouncedValue}
				onChange={(e) => setVal(e.target.value)}
			/>
		)
	}

	beforeEach(async () => {
		act(() => {
			component = render(<TestComponent />)
		})

		// Wait for the async effects to complete
		await act(async () => {
			await Promise.resolve()
		})
	})

	afterEach(() => {
		component.unmount()
	})

	it('should debounce the value', async () => {
		const input = component.getByRole('textbox')
		act(() => {
			fireEvent.change(input, { target: { value: '2' } })
		})
		await waitFor(() => {
			expect(input).toHaveValue('2')
		})
	})
})
