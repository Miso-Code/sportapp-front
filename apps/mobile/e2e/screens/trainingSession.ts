import { element, by, expect, waitFor } from 'detox'

class TrainingSessionScreen {
	private readonly screenTitle
	private readonly trainingTimer
	private readonly startTrainingButton
	private readonly pauseTrainingButton
	private readonly stopTrainingButton
	private readonly resumeTrainingButton

	constructor() {
		this.screenTitle = element(by.text('Entrenamiento')).atIndex(0)
		this.startTrainingButton = element(by.id('startButton'))
		this.pauseTrainingButton = element(by.id('pauseButton'))
		this.stopTrainingButton = element(by.id('stopButton'))
		this.resumeTrainingButton = element(by.id('continueButton'))
		this.trainingTimer = element(by.id('trainingTimer'))
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.startTrainingButton).toBeVisible()
		await expect(this.pauseTrainingButton).not.toBeVisible()
		await expect(this.stopTrainingButton).not.toBeVisible()
		await expect(this.resumeTrainingButton).not.toBeVisible()
		await expect(this.trainingTimer).toBeVisible()
	}

	async startTraining() {
		await this.startTrainingButton.tap()
	}

	async pauseTraining() {
		await this.pauseTrainingButton.tap()
	}

	async stopTraining() {
		await this.stopTrainingButton.tap()
	}

	async resumeTraining() {
		await this.resumeTrainingButton.tap()
	}

	async waitSessionTime(time: number) {
		const timeString = `0:0${time}`
		await waitFor(this.trainingTimer)
			.toHaveText(timeString)
			.withTimeout(10000)
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default TrainingSessionScreen
