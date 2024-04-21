import { usePartnerProductStore } from '@sportapp/stores'
import CreateProductPartnerPage from '..'
import { fireEvent, render, RenderResult } from '@testing-library/react'

jest.mock('@sportapp/stores', () => ({
	usePartnerProductStore: jest.fn().mockReturnValue({
		createProduct: jest.fn(),
		error: undefined,
		loading: false
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

jest.mock('@/containers/Partner/CreateProduct', () => ({
	__esModule: true,
	default: ({ onHandleSubmit }: { onHandleSubmit: () => void }) => (
		<div>
			CreateProduct
			<button onClick={onHandleSubmit}>submit</button>
		</div>
	)
}))

describe('CreateProductPartnerPage', () => {
	let wrapper: RenderResult

	beforeEach(() => {
		wrapper = render(<CreateProductPartnerPage />)
	})

	afterEach(() => {
		wrapper.unmount()
	})

	it('should render the component', () => {
		expect(wrapper.container).toMatchSnapshot()
	})

	it('should call createProduct when onSubmit is called', async () => {
		const createProduct = jest.fn().mockReturnValue(true)
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			createProduct,
			error: undefined,
			loading: false
		})

		wrapper.rerender(<CreateProductPartnerPage />)
		const submitButton = wrapper.getByText('submit')
		fireEvent.click(submitButton)
		expect(createProduct).toHaveBeenCalled()
	})
})
