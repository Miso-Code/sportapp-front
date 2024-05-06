import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'
import { LoginPartnerPage } from '../objects/login'
import { format } from 'date-fns'
import fs from 'node:fs'
import path from 'path'
import { RegisterPartnerPage } from '../objects/register'
import { HomePartnerPage } from '../objects/home'
import { CreteProductPartnerPage } from '../objects/create-product'
import { ProductCategoryKey } from '../objects/create-product/interface'

test.describe('[Partner] Register Profile Flow', () => {
	const partner = {
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
				description: faker.lorem.sentence()
			}
		]
	}

	test.afterAll(async ({ browserName }, { title }) => {
		const data = JSON.stringify(partner, null, 2)
		const date = format(new Date(), 'yyyy-MM-dd HH-mm-ss')
		const { pathname: root } = new URL('../files', import.meta.url)
		const file = path.join(
			root,
			`partner-${date}-${browserName}_${title}.json`
		)
		fs.writeFileSync(file, data, { mode: 0o600 })
	})

	test('should be not login partner', async ({ page, baseURL }) => {
		const loginPartnerPage = new LoginPartnerPage(page, baseURL)
		await loginPartnerPage.goto()
		await loginPartnerPage.loginErrorPartner({
			email: partner.email,
			password: partner.password
		})
	})

	test('should be register partner', async ({ page, baseURL }) => {
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
		expect(page.url()).toBe(`${baseURL}/partner/home`)

		expect(page.getByText('No hay productos')).toBeTruthy()
	})

	test('should be create Product', async ({ page, baseURL }) => {
		const loginPartnerPage = new LoginPartnerPage(page, baseURL)
		const homePartnerPage = new HomePartnerPage(page, baseURL)
		const creteProductPartnerPage = new CreteProductPartnerPage(
			page,
			baseURL
		)
		await loginPartnerPage.goto()
		await loginPartnerPage.loginCustomPartner({
			email: partner.email,
			password: partner.password
		})
		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('login')
		)
		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('products')
		)
		expect(page.url()).toBe(`${baseURL}/partner/home`)
		await homePartnerPage.goToCreateProduct()

		await creteProductPartnerPage.getAndFillProductCategory(
			partner.products[0].category as ProductCategoryKey
		)

		await creteProductPartnerPage.getAndFillProductName(
			partner.products[0].name
		)

		await creteProductPartnerPage.getAndFillProductUrl(
			partner.products[0].url
		)

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

		await creteProductPartnerPage.clickSubmit()

		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('business-partners/products')
		)
		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('products')
		)

		expect(page.url()).toBe(`${baseURL}/partner/home`)
		// page.getByRole('heading', { name: partner.companyName })
		expect(page.getByText(partner.products[0].name)).toBeTruthy()
		expect(page.getByText(partner.products[0].summary)).toBeTruthy()
	})
})
