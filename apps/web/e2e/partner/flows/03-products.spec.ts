import { expect, test } from '@playwright/test'
import { generateJsonFile } from '../../utils'
import { HomePartnerPage } from '../objects/home'
import { LoginPartnerPage } from '../objects/login'
import { createPartner, createProduct, generatePartner } from '../utils/partner'

test.describe('[Partner] Products Flow', () => {
	const partner = generatePartner()

	test.afterAll(async ({ browserName }, { title }) =>
		generateJsonFile(partner, {
			browserName,
			title,
			flowName: 'partner-create-product'
		})
	)

	test('Generate partner', async ({ baseURL, page }) => {
		await createPartner(partner, page, baseURL as string)
	})

	test('should be create Product', async ({ page, baseURL }) => {
		const loginPartnerPage = new LoginPartnerPage(page, baseURL)
		const homePartnerPage = new HomePartnerPage(page, baseURL)

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

		await createProduct(partner, page, baseURL as string)

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
		expect(page.getByText(partner.products[0].name)).toBeTruthy()
		expect(page.getByText(partner.products[0].summary)).toBeTruthy()
	})

	test('should be not create Product', async ({ page, baseURL }) => {
		const loginPartnerPage = new LoginPartnerPage(page, baseURL)
		const homePartnerPage = new HomePartnerPage(page, baseURL)

		const auxPartner = JSON.parse(JSON.stringify(partner))
		auxPartner.products[0].url = 'url'

		await loginPartnerPage.goto()
		await loginPartnerPage.loginCustomPartner({
			email: auxPartner.email,
			password: auxPartner.password
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

		await createProduct(auxPartner, page, baseURL as string, true)

		await expect(await page.locator('button[type="submit"]')).toBeDisabled()
	})
})
