import { fireEvent, render } from '@testing-library/react'
import SelectMultiComponent from '..'

jest.mock('react', () => ({
	...jest.requireActual('react')
}))

describe('SelectMultiComponent', () => {
	it('should render correctly', () => {
		const { container } = render(
			<SelectMultiComponent
				name='test'
				label='test'
				options={[{ value: 'test', label: 'Test' }]}
				onChange={jest.fn()}
				value=''
			/>
		)
		expect(container).toMatchSnapshot()
	})

	it('should render correctly when disabled', () => {
		const { container } = render(
			<SelectMultiComponent
				name='test'
				label='test'
				options={[{ value: 'test', label: 'Test' }]}
				onChange={jest.fn()}
				value=''
				isDisabled={true}
			/>
		)
		expect(container).toMatchSnapshot()
	})

	it('should render correctly when disabled and with value', () => {
		const { container } = render(
			<SelectMultiComponent
				name='test'
				label='test'
				options={[{ value: 'test', label: 'Test' }]}
				onChange={jest.fn()}
				value={['test']}
				isDisabled={true}
			/>
		)
		expect(container).toMatchSnapshot()
	})

	it('should render correctly with value and multiple select', () => {
		const { container } = render(
			<SelectMultiComponent
				name='test'
				label='test'
				options={[{ value: 'test', label: 'Test' }]}
				onChange={jest.fn()}
				value={['test']}
				selectProps={{ multiple: true }}
			/>
		)
		expect(container).toMatchSnapshot()
	})

	it('should render correctly with error', () => {
		const { container } = render(
			<SelectMultiComponent
				name='test'
				label='test'
				options={[{ value: 'test', label: 'Test' }]}
				onChange={jest.fn()}
				value=''
				error={{ type: 'required', message: 'Test error message' }}
			/>
		)
		expect(container).toMatchSnapshot()
	})

	it('should render correctly with translated options', () => {
		const { container } = render(
			<SelectMultiComponent
				name='test'
				label='test'
				options={[{ value: 'test', label: 'Test' }]}
				onChange={jest.fn()}
				value=''
				isTranslated={true}
			/>
		)
		expect(container).toMatchSnapshot()
	})

	it('should handle onDelete event correctly for multiple select', () => {
		const handleChange = jest.fn()
		const { getByTestId } = render(
			<SelectMultiComponent
				name='test'
				label='test'
				options={[{ value: 'test', label: 'Test' }]}
				onChange={handleChange}
				value={['test']}
				selectProps={{ multiple: true }}
			/>
		)
		fireEvent.click(getByTestId('CancelIcon'))
		expect(handleChange).toHaveBeenCalled()
	})
})
