import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import NavbarTop from '../index'

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn())
}))

describe('NavbarTop', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<NavbarTop />)
	})

	afterEach(() => {
		jest.clearAllMocks()
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call useNavigate when clicking on the buttons', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		wrapper.rerender(<NavbarTop />)
		const homeButton = wrapper.getByRole('button', {
			name: 'navbar.partner.getProducts'
		})
		act(() => {
			fireEvent.click(homeButton as Element)
		})
		await waitFor(() =>
			expect(navigate).toHaveBeenCalledWith('/partner/home')
		)
		const createProductButton = wrapper.getByRole('button', {
			name: 'navbar.partner.createProduct'
		})

		act(() => {
			fireEvent.click(createProductButton as Element)
		})

		await waitFor(() =>
			expect(navigate).toHaveBeenCalledWith('/partner/product/create')
		)

		const purchasedProductsButton = wrapper.getByRole('button', {
			name: 'navbar.partner.purchasedProducts'
		})

		act(() => {
			fireEvent.click(purchasedProductsButton as Element)
		})

		await waitFor(() =>
			expect(navigate).toHaveBeenCalledWith('/partner/product/purchased')
		)
	})

	it('should open the nav menu', async () => {
		const navButton = wrapper.container.querySelector(
			'[aria-label="navbar.partner.menu"]'
		)

		act(() => {
			fireEvent.click(navButton as Element)
		})

		await waitFor(() =>
			expect(wrapper.getByRole('menu')).toBeInTheDocument()
		)
	})

	it('should open the user menu', async () => {
		const userButton = wrapper.container.querySelector(
			'[aria-label="navbar.partner.open.profile"]'
		)

		act(() => {
			fireEvent.click(userButton as Element)
		})

		await waitFor(() =>
			expect(wrapper.getByRole('menu')).toBeInTheDocument()
		)
	})

	it('should navigate to the change lang page', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		wrapper.rerender(<NavbarTop />)
		const userButton = wrapper.container.querySelector(
			'[aria-label="navbar.partner.open.profile"]'
		)

		act(() => {
			fireEvent.click(userButton as Element)
		})

		await waitFor(() => {
			const changeLangButton = wrapper.getByText(
				'navbar.partner.changeLang'
			)
			act(() => {
				fireEvent.click(changeLangButton as Element)
			})
		})

		await waitFor(() =>
			expect(navigate).toHaveBeenCalledWith('/partner/lang')
		)
	})
})
