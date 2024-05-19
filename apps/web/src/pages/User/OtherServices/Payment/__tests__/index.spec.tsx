import PaymentOtherServicePage from '@/pages/User/OtherServices/Payment'
import { useAlertStore, useBusinessPartnerStore } from '@sportapp/stores'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'

jest.mock('@sportapp/stores', () => ({
	useBusinessPartnerStore: jest.fn().mockReturnValue({
		productToCheckout: {},
		setProductToCheckout: jest.fn(),
		purchaseProduct: jest.fn()
	}),
	useUserStore: jest.fn().mockReturnValue({ user: {} }),
	useAlertStore: jest.fn().mockReturnValue({ alert: {}, setAlert: jest.fn() })
}))

jest.mock('@/containers/PaymentForm', () => ({
	__esModule: true,
	default: ({
		onCancel,
		onSubmit,
		options,
		price
	}: {
		onSubmit: () => void
		onCancel: () => void
		options: { label: string; value: string }[]
		price: number
	}) => (
		<div>
			<button onClick={onSubmit}>Submit</button>
			<button onClick={onCancel}>Cancel</button>
			<p data-testid='price'>{price}</p>
			<p data-testid='options'>{options.map((o) => o.label).join(',')}</p>
		</div>
	)
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => jest.fn(),
	useSearchParams: () => [new URLSearchParams()],
	useLocation: () => ({ search: '', pathname: '' })
}))

describe('PaymentOtherServicePage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<PaymentOtherServicePage />)
	})

	it('should render component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call purchaseProduct when submit payment form', () => {
		const purchaseProductMock = jest.fn()
		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValue({
			productToCheckout: { product_id: '1' },
			purchaseProduct: purchaseProductMock.mockResolvedValue(true),
			setProductToCheckout: jest.fn()
		})
		wrapper.rerender(<PaymentOtherServicePage />)
		const submit = wrapper.getByText('Submit')

		act(() => {
			fireEvent.click(submit)
		})

		waitFor(() => {
			expect(purchaseProductMock).toHaveBeenCalled()
		})
	})
	it('should not call purchaseProduct when submit payment form', () => {
		const setAlertMock = jest.fn()
		;(useBusinessPartnerStore as unknown as jest.Mock).mockReturnValue({
			productToCheckout: { product_id: '1' },
			purchaseProduct: jest.fn().mockResolvedValue(false),
			setProductToCheckout: jest.fn()
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			alert: {},
			setAlert: setAlertMock
		})
		wrapper.rerender(<PaymentOtherServicePage />)
		const submit = wrapper.getByText('Submit')

		act(() => {
			fireEvent.click(submit)
		})

		waitFor(() => {
			expect(setAlertMock).toHaveBeenCalled()
		})
	})
})
