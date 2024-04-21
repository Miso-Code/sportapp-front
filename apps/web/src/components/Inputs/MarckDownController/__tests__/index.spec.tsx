import MarckDownController from '..'
import { render, renderHook, RenderResult } from '@testing-library/react'
import { useForm } from 'react-hook-form'

jest.mock('@uiw/react-md-editor', () => ({
	__esModule: true,
	default: () => <div>MarkdownEditor</div>
}))

describe('MarckDownController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<MarckDownController
				control={result.current.control}
				label='Test'
				name='test'
			/>
		)
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
