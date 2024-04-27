export interface Column {
	id: 'name' | 'id' | 'email' | 'product' | 'status' | 'price'
	label: string
	minWidth?: number
	align?: 'right' | 'left' | 'center'
	format?: (value: number) => string
}

export enum TransactionStatus {
	PENDING = 'pending',
	COMPLETED = 'completed',
	FAILED = 'failed'
}

export type TransactionStatusType = `${TransactionStatus}`
