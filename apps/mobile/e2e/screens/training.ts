import { element, by, expect } from 'detox'

class TrainingScreen {
	private readonly screenTitle
	private readonly startTrainingButton
	private readonly trainingAndEventsButton
	private readonly nutritionalPlanButton
	private readonly servicesButton
	private readonly premiumButton

	constructor() {
		this.screenTitle = element(by.text('Entrenamiento')).atIndex(0)
		this.startTrainingButton = element(by.text('Iniciar Entrenamento'))
		this.trainingAndEventsButton = element(
			by.text('Entrenamientos y eventos')
		)
		this.nutritionalPlanButton = element(by.text('Plan Nutricional'))
		this.servicesButton = element(by.text('Otros Servicios'))
		this.premiumButton = element(by.text('Preferenciales')).atIndex(0)
	}

	async isVisible(premium = false) {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.startTrainingButton).toBeVisible()
		await expect(this.trainingAndEventsButton).toBeVisible()
		await expect(this.nutritionalPlanButton).toBeVisible()
		await expect(this.servicesButton).toBeVisible()
		if (premium) await expect(this.premiumButton).toBeVisible()
	}

	async goToStartTraining() {
		await this.startTrainingButton.tap()
	}

	async goToTrainingAndEvents() {
		await this.trainingAndEventsButton.tap()
	}

	async goToNutritionalPlan() {
		await this.nutritionalPlanButton.tap()
	}

	async goToServices() {
		await this.servicesButton.tap()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default TrainingScreen
