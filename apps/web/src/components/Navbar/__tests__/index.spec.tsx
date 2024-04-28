import { useUserStore } from '@sportapp/stores'
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

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn().mockReturnValue({
		user: {
			profileData: {
				subscription_type: 'premium'
			}
		}
	})
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

	it('should render with user is not premium', () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: 'free'
				}
			}
		})
		wrapper.rerender(<Navbar className='test-class' />)
		expect(wrapper.container).toMatchSnapshot()
	})
})
