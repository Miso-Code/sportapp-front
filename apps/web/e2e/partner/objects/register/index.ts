import { Page } from '@playwright/test'

export class RegisterPartnerPage {
	readonly page: Page
	readonly registerPath: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.registerPath = `${pathBaseURL}/partner/register`
	}

	async goto() {
		await this.page.goto(this.registerPath)
	}

	async goToLoginPage() {
		await this.page.getByText('Inicia sesión').click()
	}

	async getAndFillEmail(email: string) {
		await this.page.locator('#email').fill(email)
	}

	async getAndFillPassword(password: string) {
		await this.page.locator('#password').fill(password)
	}

	async showPassword() {
		await this.page
			.locator('button[aria-label="toggle password visibility"]')
			.click()
	}

	async getAndFillCompanyName(name: string) {
		await this.page.locator('#companyName').fill(name)
	}

	async clickSubmit() {
		await this.page.locator('button[type="submit"]').click()
	}
}
