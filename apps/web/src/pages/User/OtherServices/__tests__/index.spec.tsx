import { useBusinessPartnerStore } from '@sportapp/stores'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { ReactNode } from 'react'
import OtherServicePage from '..'
import { Product } from '@sportapp/sportapp-repository/src/businessPartner/interfaces'

jest.mock('@sportapp/stores', () => ({
	useBusinessPartnerStore: jest.fn(() => ({
		getAvailableProducts: jest.fn().mockReturnValue([]),
		setProductToCheckout: jest.fn()
	})),
	useUserStore: jest.fn().mockReturnValue({
		user: {
			profileData: {
				subscription_type: 'premium'
			}
		}
	}),
	useAlertStore: jest.fn().mockReturnValue({ alert: {}, setAlert: jest.fn() })
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useLocation: jest.fn().mockReturnValue({
		pathname: '/premium'
	})
}))

jest.mock('react-infinite-scroll-component', () => ({
	__esModule: true,
	default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

jest.mock('@mui/material', () => ({
	...jest.requireActual('@mui/material'),
	Modal: ({ children, open }: { children: ReactNode; open: boolean }) =>
		open ? <div id='modal'>{children}</div> : null
}))

jest.mock('../components/CardModalSelect', () => ({
	__esModule: true,
	default: jest.fn(
		({
			selectedProduct,
			quantity,
			handleQuantityChange,
			handleClose,
			handleSuccess
		}: {
			selectedProduct: Product
			quantity: string
			handleQuantityChange: () => void
			handleClose: () => void
			handleSuccess: () => void
		}) => (
			<div>
				<button
					data-testid='handleQuantityChange'
					onClick={handleQuantityChange}>
					handleQuantityChange
				</button>
				<button data-testid='handleClose' onClick={handleClose}>
					handleClose
				</button>
				<button data-testid='handleSuccess' onClick={handleSuccess}>
					handleSuccess
				</button>
				<div>{selectedProduct.name}</div>
				<div>{quantity}</div>
			</div>
		)
	)
}))

describe('OtherServicePage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<OtherServicePage />)
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render the component, with products', async () => {
		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValueOnce({
			getAvailableProducts: jest.fn().mockReturnValue([
				{
					product_id: '6dcba8dc-c9ae-40c7-b42a-21029c7819d8',
					business_partner_id: 'f9368e86-dacd-4904-989a-ba5f23cd25ae',
					category: 'equipment',
					name: 'Awesome Rubber Computer',
					summary:
						'Adflicto sonitus fuga aperio calculus calamitas vicissitudo.',
					url: 'https://apprehensive-poem.net/',
					price: 408.0,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url: 'https://picsum.photos/seed/wPfJxYXCA/640/480',
					description:
						'Adipiscor demoror velit ventito reiciendis audacia pax abbas aliquam.',
					active: true
				}
			])
		})

		act(() => {
			wrapper.rerender(<OtherServicePage />)
		})

		await waitFor(() => {
			expect(
				wrapper.getByText('Awesome Rubber Computer')
			).toBeInTheDocument()
			expect(wrapper.container).toMatchSnapshot()
		})
	})

	it('should open modal with product selected', async () => {
		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValueOnce({
			getAvailableProducts: jest.fn().mockReturnValue([
				{
					product_id: '6dcba8dc-c9ae-40c7-b42a-21029c7819d8',
					business_partner_id: 'f9368e86-dacd-4904-989a-ba5f23cd25ae',
					category: 'equipment',
					name: 'Awesome Rubber Computer',
					summary:
						'Adflicto sonitus fuga aperio calculus calamitas vicissitudo.',
					url: 'https://apprehensive-poem.net/',
					price: 408.0,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url: 'https://picsum.photos/seed/wPfJxYXCA/640/480',
					description:
						'Adipiscor demoror velit ventito reiciendis audacia pax abbas aliquam.',
					active: true
				}
			])
		})

		act(() => {
			wrapper.rerender(<OtherServicePage />)
		})

		await waitFor(() => {
			expect(
				wrapper.getByText('Awesome Rubber Computer')
			).toBeInTheDocument()
		})

		act(() => {
			fireEvent.click(wrapper.getByText('Awesome Rubber Computer'))
		})

		await waitFor(() => {
			expect(
				wrapper.container.querySelector('#modal')
			).toBeInTheDocument()
		})

		act(() => {
			fireEvent.click(wrapper.getByTestId('handleClose'))
			fireEvent.click(wrapper.getByTestId('handleSuccess'))
		})

		await waitFor(() => {
			expect(
				wrapper.container.querySelector('#modal')
			).not.toBeInTheDocument()
		})
	})

	it('should change search query', async () => {
		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValue({
			getAvailableProducts: jest.fn().mockReturnValue([
				{
					product_id: '6dcba8dc-c9ae-40c7-b42a-21029c7819d8',
					business_partner_id: 'f9368e86-dacd-4904-989a-ba5f23cd25ae',
					category: 'equipment',
					name: 'Awesome Rubber Computer',
					summary:
						'Adflicto sonitus fuga aperio calculus calamitas vicissitudo.',
					url: 'https://apprehensive-poem.net/',
					price: 408.0,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url: 'https://picsum.photos/seed/wPfJxYXCA/640/480',
					description:
						'Adipiscor demoror velit ventito reiciendis audacia pax abbas aliquam.',
					active: true
				},
				{
					product_id: '6dcba8dc-c9ae-40c7-b42a-21029c7819d8',
					business_partner_id: 'f9368e86-dacd-4904-989a-ba5f23cd25ae',
					category: 'equipment',
					name: 'Awesome Rubber Computer',
					summary:
						'Adflicto sonitus fuga aperio calculus calamitas vicissitudo.',
					url: 'https://apprehensive-poem.net/',
					price: 408.0,
					payment_type: 'unique',
					payment_frequency: 'other',
					image_url: 'https://picsum.photos/seed/wPfJxYXCA/640/480',
					description:
						'Adipiscor demoror velit ventito reiciendis audacia pax abbas aliquam.',
					active: true
				}
			])
		})

		act(() => {
			wrapper.rerender(<OtherServicePage />)
		})
		act(() => {
			fireEvent.change(
				wrapper.getByPlaceholderText('productService.search'),
				{
					target: { value: 'Awesome Rubber Computer' }
				}
			)
		})

		await waitFor(() => {
			expect(
				wrapper.container.querySelectorAll('.other-service-page-card')
			).toHaveLength(2)
		})
	})
})
