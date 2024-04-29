import { useAuthStore } from '@sportapp/stores'
import { fireEvent, render, RenderResult } from '@testing-library/react'
import MenuConfig from '..'

jest.mock('@sportapp/stores', () => ({
	useAuthStore: jest.fn().mockReturnValue({
		logout: jest.fn()
	})
}))

describe('MenuConfig', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<MenuConfig />)
	})

	it('should render', () => {
		expect(wrapper).toMatchSnapshot()
	})

	it('should render with className', () => {
		wrapper.rerender(<MenuConfig className='test-class' />)
		expect(wrapper).toMatchSnapshot()
	})

	it('should render with selected', () => {
		wrapper.rerender(<MenuConfig selected={1} />)
		expect(wrapper).toMatchSnapshot()
	})

	it('should call setSelected', () => {
		const setSelected = jest.fn()
		wrapper.rerender(<MenuConfig setSelected={setSelected} />)

		const items = wrapper.container.querySelectorAll('.config-menu-item')
		fireEvent.click(items[0])
		expect(setSelected).toHaveBeenCalledWith(0)
	})

	it('should call logout', () => {
		const logout = jest.fn()
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			logout
		})
		wrapper.rerender(<MenuConfig />)
		const items = wrapper.container.querySelectorAll('.config-menu-item')
		fireEvent.click(items[1])
		expect(logout).toHaveBeenCalled()
	})
})
