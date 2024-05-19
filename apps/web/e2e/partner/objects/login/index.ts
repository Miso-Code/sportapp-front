import { expect, type Page } from '@playwright/test'

export class LoginPartnerPage {
	readonly page: Page
	readonly loginPath: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.loginPath = `${pathBaseURL}/partner/login`
	}

	async goto() {
		await this.page.goto(this.loginPath)
	}

	async goToRegisterPage() {
		await this.page.getByText('Registrarse').click()
		await expect(this.page.url()).toBe(
			new URL('/partner/register', this.pathBaseURL).toString()
		)
	}

	async showPassword() {
		await this.page
			.locator('button[aria-label="toggle password visibility"]')
			.click()
	}

	async getAndFillEmail(email: string) {
		await this.page.locator('#email').fill(email)
	}

	async getAndFillPassword(password: string) {
		await this.page.locator('#password').fill(password)
	}

	async clickSubmit() {
		await this.page.locator('button[type="submit"]').click()
	}

	async loginSuccessPartner() {
		await this.getAndFillEmail('jdoe-parnet@gmail.com')
		await this.getAndFillPassword('Test123!')
		await this.showPassword()
		await this.clickSubmit()

		await this.page.waitForResponse(
			(response) =>
				response.url().includes('login') &&
				response.status().toString().startsWith('2')
		)
	}

	async loginCustomPartner({
		email,
		password
	}: {
		email: string
		password: string
	}) {
		await this.getAndFillEmail(email)
		await this.getAndFillPassword(password)
		await this.showPassword()
		await this.clickSubmit()
	}

	async loginErrorPartner({
		email,
		password
	}: {
		email: string
		password: string
	}) {
		await this.getAndFillEmail(email)
		await this.getAndFillPassword(password)
		await this.showPassword()
		await this.clickSubmit()

		await this.page.waitForResponse(
			(response) =>
				response.url().includes('/login') &&
				response.status().toString().startsWith('4')
		)
		await this.page.waitForTimeout(1000)

		const alertContainer = await this.page
			.locator('.MuiCollapse-root')
			.first()
		const alertMessage = await alertContainer
			.locator('.MuiAlert-message')
			.textContent()

		expect(await alertContainer.getAttribute('style')).toContain(
			'height: auto;'
		)

		const expectedErrorMessage = 'Ha ocurrido un error al iniciar sesión'
		await expect(alertMessage).toBe(expectedErrorMessage)

		expect(await this.page.url()).toBe(this.loginPath)
	}
}
