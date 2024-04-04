import RegisterContainer from 'containers/Register'
import { render, RenderResult } from '@testing-library/react'

describe('RegisterContainer', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<RegisterContainer
				onHandleFirstSubmit={jest.fn()}
				onHandleSecondSubmit={jest.fn()}
				step={0}
			/>
		)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render the first step', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render the second step', () => {
		wrapper.rerender(
			<RegisterContainer
				onHandleFirstSubmit={jest.fn()}
				onHandleSecondSubmit={jest.fn()}
				step={1}
			/>
		)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should not render register step', () => {
		wrapper.rerender(
			<RegisterContainer
				onHandleFirstSubmit={jest.fn()}
				onHandleSecondSubmit={jest.fn()}
				step={2}
			/>
		)
		expect(wrapper.container).toMatchSnapshot()
	})
})
