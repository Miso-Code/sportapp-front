import { element, by, expect, waitFor } from 'detox'

class TrainingSessionSummaryScreen {
	private readonly screenScrollView = element(
		by.type('android.widget.ScrollView')
	)
	// private readonly screenTitle
	private readonly kpiCalories
	private readonly kpiTime
	private readonly kpiSteps
	private readonly kpiDistance
	private readonly kpiSpeed
	private readonly kpiHeartRate

	constructor() {
		// this.screenTitle = element(by.text('Finalizar Entrenamento')).atIndex(0)
		this.kpiCalories = element(by.id('calories'))
		this.kpiTime = element(by.id('duration'))
		this.kpiSteps = element(by.id('steps'))
		this.kpiDistance = element(by.id('distance'))
		this.kpiSpeed = element(by.id('speed'))
		this.kpiHeartRate = element(by.id('heartrate'))
	}

	async isVisible() {
		// await waitFor(this.screenTitle).toBeVisible().withTimeout(10000)
		await waitFor(this.kpiCalories).toBeVisible().withTimeout(10000)
		await this.screenScrollView.scroll(200, 'down')
		await expect(this.kpiTime).toBeVisible()
		await this.screenScrollView.scroll(200, 'down')
		await expect(this.kpiSteps).toBeVisible()
		await this.screenScrollView.scroll(200, 'down')
		await expect(this.kpiDistance).toBeVisible()
		await this.screenScrollView.scroll(200, 'down')
		await expect(this.kpiSpeed).toBeVisible()
		await this.screenScrollView.scroll(200, 'down')
		await expect(this.kpiHeartRate).toBeVisible()
		await this.screenScrollView.scroll(2000, 'up', 0.5, 0.5)
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default TrainingSessionSummaryScreen
