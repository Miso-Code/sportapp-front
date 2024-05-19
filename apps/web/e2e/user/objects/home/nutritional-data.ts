import { Page, expect } from '@playwright/test'
import { AllergyType, PreferenceType } from './interface'

export class HomeUserNutritionalDataPage {
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

	async gotoNutritionalData() {
		await this.page
			.getByRole('button', { name: 'Datos alimenticios' })
			.click()
	}

	async gotoEditNutritionalData() {
		await this.gotoNutritionalData()
		await this.page.getByRole('button', { name: 'Editar' }).click()
	}

	async getAndFillAllergyNutritionalData(allergy: AllergyType) {
		await this.page.getByLabel('Tipo de alergia').first().click()
		await this.page.getByRole('option', { name: allergy }).click()
		await this.page.locator('#menu-allergyType div').first().click()
	}

	async getAndFillPreferenceNutritionalData(preferenceType: PreferenceType) {
		await this.page.locator('#menu-allergyType div').first().click()
		await this.page
			.locator('label')
			.filter({ hasText: preferenceType })
			.click()
	}

	async saveNutritionalData() {
		await this.page.getByRole('button', { name: 'Guardar' }).click()
	}

	async verifyNutritionalData({
		allergy
	}: {
		allergy: AllergyType[]
		preference?: PreferenceType
	}) {
		const chips = await this.page.locator('.MuiChip-label').all()
		expect(chips).toHaveLength(allergy.length)

		expect(
			allergy.every(async (allergyType) =>
				chips.some(
					async (chip) => (await chip.textContent()) === allergyType
				)
			)
		).toBeTruthy()

		const preferenceOptions = await this.page
			.locator('input[name="foodPreferences"]')
			.all()
		expect(preferenceOptions).toHaveLength(3)
	}
}
