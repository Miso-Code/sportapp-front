import { by, device, element, expect } from 'detox'
import { ProductCheckout } from 'e2e/utils/interfaces'
class ServicesAndProductsCheckoutScreen {
	private readonly screenScrollView = element(
		by.type('android.widget.ScrollView')
	)
	private readonly screenTitle
	private readonly productCard
	private readonly quantityInput
	private readonly cardNumberInput
	private readonly cardHolderInput
	private readonly expirationDateInput
	private readonly cvvInput
	private readonly adquireButton
	private readonly cancelButton

	constructor() {
		this.screenTitle = element(by.text('Otros Servicios'))
		this.productCard = element(by.id('productServiceCard'))
		this.quantityInput = element(by.id('quantity'))
		this.cardNumberInput = element(by.id('cardNumber'))
		this.cardHolderInput = element(by.id('cardHolder'))
		this.expirationDateInput = element(by.id('expirationDate'))
		this.cvvInput = element(by.id('cvv'))
		this.adquireButton = element(by.id('payButton'))
		this.cancelButton = element(by.id('cancelButton'))
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.productCard).toBeVisible()
		await this.screenScrollView.scroll(2000, 'down')
		await expect(this.quantityInput).toBeVisible()
		await expect(this.cardNumberInput).toBeVisible()
		await expect(this.cardHolderInput).toBeVisible()
		await expect(this.expirationDateInput).toBeVisible()
		await expect(this.cvvInput).toBeVisible()
		await expect(this.adquireButton).toBeVisible()
		await expect(this.cancelButton).toBeVisible()
		await this.screenScrollView.scroll(2000, 'up', 0.5, 0.5)
	}

	async buyProduct(checkoutData: ProductCheckout) {
		await this.screenScrollView.scroll(2000, 'down')
		await expect(this.quantityInput).toHaveText(
			checkoutData.quantity.toString()
		)

		await this.cardNumberInput.typeText(checkoutData.card.number)
		await this.cardHolderInput.typeText(checkoutData.card.cardHolder)
		await device.pressBack()
		await this.expirationDateInput.typeText(
			`${checkoutData.card.expMonth}${checkoutData.card.expYear}`
		)
		await device.pressBack()
		await this.cvvInput.typeText(checkoutData.card.cvv)
		await device.pressBack()

		await this.adquireButton.tap()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default ServicesAndProductsCheckoutScreen
