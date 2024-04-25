import { usePartnerProductStore } from '@sportapp/stores'
import {
	act,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { useNavigate, useLocation } from 'react-router-dom'
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
		]),
		products: [
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
		]
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

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: jest.fn().mockReturnValue(jest.fn()),
	useLocation: jest.fn().mockReturnValue({
		search: ''
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

	it('should render the component with error', async () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			loading: false,
			error: 'error',
			getProducts: jest.fn()
		})
		act(() => {
			wrapper = render(<HomePartner />)
		})

		await waitFor(() => {
			expect(wrapper.container).toMatchSnapshot()
			expect(wrapper.getByText('error')).toBeInTheDocument()
		})
	})

	it('should call navigate', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			loading: false,
			error: undefined,
			getProducts: jest.fn().mockResolvedValue([
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
			]),
			products: [
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
			]
		})

		act(() => {
			wrapper = render(<HomePartner />)
		})

		await waitFor(() => {
			const button = wrapper.getByText('aaa')
			fireEvent.click(button)
			expect(navigate).toHaveBeenCalledTimes(1)
			expect(navigate).toHaveBeenCalledWith({
				pathname: '/partner/product/update',
				search: '?productId=8f02181a-4433-48a6-b8df-578bb3a1cdc7'
			})
		})
	})

	it('should call getProducts', async () => {
		const getProducts = jest.fn().mockResolvedValue([
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
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			loading: false,
			error: undefined,
			getProducts
		})

		act(() => {
			wrapper = render(<HomePartner />)
		})

		await waitFor(() => {
			expect(getProducts).toHaveBeenCalledTimes(1)
		})
	})

	it('should call navigate with search id', async () => {
		const navigate = jest.fn()
		;(useNavigate as jest.Mock).mockReturnValue(navigate)
		;(useLocation as jest.Mock).mockReturnValue({
			search: '?searchId=8f02181a-4433-48a6-b8df-578bb3a1cdc7'
		})
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			loading: false,
			error: undefined,
			getProducts: jest.fn().mockResolvedValue([
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
			]),
			products: [
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
			]
		})

		act(() => {
			wrapper = render(<HomePartner />)
		})

		await waitFor(() => {
			const button = wrapper.getByText('aaa')
			fireEvent.click(button)
			expect(navigate).toHaveBeenCalledTimes(1)
			expect(navigate).toHaveBeenCalledWith({
				pathname: '/partner/product/update',
				search: '?searchId=8f02181a-4433-48a6-b8df-578bb3a1cdc7&productId=8f02181a-4433-48a6-b8df-578bb3a1cdc7'
			})
		})
	})

	it('should call getProducts with click in pagination 2', async () => {
		const getProducts = jest.fn().mockResolvedValue([
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
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			loading: false,
			error: undefined,
			getProducts
		})

		wrapper.rerender(<HomePartner />)

		await waitFor(() => {
			const button = wrapper.getByText('2')
			fireEvent.click(button)
			expect(getProducts).toHaveBeenCalledWith({ limit: 5, offset: 1 })
		})
	})
})
