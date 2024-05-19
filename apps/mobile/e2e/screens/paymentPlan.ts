import { element, by, expect, waitFor, device } from 'detox'
import { CreditCard } from 'e2e/utils/interfaces'

class PaymentPlanScreen {
	private readonly screenScrollView = element(
		by.type('android.widget.ScrollView')
	)
	private readonly screenTitle
	private readonly freePlanCard
	private readonly intermediatePlanCard
	private readonly premiumPlanCard

	constructor() {
		this.screenTitle = element(by.text('Planes de pago')).atIndex(0)
		this.freePlanCard = element(
			by.id('planCard').withDescendant(by.text('Plan Gratuito'))
		)
		this.intermediatePlanCard = element(
			by.id('planCard').withDescendant(by.text('Plan Intermedio'))
		)
		this.premiumPlanCard = element(
			by.id('planCard').withDescendant(by.text('Plan Premium'))
		)
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.freePlanCard).toBeVisible()
		await this.screenScrollView.scroll(500, 'down')
		await expect(this.intermediatePlanCard).toBeVisible()
		await this.screenScrollView.scroll(500, 'down')
		await expect(this.premiumPlanCard).toBeVisible()
		await this.screenScrollView.scroll(1000, 'up', 0.5, 0.5)
	}

	async selectFreePlan() {
		await waitFor(this.freePlanCard)
			.toBeVisible()
			.whileElement(by.type('android.widget.ScrollView'))
			.scroll(500, 'down')
		await this.freePlanCard.tap()
	}

	async selectIntermediatePlan() {
		await waitFor(this.intermediatePlanCard)
			.toBeVisible()
			.whileElement(by.type('android.widget.ScrollView'))
			.scroll(500, 'down')
		await this.intermediatePlanCard.tap()
	}

	async selectPremiumPlan() {
		await waitFor(this.premiumPlanCard)
			.toBeVisible()
			.whileElement(by.type('android.widget.ScrollView'))
			.scroll(500, 'down')
		await this.premiumPlanCard.tap()
	}

	async processPayment(creditCard: CreditCard) {
		await element(by.id('cardNumber')).typeText(creditCard.number)
		await device.pressBack()
		await element(by.id('cardHolder')).typeText(creditCard.cardHolder)
		await device.pressBack()
		await element(by.id('expirationDate')).typeText(
			`${creditCard.expMonth}${creditCard.expYear}`
		)
		await device.pressBack()
		await element(by.id('cvv')).typeText(creditCard.cvv)
		await device.pressBack()
		await element(by.id('acceptButton')).tap()
	}

	async acceptFreePlan() {
		await element(by.id('acceptButton')).tap()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default PaymentPlanScreen
