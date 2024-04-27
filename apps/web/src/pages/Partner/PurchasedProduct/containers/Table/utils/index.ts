import { ProductPurchased } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-purchased'
import { Column } from '../interfaces'

export function createData(
	id: string,
	name: string,
	email: string,
	product: string,
	status: string,
	price: number
) {
	return { id, name, email, product, status, price }
}

export function generateRows(data: ProductPurchased[]) {
	return data.map((item) =>
		createData(
			item.product_data.product_id,
			item.user_name,
			item.user_email,
			item.product_data.name,
			item.transaction_status,
			item.product_data.price
		)
	)
}

export const columns: readonly Column[] = [
	{ id: 'id', label: 'paymentPurchased.table.header.0', minWidth: 170 },
	{ id: 'name', label: 'paymentPurchased.table.header.1', minWidth: 100 },
	{
		id: 'email',
		label: 'paymentPurchased.table.header.2',
		minWidth: 170
	},
	{
		id: 'product',
		label: 'paymentPurchased.table.header.3',
		minWidth: 100
	},
	{
		id: 'status',
		label: 'paymentPurchased.table.header.4',
		align: 'left',
		minWidth: 100
	},
	{
		id: 'price',
		label: 'paymentPurchased.table.header.5',
		minWidth: 170,
		format: (value: number) => value.toFixed(2)
	}
]

export function formatCurrency(value: number) {
	return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
