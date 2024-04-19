import React from 'react'
import { create, act, ReactTestRenderer } from 'react-test-renderer'
import { TextInput } from 'react-native'

import { useDebounce } from '../useDebounce'

describe('useDebounce', () => {
	let component: ReactTestRenderer

	const TestComponent = () => {
		const [val, setVal] = React.useState('')
		const debouncedValue = useDebounce(val)
		return <TextInput onChangeText={setVal}>{debouncedValue}</TextInput>
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
		component.unmount()
	})

	it('should debounce the value', async () => {
		const input = component.root.findByType(TextInput)
		act(() => {
			input.props.onChangeText('test')
		})
		expect(input.props.children).toBe('')
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 500))
		})
		expect(input.props.children).toBe('test')
	})
})
