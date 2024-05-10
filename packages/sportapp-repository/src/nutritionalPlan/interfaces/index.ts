export interface NutritionalPlanDish {
	week_day: string
	name: string
	category: string
	calories: number
	protein: number
	carbs: number
	fat?: number
	fats?: number
}

export interface NutritionalPlanDishRaw
	extends Omit<NutritionalPlanDish, 'name'> {
	name_es?: string
	name?: string
}

export interface GetNutritionalPlanDishesRequest {
	lang: string
}

export interface NotifyCaloryIntakeRequest {
    calories_burn_expected: number,
    calories_burn : number
}