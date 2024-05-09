import { useUserStore } from '@sportapp/stores'
import Navbar from '..'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { useLocation, useNavigate } from 'react-router-dom'

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn().mockReturnValue({
		pathname: '/config'
	}),
	useNavigate: jest.fn().mockReturnValue(jest.fn())
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

	it('should navigate to home', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/home'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		act(() => {
			fireEvent.click(wrapper.getByText('navbar.profile'))
		})

		await waitFor(() => {
			expect(navigate).toHaveBeenCalledWith('/home')
		})
	})

	it('should navigate to other services', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/home'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		act(() => {
			fireEvent.click(wrapper.getByText('navbar.otherServices'))
		})

		await waitFor(() => {
			expect(navigate).toHaveBeenCalledWith('/other-services')
		})
	})

	it('should navigate to config', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/home'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		act(() => {
			fireEvent.click(wrapper.getByText('navbar.settings'))
		})

		await waitFor(() => {
			expect(navigate).toHaveBeenCalledWith('/config')
		})
	})

	it('should navigate to premium', async () => {
		const navigate = jest.fn()
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: 'premium'
				}
			}
		})
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/home'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		act(() => {
			fireEvent.click(wrapper.getByText('navbar.preferential'))
		})

		await waitFor(() => {
			expect(navigate).toHaveBeenCalledWith('/premium')
		})
	})

	it('should be active premium section', () => {
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/premium'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should be active other services section', () => {
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/other-services'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should be not active', () => {
		;(useLocation as jest.Mock).mockReturnValue({
			pathname: '/not-active'
		})
		wrapper.rerender(<Navbar className='test-class' />)
		expect(wrapper.container).toMatchSnapshot()
	})
})
