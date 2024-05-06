import { Page, expect } from '@playwright/test'

export class HomeUserPage {
	readonly page: Page
	readonly homePath: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.homePath = `${pathBaseURL}/home`
	}

	async goto() {
		await this.page.goto(this.homePath)
	}

	async validateUserSession({
		email,
		name
	}: {
		email: string
		name: string
	}) {
		const emailElement = await this.page.getByText(email)
		const nameElement = await this.page.getByText(name)
		expect(emailElement).toBeTruthy()
		expect(nameElement).toBeTruthy()
	}

	async gotoPersonalData() {
		await this.page
			.getByRole('button', { name: 'Datos personales' })
			.click()
	}

	async gotoEditPersonalData() {
		await this.gotoPersonalData()
		await this.page.getByRole('button', { name: 'Editar' }).click()
	}

	async getAndFillNamePersonalData(name: string) {
		await this.page.locator('#name').fill(name)
	}

	async getAndFillLastNamePersonalData(lastName: string) {
		await this.page.locator('#lastName').fill(lastName)
	}

	async getAndFillDocumentTypePersonalData(documentType: string) {
		await this.page.locator('#documentType').fill(documentType)
	}

	async getAndFillDocumentNumberPersonalData(documentNumber: string) {
		await this.page.locator('#documentNumber').click()
		await this.page.locator('#documentNumber').fill(documentNumber)
	}

	async getAndFillCountryPersonalData() {
		await this.page.getByLabel('Pais de nacimiento').click()
		await this.page.getByRole('option', { name: 'Colombia' }).click()
	}

	async getAndFillCityPersonalData() {
		await this.page.getByLabel('Ciudad de nacimiento').click()
		await this.page
			.getByRole('option', { name: 'Cali', exact: true })
			.click()
	}

	async getAndFillCountryResidencePersonalData() {
		await this.page.getByLabel('País de residencia').click()
		await this.page.getByRole('option', { name: 'Colombia' }).click()
	}

	async getAndFillLengthOfStayPersonalData(lengthOfStay: number) {
		await this.page.locator('[id="residence\\.lengthOfStay"]').click()
		await this.page
			.locator('[id="residence\\.lengthOfStay"]')
			.fill(lengthOfStay.toString())
	}

	async getAndFillCityResidencePersonalData() {
		await this.page.getByLabel('Ciudad de residencia').click()
		await this.page
			.getByRole('option', { name: 'Cali', exact: true })
			.click()
	}

	async getAndFillGenderPersonalData(gender: string) {
		await this.page.locator('#gender').fill(gender)
	}

	async getAndFillBirthdatePersonalData(date: string) {
		await this.page.getByPlaceholder('MM/DD/YYYY').click()
		await this.page.getByPlaceholder('MM/DD/YYYY').fill(date)
	}

	async saveEditPersonalData() {
		await this.page.getByRole('button', { name: 'Guardar' }).click()
	}
}
