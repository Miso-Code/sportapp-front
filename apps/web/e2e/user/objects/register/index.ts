import { Page } from '@playwright/test'

export class RegisterUserPage {
	readonly page: Page
	readonly registerPath: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.registerPath = `${pathBaseURL}/register`
	}

	async goto() {
		await this.page.goto(this.registerPath)
	}

	async goToLoginPage() {
		await this.page.getByText('Inicia sesión').click()
	}

	async goToLoginPageSuccess() {
		await this.page.getByText('Inicia sesión').click()
		await expect(this.page.url()).toBe(`${this.pathBaseURL}`)
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

	async getAndFillName(name: string) {
		await this.page.locator('#name').fill(name)
	}

	async getAndFillLastName(lastName: string) {
		await this.page.locator('#lastName').fill(lastName)
	}

	async getAndFillDocumentType(documentType: string) {
		await this.page.locator('#documentType').fill(documentType)
	}

	async getAndFillDocumentNumber(documentNumber: string) {
		await this.page.locator('#documentNumber').click()
		await this.page.locator('#documentNumber').fill(documentNumber)
	}

	async getAndFillCountry() {
		await this.page.getByLabel('Pais de nacimiento').click()
		await this.page.getByRole('option', { name: 'Colombia' }).click()
	}

	async getAndFillCity() {
		await this.page.getByLabel('Ciudad de nacimiento').click()
		await this.page
			.getByRole('option', { name: 'Cali', exact: true })
			.click()
	}

	async getAndFillCountryResidence() {
		await this.page.getByLabel('País de residencia').click()
		await this.page.getByRole('option', { name: 'Colombia' }).click()
	}

	async getAndFillLengthOfStay(lengthOfStay: number) {
		await this.page.locator('[id="residence\\.lengthOfStay"]').click()
		await this.page
			.locator('[id="residence\\.lengthOfStay"]')
			.fill(lengthOfStay.toString())
	}

	async getAndFillCityResidence() {
		await this.page.getByLabel('Ciudad de residencia').click()
		await this.page
			.getByRole('option', { name: 'Cali', exact: true })
			.click()
	}

	async getAndFillGender(gender: string) {
		await this.page.locator('#gender').fill(gender)
	}

	async getAndFillBirthdate(date: string) {
		await this.page.getByPlaceholder('MM/DD/YYYY').click()
		await this.page.getByPlaceholder('MM/DD/YYYY').fill(date)
	}

	async clickSubmit() {
		await this.page.locator('button[type="submit"]').click()
	}
}
