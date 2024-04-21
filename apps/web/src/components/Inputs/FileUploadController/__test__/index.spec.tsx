import InputFileUploadController from '..'
import { render, renderHook, RenderResult } from '@testing-library/react'
import { useForm } from 'react-hook-form'

describe('InputFileUploadController', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		const { result } = renderHook(() => useForm())
		wrapper = render(
			<InputFileUploadController
				control={result.current.control}
				name='file'
				label='File'
				className='w-full'
				placeHolder='Select a file'
			/>
		)
	})

	it('should render the component', () => {
		expect(wrapper.getByText('File')).toBeInTheDocument()
	})
})
