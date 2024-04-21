import { usePartnerProductStore } from '@sportapp/stores'
import UpdateProductPartnerPage from '..'
import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'

jest.mock('@sportapp/stores', () => ({
	usePartnerProductStore: jest.fn().mockReturnValue({
		createProduct: jest.fn(),
		error: undefined,
		loading: false,
		setError: jest.fn()
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

	it('should call deleteProduct', () => {
		const deleteProduct = jest.fn()
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			createProduct: jest.fn(),
			error: undefined,
			loading: false,
			setError: jest.fn(),
			deleteProduct
		})
		wrapper.rerender(<UpdateProductPartnerPage />)
		const deleteButton = wrapper.getByText('productUpdate.delete')

		fireEvent.click(deleteButton as Element)

		waitFor(() => expect(deleteProduct).toHaveBeenCalled())
	})
})
