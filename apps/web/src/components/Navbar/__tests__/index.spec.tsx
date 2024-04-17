import Navbar from '..'
import { render, RenderResult } from '@testing-library/react'
import { useLocation } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn().mockReturnValue({
		pathname: '/config'
	}),
	useNavigate: () => jest.fn()
}))

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

	it('should render with home step', () => {
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/home'
		})
		wrapper.rerender(<Navbar />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with config step', () => {
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/home'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		expect(wrapper.container).toMatchSnapshot()
	})
})
