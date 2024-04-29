import { FormPaymentData } from '../utils/schema'

export interface Props {
	onSubmit: (data: FormPaymentData) => void
	onCancel: () => void
	className?: string
	options: {
		label: string
		value: string
	}[]
	price?: number
	isLoading?: boolean
}
