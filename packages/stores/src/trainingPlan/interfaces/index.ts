import { TrainingPlanSession } from '@sportapp/sportapp-repository/src/trainingPlan/interfaces'

export interface ITrainingPlanStore extends ITrainingPlanState, ITrainingPlanActions {}

export interface ITrainingPlanState {
	trainingPlanSessions: TrainingPlanSession[]
}

export interface ITrainingPlanActions {
	getTrainingPlan: () => Promise<TrainingPlanSession[] | undefined>
	clearState: () => void
}
