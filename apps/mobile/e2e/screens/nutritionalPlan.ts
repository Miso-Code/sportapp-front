import { element, by, expect } from 'detox'

class NutritionalPlanScreen {
	private readonly screenScrollView = element(
		by.type('android.widget.ScrollView')
	)
	private readonly screenTitle

	constructor() {
		this.screenTitle = element(by.text('Plan Nutricional')).atIndex(0)
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await this.screenScrollView.scroll(2000, 'down')
		await this.screenScrollView.scroll(2000, 'up', 0.5, 0.5)
	}
}

export default NutritionalPlanScreen
