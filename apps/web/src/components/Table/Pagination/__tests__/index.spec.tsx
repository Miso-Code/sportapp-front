import TablePaginationActions from '..'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { TablePaginationActionsProps } from '../interfaces'

describe('TablePaginationActions', () => {
	let wrapper: RenderResult
	let props: TablePaginationActionsProps

	beforeEach(() => {
		props = {
			count: 10,
			page: 1,
			rowsPerPage: 5,
			onPageChange: jest.fn()
		}
		wrapper = render(<TablePaginationActions {...props} />)
	})

	it('should render correctly', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call onPageChange with 0 when handleFirstPageButtonClick is called', () => {
		wrapper.getByLabelText('first page').click()
		expect(props.onPageChange).toHaveBeenCalledWith(expect.anything(), 0)
	})

	it('should call onPageChange with page - 1 when handleBackButtonClick is called', () => {
		wrapper.getByLabelText('previous page').click()
		expect(props.onPageChange).toHaveBeenCalledWith(
			expect.anything(),
			props.page - 1
		)
	})

	it('should call onPageChange with page + 1 when handleNextButtonClick is called', () => {
		const button = wrapper.container.querySelector(
			'button[aria-label="next page"]'
		)
		act(() => {
			fireEvent.click(button as Element)
		})

		waitFor(() => {
			expect(props.onPageChange).toHaveBeenCalledWith(
				expect.anything(),
				props.page + 1
			)
		})
	})

	it('should call onPageChange with Math.max(0, Math.ceil(count / rowsPerPage) - 1) when handleLastPageButtonClick is called', () => {
		const button = wrapper.container.querySelector(
			'button[aria-label="last page"]'
		)
		act(() => {
			fireEvent.click(button as Element)
		})

		waitFor(() => {
			expect(props.onPageChange).toHaveBeenCalledWith(
				expect.anything(),
				Math.max(0, Math.ceil(props.count / props.rowsPerPage) - 1)
			)
		})
	})

	it('should call onPageChange with 0 when handleFirstPageButtonClick is called', () => {
		wrapper.getByLabelText('first page').click()
		expect(props.onPageChange).toHaveBeenCalledWith(expect.anything(), 0)
	})

	it('should call onPageChange with page - 1 when handleBackButtonClick is called', () => {
		wrapper.getByLabelText('previous page').click()
		expect(props.onPageChange).toHaveBeenCalledWith(
			expect.anything(),
			props.page - 1
		)
	})

	it('calls onPageChange with the next page when handleNextButtonClick is called', () => {
		const onPageChange = jest.fn()
		const propsAux = {
			...props,
			onPageChange
		}
		wrapper.rerender(<TablePaginationActions {...propsAux} />)
		const nextButton = document.querySelector(
			'button[aria-label="next page"]'
		)
		act(() => fireEvent.click(nextButton!))

		waitFor(() =>
			expect(onPageChange).toHaveBeenCalledWith(
				expect.anything(),
				propsAux.page + 1
			)
		)
	})
})
