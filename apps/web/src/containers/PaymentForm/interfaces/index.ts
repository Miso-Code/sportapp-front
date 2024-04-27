import { FormPaymentData } from '../utils/schema'

export interface Props {
	onSubmit: (data: FormPaymentData) => void
	onCancel: () => void
	className?: string
}
