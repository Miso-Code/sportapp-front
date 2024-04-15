import Navbar from '..'
import { render, RenderResult } from '@testing-library/react'

describe('Navbar', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<Navbar />)
	})

	it('should render without errors', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with className', () => {
		wrapper.rerender(<Navbar className='test-class' />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with currentNavigationStep', () => {
		wrapper.rerender(<Navbar currentNavigationStep={0} />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with currentNavigationStep and className', () => {
		wrapper.rerender(
			<Navbar currentNavigationStep={0} className='test-class' />
		)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should change currentNavigationStep to 0 step', () => {
		wrapper.rerender(<Navbar currentNavigationStep={0} />)
		expect(
			wrapper.container.querySelector('.Mui-selected')
		).toHaveAttribute('tabindex', '0')
	})

	it('should change currentNavigationStep to 1 step', () => {
		wrapper.rerender(<Navbar currentNavigationStep={1} />)
		expect(
			wrapper.container.querySelector('.Mui-selected')
		).toHaveAttribute('tabindex', '0')
	})
})
