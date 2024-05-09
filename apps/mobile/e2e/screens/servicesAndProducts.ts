import { by, element, expect } from 'detox'
import { Product } from 'e2e/utils/interfaces'
import { extractSearchableString } from '../utils/search'
class ServicesAndProductsScreen {
	private readonly screenScrollView = element(
		by.type('android.widget.ScrollView')
	)
	private readonly screenTitle
	private readonly search
	private readonly goUpButton

	constructor() {
		this.screenTitle = element(by.text('Otros Servicios'))
		this.search = element(by.id('search'))
		this.goUpButton = element(by.id('fabScrollUp'))
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.search).toBeVisible()
		await expect(this.goUpButton).toBeVisible()
		await expect(element(by.id('productCard')).atIndex(0)).toBeVisible()
		await this.screenScrollView.scroll(2000, 'down')
		await this.goUpButton.tap()
	}

	async selectProduct(product: Product) {
		await this.search.replaceText(extractSearchableString(product.name))

		const productCard = element(
			by.id('productCard').withDescendant(by.text(product.name))
		)
		await productCard.tap()
	}

	async closeModal() {
		await element(by.id('cancelButton')).tap()
	}

	async adquireProduct(amount: number) {
		await element(by.id('quantity')).replaceText(amount.toString())
		await element(by.id('adquireButton')).tap()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default ServicesAndProductsScreen
