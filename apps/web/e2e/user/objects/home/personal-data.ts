import { Page, expect } from '@playwright/test'

export class HomeUserPersonalDataPage {
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
		expect(await this.page.getByText(email)).toBeTruthy()
		expect(await this.page.getByText(name)).toBeTruthy()
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

	async verifyPersonalData({
		email,
		name,
		lastName,
		documentType,
		documentNumber,
		country,
		city,
		countryResidence,
		cityResidence,
		lengthOfStay,
		gender,
		birdate
	}: {
		email: string
		name: string
		lastName: string
		documentType: string
		documentNumber: string
		country: string
		city: string
		countryResidence: string
		cityResidence: string
		lengthOfStay: number
		gender: string
		birdate: string
	}) {
		const emailInput = await this.page.locator('#email')
		const nameInput = await this.page.locator('#name')
		const lastNameInput = await this.page.locator('#lastName')
		const documentNumberInput = await this.page.locator('#documentNumber')
		expect(await emailInput.inputValue()).toBe(email)
		expect(await nameInput.inputValue()).toBe(name)
		expect(await lastNameInput.inputValue()).toBe(lastName)
		expect(await documentNumberInput.inputValue()).toBe(documentNumber)
		expect(
			await this.page
				.locator('[id="residence\\.lengthOfStay"]')
				.inputValue()
		).toBe(lengthOfStay.toString())
		expect(
			await this.page
				.locator('#mui-component-select-documentType')
				.innerHTML()
		).toBe(documentType)
		expect(
			await this.page
				.locator(
					'div[aria-labelledby="nationality.country-select-label mui-component-select-nationality.country"]'
				)
				.innerHTML()
		).toBe(countryResidence)

		expect(
			await this.page
				.locator(
					'div[aria-labelledby="nationality.city-select-label mui-component-select-nationality.city"]'
				)
				.innerHTML()
		).toBe(cityResidence)

		expect(
			await this.page
				.locator(
					'div[aria-labelledby="residence.country-select-label mui-component-select-residence.country"]'
				)
				.innerHTML()
		).toBe(country)
		expect(
			await this.page
				.locator(
					'div[aria-labelledby="residence.city-select-label mui-component-select-residence.city"]'
				)
				.innerHTML()
		).toBe(city)
		expect(
			await this.page.locator('#mui-component-select-gender').innerHTML()
		).toBe(gender)
		expect(await this.page.locator('#birthday').inputValue()).toBe(birdate)
	}
}
