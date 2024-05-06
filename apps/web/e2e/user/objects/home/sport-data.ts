import { Page, expect } from '@playwright/test'
import { FavoriteSportType, TrainingDays, TrainingObjective } from './interface'

export class HomeUserSportDataPage {
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

	async gotoSportData() {
		await this.page
			.getByRole('button', { name: 'Datos deportivos' })
			.click()
	}

	async gotoEditSportData() {
		await this.gotoSportData()
		await this.page.getByRole('button', { name: 'Editar' }).click()
	}

	async getAndFillFavoriteSport(sport: FavoriteSportType) {
		await this.page.getByLabel('Deporte que practicas o').click()
		await this.page.getByRole('option', { name: sport }).click()
	}

	async getAndFillTrainingObjective(trainingObjective: TrainingObjective) {
		await this.page.getByLabel('Objetivo de entrenamiento').click()
		await this.page.getByRole('option', { name: trainingObjective }).click()
	}

	async getAndFillTrainingDays(trainingDays: TrainingDays[]) {
		for (const day of trainingDays) {
			await this.page.getByLabel(day).click()
		}
	}

	async getAndFillTrainingHours() {
		await this.page.getByLabel('Choose time').click()
		await this.page.getByLabel('2 hours', { exact: true }).click()
		await this.page.getByLabel('10 minutes').click()
		await this.page.getByLabel('PM').click()
	}

	async getAndFillAvailableTrainingHoursPerDay(hours: number) {
		await this.page.locator('#availableTrainingHoursPerDay').click()
		await this.page
			.locator('#availableTrainingHoursPerDay')
			.fill(hours.toString())
	}

	async getAndFillWeight(weight: number) {
		await this.page.locator('#weight').click()
		await this.page.locator('#weight').fill(weight.toString())
	}

	async getAndFillHeight(height: number) {
		await this.page.locator('#height').click()
		await this.page.locator('#height').fill(height.toString())
	}

	async addLimitation() {
		await this.page
			.getByRole('button', { name: 'Agregar limitacion' })
			.click()
	}

	async getAndFillLimitationName(name: string, position: number) {
		await this.page
			.locator(`input[name="limitations.${position}.name"]`)
			.fill(name)
	}

	async getAndFillLimitationDescription(
		description: string,
		position: number
	) {
		await this.page
			.locator(`input[name="limitations.${position}.description"]`)
			.fill(description)
	}

	async saveEditSportData() {
		await this.page.getByRole('button', { name: 'Guardar' }).click()
	}

	async verifySportData({
		favoriteSport,
		trainingObjective,
		trainingDays,
		trainingHours,
		weight,
		height
	}: {
		favoriteSport: FavoriteSportType
		trainingObjective: TrainingObjective
		trainingDays: TrainingDays[]
		trainingHours: number
		weight: number
		height: number
	}) {
		expect(
			await this.page
				.locator(
					'div[aria-labelledby="favouriteSportId-select-label mui-component-select-favouriteSportId"]'
				)
				.textContent()
		).toBe(favoriteSport)
		expect(
			await this.page
				.locator(
					'div[aria-labelledby="trainingObjective-select-label mui-component-select-trainingObjective"]'
				)
				.textContent()
		).toBe(trainingObjective)
		for (const day of trainingDays) {
			expect(
				await this.page.getByLabel(day).getAttribute('aria-pressed')
			).toBe('true')
		}
		expect(
			await this.page.locator('#preferedTrainingStartTime').inputValue()
		).toBe('02:10 PM')
		expect(
			await this.page
				.locator('#availableTrainingHoursPerDay')
				.inputValue()
		).toBe(trainingHours.toString())
		expect(await this.page.locator('#weight').inputValue()).toBe(
			weight.toString()
		)
		expect(await this.page.locator('#height').inputValue()).toBe(
			height.toString()
		)
	}
}
