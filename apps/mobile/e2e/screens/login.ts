import { element, by, expect, device } from 'detox'

class LoginScreen {
	private readonly appTitle = element(by.text('SportApp'))
	private readonly usernameInput = element(by.id('text-input-email'))
	private readonly passwordInput = element(by.id('text-input-password'))
	private readonly loginButton = element(by.text('Iniciar'))

	async isVisible() {
		await expect(this.appTitle).toBeVisible()
		await expect(this.usernameInput).toBeVisible()
		await expect(this.passwordInput).toBeVisible()
		await expect(this.loginButton).toBeVisible()
	}

	async login(username: string, password: string) {
		await device.disableSynchronization()
		await this.usernameInput.typeText(username)
		await this.passwordInput.typeText(password)
		await device.enableSynchronization()
		await this.loginButton.tap()
	}
}

export default LoginScreen
