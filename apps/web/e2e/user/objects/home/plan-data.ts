import { Page, expect } from '@playwright/test'
import { PlanTypeKey, Plans } from './interface'
import {
	getAndFillCardCvv,
	getAndFillCardDate,
	getAndFillCardName,
	getAndFillCardNumber,
	goToPayPlan
} from '../../utils/user'

export class HomeUserPlanDataPage {
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

	async gotoPlanData() {
		await this.page.getByRole('button', { name: 'Planes de pago' }).click()
	}

	async validateUserPlanData(plan: PlanTypeKey) {
		const activeChip = await this.page
			.getByTestId(Plans[plan as PlanTypeKey])
			.getByText('Activo')
			.textContent()

		await expect(activeChip).toBe('Activo')
	}

	async selectPlan(type: string) {
		await this.page.getByText(type).click()
	}

	async goToPayment() {
		this.page
			.getByRole('button', { name: 'Estoy de acuerdo', exact: true })
			.click()
	}

	async getAndFillCardNumber(cardNumber: string) {
		await getAndFillCardNumber(cardNumber, this.page)
	}

	async getAndFillCardName(cardName: string) {
		await getAndFillCardName(cardName, this.page)
	}

	async getAndFillCardDate(cardDate: string) {
		await getAndFillCardDate(cardDate, this.page)
	}

	async getAndFillCardCvv(cardCvv: string) {
		await getAndFillCardCvv(cardCvv, this.page)
	}

	async goToPayPlan() {
		await goToPayPlan(this.page)
	}

	async isVisiblePreferentialButton(isVisible = true) {
		if (!isVisible) {
			await expect(
				await this.page
					.getByRole('button', { name: 'Preferenciales' })
					.isVisible()
			).toBeFalsy()
			return
		}

		await expect(
			await this.page
				.getByRole('button', { name: 'Preferenciales' })
				.isVisible()
		).toBeTruthy()
	}
}
