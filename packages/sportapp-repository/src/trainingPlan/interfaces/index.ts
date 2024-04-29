export interface TrainingPlanSession {
	training_plan_session_id: string
	weekday: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
	start_time: string
	warm_up: number
	cardio: number
	strength: number
	cool_down: number
	user_id: string
}
