import {
	NutritionalPlanDish,
	GetNutritionalPlanDishesRequest,
	NotifyCaloryIntakeRequest,
	NotifyCaloryIntakeResponse
} from '@sportapp/sportapp-repository/src/nutritionalPlan/interfaces'

export interface INutritionalPlanStore
	extends INutritionalPlanState,
		INutritionalPlanActions {}

export interface INutritionalPlanState {
	planDishes: NutritionalPlanDish[]
	loading: boolean
}

export interface INutritionalPlanActions {
	getNutritionalPlan: (
		request: GetNutritionalPlanDishesRequest
	) => Promise<NutritionalPlanDish[] | undefined>
	notifyCaloryIntake: (
		request: NotifyCaloryIntakeRequest
	) => Promise<NotifyCaloryIntakeResponse | undefined>
	clearState: () => void
}
