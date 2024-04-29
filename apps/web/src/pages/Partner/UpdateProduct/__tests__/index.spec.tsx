import { PaymentFrequency } from '@/containers/Partner/CreateProduct/interfaces'
import { FormData } from '@/containers/Partner/CreateProduct/utils/schema'
import { usePartnerProductStore } from '@sportapp/stores'
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import UpdateProductPartnerPage from '..'
import { useLocation } from 'react-router-dom'

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
		})
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

jest.mock('@/utils/files', () => ({
	toBase64: jest.fn().mockResolvedValue('image64')
}))

jest.mock('@/utils/files', () => ({
	toBase64: jest.fn().mockResolvedValue('image64')
}))

jest.mock('@/containers/Partner/CreateProduct', () => ({
	__esModule: true,
	default: ({
		isLoading,
		onHandleSubmit,
		buttonText = 'buttonText'
	}: {
		isLoading: boolean
		onHandleSubmit: (data: FormData) => void
		buttonText?: string
	}) => (
		<div>
			CreateProduct
			<button
				onClick={() => {
					const payload: FormData = {
						category: '',
						name: '',
						summary: '',
						url: '',
						price: 0,
						paymentType: '',
						paymentFrequency: PaymentFrequency.OTHER,
						description: '',
						image_base64: '',
						typeImage: 'false',
						imageUrl: ''
					}
					onHandleSubmit(payload)
				}}>
				{buttonText}
			</button>
			<p id='loading'>{isLoading}</p>
		</div>
	)
}))

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: jest.fn().mockReturnValue({
		search: '?productId=1'
	}),
	useNavigate: jest.fn().mockReturnValue(jest.fn())
}))

describe('UpdateProductPartnerPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<UpdateProductPartnerPage />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should render with loading', async () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			createProduct: jest.fn(),
			error: undefined,
			loading: true,
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
			})
		})

		wrapper.rerender(<UpdateProductPartnerPage />)

		await waitFor(() => expect(wrapper.getByText('loading')).toBeTruthy())
	})

	it('should call deleteProduct', () => {
		const deleteProduct = jest.fn().mockReturnValue(true)
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			createProduct: jest.fn(),
			error: undefined,
			loading: false,
			setError: jest.fn(),
			deleteProduct,
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
			})
		})

		wrapper.rerender(<UpdateProductPartnerPage />)
		const deleteButton = wrapper.getByText('productUpdate.delete')

		fireEvent.click(deleteButton as Element)

		waitFor(() => expect(deleteProduct).toHaveBeenCalled())
	})

	it('should call deleteProduct', () => {
		const deleteProduct = jest.fn().mockReturnValue(true)
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			createProduct: jest.fn(),
			error: undefined,
			loading: false,
			setError: jest.fn(),
			deleteProduct,
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
			})
		})

		wrapper.rerender(<UpdateProductPartnerPage />)
		const deleteButton = wrapper.getByText('productUpdate.delete')

		fireEvent.click(deleteButton as Element)

		waitFor(() => expect(deleteProduct).toHaveBeenCalled())
	})

	it('should call handleGetProduct and generate error', () => {
		const setError = jest.fn()
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			createProduct: jest.fn(),
			error: undefined,
			loading: false,
			setError,
			getProduct: jest.fn().mockResolvedValue(false),
			updateProduct: jest.fn()
		})
		;(useLocation as unknown as jest.Mock).mockReturnValue({
			search: ''
		})
		wrapper.rerender(<UpdateProductPartnerPage />)
		const updateButton = wrapper.getByText('productUpdate.update')

		fireEvent.click(updateButton as Element)

		waitFor(() => expect(setError).toHaveBeenCalled())
	})
})
