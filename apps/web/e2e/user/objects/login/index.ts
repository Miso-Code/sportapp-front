import { expect, type Page } from '@playwright/test'
import { faker } from '@faker-js/faker'

export class LoginUserPage {
	readonly page: Page
	readonly loginPath: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.loginPath = `${pathBaseURL}/`
	}

	async goto() {
		await this.page.goto(this.loginPath)
	}

	async goToRegisterPage() {
		await this.page.getByText('Registrarse').click()
		await expect(this.page.url()).toBe(`${this.pathBaseURL}/register`)
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

	async loginSuccessUser() {
		await this.getAndFillEmail('jdoe@gmail.com')
		await this.getAndFillPassword('Test123!')
		await this.showPassword()
		await this.clickSubmit()

		await this.page.waitForResponse(
			(response) =>
				response.url().includes('users/login') &&
				response.status().toString().startsWith('2')
		)

		await this.page.waitForResponse(
			(response) =>
				response.url().includes('users/profiles/personal') &&
				response.status().toString().startsWith('2')
		)
	}

	async loginCustomUser({
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

	async loginErrorUser() {
		await this.getAndFillEmail(faker.internet.email())
		await this.getAndFillPassword(
			faker.internet.password({
				length: 10,
				memorable: true,
				prefix: '!0aA'
			})
		)
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

		expect(alertMessage).toBe('Ha ocurrido un error al iniciar sesión')

		expect(await this.page.url()).toBe(this.loginPath)
	}
}
