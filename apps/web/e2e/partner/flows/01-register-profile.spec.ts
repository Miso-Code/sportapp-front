import { expect, test } from '@playwright/test'
import { generateJsonFile } from '../../utils'
import { LoginPartnerPage } from '../objects/login'
import { createPartner, generatePartner } from '../utils/partner'

test.describe('[Partner] Register Profile Flow', () => {
	const partner = generatePartner()

	test.afterAll(async ({ browserName }, { title }) =>
		generateJsonFile(partner, {
			browserName,
			title,
			flowName: 'register-profile'
		})
	)

	test('should be not login partner', async ({ page, baseURL }) => {
		const loginPartnerPage = new LoginPartnerPage(page, baseURL)
		await loginPartnerPage.goto()
		await loginPartnerPage.loginErrorPartner({
			email: partner.email,
			password: partner.password
		})
	})

	test('should be register partner', async ({ page, baseURL }) => {
		await createPartner(partner, page, baseURL as string)
		expect(page.url()).toBe(`${baseURL}/partner/home`)

		expect(page.getByText('No hay productos')).toBeTruthy()
	})
})
