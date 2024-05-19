import { element, by, expect } from 'detox'
class BottomNavigation {
	private readonly profileTab = element(by.id('profile-tab'))
	private readonly trainingTab = element(by.id('training-tab'))
	private readonly notificationsTab = element(by.id('notifications-tab'))
	private readonly premiumTab = element(by.id('premium-tab'))

	async isVisible(isPremium: boolean = false) {
		await expect(this.profileTab).toBeVisible()
		await expect(this.trainingTab).toBeVisible()
		await expect(this.notificationsTab).toBeVisible()
		if (isPremium) await expect(this.premiumTab).toBeVisible()
	}

	async goToProfile() {
		await this.profileTab.tap()
	}

	async goToTraining() {
		await this.trainingTab.tap()
	}

	async goToNotifications() {
		await this.notificationsTab.tap()
	}

	async goToPremium() {
		await this.premiumTab.tap()
	}
}

export default BottomNavigation
