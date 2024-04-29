import { render, RenderResult } from '@testing-library/react'
import ViewPurchasedProduct from '..'

jest.mock('@sportapp/stores', () => ({
	usePartnerProductStore: jest.fn().mockReturnValue({
		createProduct: jest.fn(),
		error: undefined,
		loading: false,
		setError: jest.fn(),
		getProduct: jest.fn().mockResolvedValue({
			category: 'category',
			description: 'description',
			image_url: 'image_url',
			name: 'name',
			payment_frequency: 'payment_frequency',
			payment_type: 'payment_type',
			price: 0,
			summary: 'summary',
			url: 'url',
			active: true
		}),
		getPurchasedProducts: jest.fn()
	}),
	usePartnerAuthStore: () => ({
		user: {
			id: '1',
			email: 'corre@correo.com',
			name: 'Corre',
			role: 'partner'
		}
	})
}))

describe('ViewPurchasedProduct', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<ViewPurchasedProduct />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})
})
