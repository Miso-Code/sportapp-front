import {
	PaymentData,
	subscriptionType
} from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'

export interface IPaymentPlanState {
	loading?: boolean
	error?: string
	paymentData?: PaymentData
	selectedPlan?: subscriptionType
}

export interface IPaymentPlanActions {
	setLoading: (loading: boolean) => void
	setError: (error: string) => void
	setPaymentData: (paymentData: PaymentData) => void
	setSelectedPlan: (selectedPlan: subscriptionType) => void
	updatePlan: () => Promise<boolean>
	clearState: () => void
}

export interface IPaymentPlanStore
	extends IPaymentPlanState,
		IPaymentPlanActions {}
