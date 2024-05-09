import { ProductPurchased } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/product-purchased'
import {
	columns,
	createData,
	formatCurrency,
	generateRows,
	currencyByCountry
} from '..'

describe('PurchasedProduct Table utils', () => {
	const data = [
		{
			product_data: {
				product_id: '1',
				name: 'product1',
				price: 100
			},
			user_name: 'user1',
			user_email: 'test@correo.com',
			transaction_status: 'pending'
		},
		{
			product_data: {
				product_id: '2',
				name: 'product2',
				price: 200
			},
			user_name: 'user2',
			user_email: 'test@correo.com',
			transaction_status: 'completed'
		}
	]

	describe('createData', () => {
		it('should create data', () => {
			const result = createData(
				data[0].product_data.product_id,
				data[0].user_name,
				data[0].user_email,
				data[0].product_data.name,
				data[0].transaction_status,
				data[0].product_data.price
			)
			expect(result).toEqual({
				id: data[0].product_data.product_id,
				name: data[0].user_name,
				email: data[0].user_email,
				product: data[0].product_data.name,
				status: data[0].transaction_status,
				price: data[0].product_data.price
			})
		})
	})

	describe('generateRows', () => {
		it('should generate rows', () => {
			const payload = data as ProductPurchased[]
			const result = generateRows(payload)
			expect(result).toEqual([
				{
					id: data[0].product_data.product_id,
					name: data[0].user_name,
					email: data[0].user_email,
					product: data[0].product_data.name,
					status: data[0].transaction_status,
					price: data[0].product_data.price
				},
				{
					id: data[1].product_data.product_id,
					name: data[1].user_name,
					email: data[1].user_email,
					product: data[1].product_data.name,
					status: data[1].transaction_status,
					price: data[1].product_data.price
				}
			])
		})
	})

	describe('columns', () => {
		it('should have columns', () => {
			expect(columns).toEqual([
				{
					id: 'id',
					label: 'paymentPurchased.table.header.0',
					minWidth: 170
				},
				{
					id: 'name',
					label: 'paymentPurchased.table.header.1',
					minWidth: 100
				},
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
					format: expect.any(Function)
				}
			])
		})

		it('should format price', () => {
			if (
				columns &&
				columns.length > 5 &&
				columns[5] &&
				typeof columns[5].format === 'function'
			) {
				const result = columns[5].format(100)
				expect(result).toEqual('100.00')
			} else {
				throw new Error('columns[5].format is not a function')
			}
		})
	})

	describe('formatCurrency', () => {
		it('should format currency', () => {
			const result = formatCurrency(100)
			expect(result).toEqual('100')
		})
		it('should format currency', () => {
			const result = formatCurrency(1000)
			expect(result).toEqual('1,000')
		})
	})

	describe('currencyByCountry', () => {
		beforeEach(() => {
			jest.spyOn(Intl, 'NumberFormat').mockImplementation(() => ({
				format: (value: number) => `$${value.toFixed(2)}`,
				resolvedOptions: () => ({
					locale: 'en-US',
					numberingSystem: 'latn',
					style: 'decimal',
					currency: 'USD',
					currencyDisplay: 'symbol',
					minimumIntegerDigits: 1,
					minimumFractionDigits: 0,
					maximumFractionDigits: 0,
					useGrouping: false
				}),
				formatToParts: () => [],
				formatRange: () => '',
				formatRangeToParts: () => []
			}))
		})

		afterEach(() => {
			jest.resetAllMocks()
		})

		it('should format currency by country', () => {
			const result = currencyByCountry(100, 'en-US')
			expect(result).toEqual('$100.00')
		})
	})
})
