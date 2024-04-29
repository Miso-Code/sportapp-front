import TablePaginationActions from '@/components/Table/Pagination'
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow
} from '@mui/material'
import Chip from '@mui/material/Chip'
import { usePartnerProductStore } from '@sportapp/stores'
import { getProductsPayload } from '@sportapp/stores/src/partner/products/interfaces'
import {
	ChangeEvent,
	MouseEvent,
	useCallback,
	useEffect,
	useState
} from 'react'
import { useTranslation } from 'react-i18next'
import { TransactionStatus, TransactionStatusType } from './interfaces'
import { columns, createData, formatCurrency } from './utils'

export default function CustomPaginationActionsTable() {
	const { t } = useTranslation()
	const [page, setPage] = useState(0)
	const { getPurchasedProducts } = usePartnerProductStore()
	const { purchasedProducts } = usePartnerProductStore()
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const rows = purchasedProducts
		? purchasedProducts.map((product) =>
				createData(
					product.product_transaction_id,
					product.user_name,
					product.user_email,
					product.product_data.name,
					product.transaction_status,
					product.product_data.price
				)
			)
		: []

	const handleChangePage = useCallback(
		(_event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
			setPage(newPage)
		},
		[]
	)

	const handleChangeRowsPerPage = useCallback(
		(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setRowsPerPage(parseInt(event.target.value, 10))
			setPage(0)
		},
		[]
	)

	const handleChangeStatus = useCallback(
		(status: TransactionStatusType) => {
			if (status === TransactionStatus.PENDING) {
				return (
					<Chip
						label={t('paymentPurchased.table.status.pending')}
						color='default'
					/>
				)
			} else if (status === TransactionStatus.COMPLETED) {
				return (
					<Chip
						label={t('paymentPurchased.table.status.completed')}
						color='success'
					/>
				)
			}
			return (
				<Chip
					label={t('paymentPurchased.table.status.failed')}
					color='error'
				/>
			)
		},
		[t]
	)

	const handleGetPurchasedProducts = useCallback(async () => {
		const payload: getProductsPayload = {
			offset: page,
			limit: 10
		}

		await getPurchasedProducts(payload)
	}, [getPurchasedProducts, page])

	useEffect(() => {
		handleGetPurchasedProducts()
	}, [handleGetPurchasedProducts])

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 500 }} aria-label='custom pagination table'>
				<TableHead>
					<TableRow>
						{columns.map((column) => (
							<TableCell
								key={column.id}
								align={column.align}
								style={{ minWidth: column.minWidth }}>
								{t(column.label)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? rows.slice(
								page * rowsPerPage,
								page * rowsPerPage + rowsPerPage
							)
						: rows
					).map((row) => (
						<TableRow key={row.id}>
							<TableCell component='th' scope='row'>
								{row.id}
							</TableCell>
							<TableCell align='left'>{row.name}</TableCell>
							<TableCell align='left'>{row.email}</TableCell>
							<TableCell align='left'>{row.product}</TableCell>
							<TableCell align='left'>
								{handleChangeStatus(
									row.status as TransactionStatusType
								)}
							</TableCell>
							<TableCell align='left'>
								<b>$</b>
								{formatCurrency(row.price)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[
								5,
								10,
								15,
								25,
								{
									label: t(
										'paymentPurchased.table.footer.all'
									),
									value: -1
								}
							]}
							colSpan={6}
							count={100}
							rowsPerPage={rowsPerPage}
							page={page}
							labelRowsPerPage={t(
								'paymentPurchased.table.footer.rows_per_page'
							)}
							labelDisplayedRows={({ from, to, count }) => {
								const ofText = t(
									'paymentPurchased.table.footer.of'
								)
								const countText =
									count !== -1 ? count : `> ${to}`
								return `${from}-${to} ${ofText} ${countText}`
							}}
							slotProps={{
								select: {
									inputProps: {
										'aria-label': t(
											'paymentPurchased.table.footer.rows_per_page'
										)
									},
									native: true
								}
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	)
}
