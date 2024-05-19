import { by, element, expect } from 'detox'
class SettingsScreen {
	private readonly screenTitle = element(by.text('Configuraciones'))
	private readonly languageButton
	private readonly logoutButton

	constructor() {
		this.languageButton = element(by.id('list-item')).atIndex(0)
		this.logoutButton = element(by.id('list-item')).atIndex(1)
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.languageButton).toBeVisible()
		await expect(this.logoutButton).toBeVisible()
	}

	async goToLanguage() {
		await this.languageButton.tap()
	}

	async logout() {
		await this.logoutButton.tap()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default SettingsScreen
