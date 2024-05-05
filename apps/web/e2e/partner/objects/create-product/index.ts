import { type Page } from '@playwright/test'
import { productCategory, ProductCategoryKey } from './interface'

export class CreteProductPartnerPage {
	readonly page: Page
	readonly homePath: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.homePath = `${pathBaseURL}/partner/product/create`
	}

	async goto() {
		await this.page.goto(this.homePath)
	}

	async getAndFillProductCategory(productCategoryProp: ProductCategoryKey) {
		await this.page.getByLabel('Categoría de producto').click()
		await this.page
			.getByRole('option', { name: productCategory[productCategoryProp] })
			.click()
	}

	async getAndFillProductName(productName: string) {
		await this.page.locator('#name').fill(productName)
	}

	async getAndFillProductUrl(productUrl: string) {
		await this.page.locator('#url').fill(productUrl)
	}

	async getAndFillProductPrice(productPrice: number) {
		await this.page.locator('#price').fill(productPrice.toString())
	}

	async getAndFillProductPaymentType(
		productPaymentType: 'Pago único' | 'Pago periódico'
	) {
		await this.page.getByLabel('Tipo de pago').click()
		await this.page
			.getByRole('option', { name: productPaymentType })
			.click()
	}

	async getAndFillProductMediaShow(type: 'URL' | 'Archivo') {
		await this.page.getByLabel(type).check()
	}

	async getAndFillProductImageUrl(productImageUrl: string) {
		await this.page.locator('#imageUrl').fill(productImageUrl)
	}

	async getAndFillProductSummary(productSummary: string) {
		await this.page.locator('#summary').fill(productSummary)
	}

	async getAndFillProductDescription(productDescription: string) {
		await this.page.locator('textarea').click()
		await this.page.locator('textarea').fill(productDescription)
	}

	async clickSubmit() {
		await this.page.locator('button[type="submit"]').click()
	}
}
