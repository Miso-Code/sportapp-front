import { act, render, RenderResult } from '@testing-library/react'
import TransitionAlert from 'components/TransitionAlert'

describe('TransitionAlert', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(
			<TransitionAlert isOpen handleClose={jest.fn()} message='message' />
		)
	})

	it('should render', () => {
		expect(wrapper).toBeDefined()
	})

	it('should match the snapshot', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should match the snapshot when isOpen false', () => {
		wrapper.rerender(
			<TransitionAlert handleClose={jest.fn()} message='message' />
		)
		expect(wrapper.container).toBeInTheDocument()
	})

	it('should render the message', () => {
		expect(wrapper.getByText('message')).toBeInTheDocument()
	})

	it('should render the close button', () => {
		expect(wrapper.getByLabelText('close')).toBeInTheDocument()
	})

	it('should call handleClose when close button is clicked', () => {
		const handleClose = jest.fn()
		wrapper.rerender(
			<TransitionAlert
				isOpen
				handleClose={handleClose}
				message='message'
			/>
		)
		const close = wrapper.getByLabelText('close')

		act(() => {
			close.click()
		})

		expect(handleClose).toHaveBeenCalled()
	})
})
