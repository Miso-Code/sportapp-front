import { usePartnerProductStore } from '@sportapp/stores'
import CustomPaginationActionsTable from '..'
import { render, RenderResult } from '@testing-library/react'
import { TransactionStatus } from '../interfaces'

jest.mock('@sportapp/stores', () => ({
	usePartnerProductStore: jest.fn().mockReturnValue({
		getPurchasedProducts: jest.fn(),
		purchasedProducts: [
			{
				product_transaction_id: '1',
				user_name: 'John Doe',
				user_email: 'test@correo.com',
				product_data: {
					name: 'Test Product',
					price: 100
				},
				transaction_status: 'pending'
			}
		]
	})
}))

describe('CustomPaginationActionsTable', () => {
	let component: RenderResult

	beforeEach(() => {
		component = render(<CustomPaginationActionsTable />)
	})

	it('should render correctly', () => {
		expect(component).toMatchSnapshot()
	})

	it('should render with not data', () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			getPurchasedProducts: jest.fn(),
			purchasedProducts: []
		})

		component.rerender(<CustomPaginationActionsTable />)
		expect(component).toMatchSnapshot()
	})

	it('should handle page change', () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			getPurchasedProducts: jest.fn(),
			purchasedProducts: [
				{
					product_transaction_id: '1',
					user_name: 'John Doe',
					user_email: 'test@correo.com',
					product_data: {
						name: 'Test Product',
						price: 100
					},
					transaction_status: TransactionStatus.COMPLETED
				}
			]
		})

		component.rerender(<CustomPaginationActionsTable />)
		const tbodyElement = component.container.querySelector('tbody')
		expect(tbodyElement?.children.length).toBe(1)
	})

	it('should render one row in page', () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			getPurchasedProducts: jest.fn(),
			purchasedProducts: [
				{
					product_transaction_id: '1',
					user_name: 'John Doe',
					user_email: 'test@correo.com',
					product_data: {
						name: 'Test Product',
						price: 100
					},
					transaction_status: TransactionStatus.PENDING
				}
			]
		})

		component.rerender(<CustomPaginationActionsTable />)
		const tbodyElement = component.container.querySelector('tbody')
		expect(tbodyElement?.children.length).toBe(1)
	})
	it('should render cero row in page', () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			getPurchasedProducts: jest.fn(),
			purchasedProducts: null
		})

		component.rerender(<CustomPaginationActionsTable />)
		const tbodyElement = component.container.querySelector('tbody')
		expect(tbodyElement?.children.length).toBe(0)
	})

	it('should render status chip', () => {
		;(usePartnerProductStore as unknown as jest.Mock).mockReturnValue({
			getPurchasedProducts: jest.fn(),
			purchasedProducts: [
				{
					product_transaction_id: '1',
					user_name: 'John Doe',
					user_email: 'test@correo.com',
					product_data: {
						name: 'Test Product',
						price: 100
					},
					transaction_status: TransactionStatus.FAILED
				}
			]
		})

		component.rerender(<CustomPaginationActionsTable />)
		const tbodyElement = component.container.querySelector('tbody')
		const statusElement = tbodyElement?.querySelector('.MuiChip-root')
		expect(tbodyElement?.children.length).toBe(1)
		expect(statusElement).toHaveTextContent(
			'paymentPurchased.table.status.failed'
		)
	})
})
