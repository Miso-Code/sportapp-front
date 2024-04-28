import { FormPaymentData } from '@/containers/PaymentForm/utils/schema'

export interface Props {
	open: boolean
	handleSubmit: (data: FormPaymentData) => void
	handleClose: () => void,
	isFreePlan: boolean
	price: number
	isLoading: boolean
}
