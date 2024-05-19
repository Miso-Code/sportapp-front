import { type Page } from '@playwright/test'
import {
	getAndFillCardCvv,
	getAndFillCardDate,
	getAndFillCardName,
	getAndFillCardNumber,
	goToPayPlan
} from '../../utils/user'

export class OtherServiceUserPage {
	readonly page: Page
	readonly otherServicePage: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.otherServicePage = `${pathBaseURL}/other-services`
	}

	async goto() {
		await this.page.goto(this.otherServicePage)
	}

	async goToPageWithNavbar() {
		await this.page.getByRole('button', { name: 'Otros servicios' }).click()
	}

	async searchProduct(product: string) {
		await this.page.getByPlaceholder('Buscar').click()
		await this.page.getByPlaceholder('Buscar').fill(product)
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

	async selectProduct() {
		const card = await this.page.locator('.other-service-page-card').first()
		await card.click()
	}

	async obtainProduct() {
		await this.page.getByRole('button', { name: 'Adquirir' }).click()
	}
}
