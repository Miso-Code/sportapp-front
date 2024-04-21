import { usePartnerProductStore } from '@sportapp/stores'
import { act, render, RenderResult, waitFor } from '@testing-library/react'
import HomePartner from '..'

jest.mock('@sportapp/stores', () => ({
	usePartnerProductStore: jest.fn().mockReturnValue({
		createProduct: jest.fn(),
		error: undefined,
		loading: false,
		setError: jest.fn(),
		getProducts: jest.fn().mockReturnValue([
			{
				product_id: '8f02181a-4433-48a6-b8df-578bb3a1cdc7',
				business_partner_id: '15ba4bc7-53b0-40f6-9606-a8d28342d473',
				category: 'training_services',
				name: 'aaa',
				summary: '[Mobile] - Calendario de Eventos',
				url: 'https://www.youtube.com/watch?v=ZklvDN4-8bA&ab_channel=ProfeZaki',
				price: 2.0,
				payment_type: 'periodic',
				payment_frequency: 'monthly',
				image_url:
					'https://raw.githubusercontent.com/react-dropzone/react-dropzone/master/logo/logo.png',
				description: 'ksgfdshfkjdshfskj\ntest',
				active: true
			}
		])
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

describe('HomePartner', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		global.scrollTo = jest.fn()

		wrapper = render(<HomePartner />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render the component with loading', async () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			loading: true,
			error: undefined,
			getProducts: jest.fn()
		})
		act(() => {
			wrapper = render(<HomePartner />)
		})

		await waitFor(() => {
			expect(wrapper.container).toMatchSnapshot()
			expect(wrapper.getByText('loading')).toBeInTheDocument()
		})
	})
})
