import { Page } from '@playwright/test'
import { LoginPartnerPage } from '../objects/login'
import { Partner } from './interfaces'
import { RegisterPartnerPage } from '../objects/register'
import { faker } from '@faker-js/faker'
import { CreteProductPartnerPage } from '../objects/create-product'
import {
	ProductCategoryKey,
	ProductSportsKey
} from '../objects/create-product/interface'

export const generatePartner = (): Partner => ({
	email: faker.internet.email(),
	password: faker.internet.password({
		length: 10,
		memorable: true,
		prefix: '!0aA'
	}),
	companyName: faker.company.name(),
	products: [
		{
			category: 'equipment',
			name: faker.commerce.productName(),
			url: faker.internet.url(),
			price: faker.commerce.price(),
			paymentType: 'Pago único',
			mediaShow: 'URL',
			imageUrl: faker.image.url(),
			summary: faker.lorem.sentence(),
			description: faker.lorem.sentence(),
			sport: 'CYCLING'
		}
	]
})

export const createPartner = async (
	partner: Partner,
	page: Page,
	baseURL: string
) => {
	const loginPartnerPage = new LoginPartnerPage(page, baseURL)
	const registerPartnerPage = new RegisterPartnerPage(page, baseURL)
	await loginPartnerPage.goto()
	await loginPartnerPage.goToRegisterPage()
	await registerPartnerPage.getAndFillCompanyName(partner.companyName)
	await registerPartnerPage.getAndFillEmail(partner.email)
	await registerPartnerPage.getAndFillPassword(partner.password)
	await registerPartnerPage.showPassword()
	await registerPartnerPage.clickSubmit()
	await page.waitForResponse(
		(response) =>
			response.status().toString().startsWith('2') &&
			response.url().includes('business-partners/registration')
	)
	await page.waitForResponse(
		(response) =>
			response.status().toString().startsWith('2') &&
			response.url().includes('business-partners/login')
	)
	await page.waitForResponse(
		(response) =>
			response.status().toString().startsWith('2') &&
			response.url().includes('products')
	)
}

export const createProduct = async (
	partner: Partner,
	page: Page,
	baseURL: string,
	isError: boolean = false
) => {
	const creteProductPartnerPage = new CreteProductPartnerPage(page, baseURL)
	await creteProductPartnerPage.getAndFillProductSport(
		partner.products[0].sport as ProductSportsKey
	)

	await creteProductPartnerPage.getAndFillProductCategory(
		partner.products[0].category as ProductCategoryKey
	)

	await creteProductPartnerPage.getAndFillProductName(
		partner.products[0].name
	)

	await creteProductPartnerPage.getAndFillProductUrl(partner.products[0].url)

	await creteProductPartnerPage.getAndFillProductPrice(
		Number(partner.products[0].price)
	)

	await creteProductPartnerPage.getAndFillProductPaymentType(
		partner.products[0].paymentType as 'Pago único' | 'Pago periódico'
	)

	await creteProductPartnerPage.getAndFillProductMediaShow(
		partner.products[0].mediaShow as 'URL' | 'Archivo'
	)

	await creteProductPartnerPage.getAndFillProductImageUrl(
		partner.products[0].imageUrl
	)

	await creteProductPartnerPage.getAndFillProductSummary(
		partner.products[0].summary
	)

	await creteProductPartnerPage.getAndFillProductDescription(
		partner.products[0].description
	)

	await page.waitForTimeout(3000)

	if (!isError) await creteProductPartnerPage.clickSubmit()
}
