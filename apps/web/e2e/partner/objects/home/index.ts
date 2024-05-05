import { type Page } from '@playwright/test'

export class HomePartnerPage {
	readonly page: Page
	readonly homePath: string
	readonly pathBaseURL: string

	constructor(page: Page, pathBaseURL: string = 'http://localhost:5173') {
		this.page = page
		this.pathBaseURL = pathBaseURL
		this.homePath = `${pathBaseURL}/partner/home`
	}

	async goto() {
		await this.page.goto(this.homePath)
	}

	async goToCreateProduct() {
		await this.page.getByRole('button', { name: 'Crear Producto' }).click()
	}

	async goToShowBoughtProducts() {
		await this.page
			.getByRole('button', { name: 'Productos Comprados' })
			.click()
	}

	async openProfileMenu() {
		await this.page.getByLabel('navbar.open.profile').click()
	}

	async logout() {
		await this.page.getByRole('menuitem', { name: 'Cerrar sesión' }).click()
	}
}
