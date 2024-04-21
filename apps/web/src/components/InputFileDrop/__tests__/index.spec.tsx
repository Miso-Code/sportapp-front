import FileUpload from '@/components/InputFileDrop'
import { render, RenderResult } from '@testing-library/react'

describe('InputFileDrop', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<FileUpload onChange={jest.fn()} />)
	})

	it('should render the component', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render the component with a label', () => {
		const label = 'label'
		wrapper.rerender(<FileUpload onChange={jest.fn()} label={label} />)
		expect(wrapper.getByText(label)).toBeInTheDocument()
	})

	it('should render the component with a placeholder', () => {
		const placeholder = 'placeholder'
		wrapper.rerender(
			<FileUpload onChange={jest.fn()} placeHolder={placeholder} />
		)
		expect(wrapper.getByText(placeholder)).toBeInTheDocument()
	})

	it('should render the component with a value', () => {
		const value = new File(['(⌐□_□)'], 'chucknorris.png', {
			type: 'image/png'
		})
		wrapper.rerender(<FileUpload onChange={jest.fn()} value={value} />)
		expect(wrapper.getByText(value.name)).toBeInTheDocument()
	})
})
