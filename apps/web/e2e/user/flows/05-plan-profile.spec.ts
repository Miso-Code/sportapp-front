import { expect, test } from '@playwright/test'
import { generateJsonFile } from '../../utils'
import { HomeUserPersonalDataPage } from '../objects/home/personal-data'
import { HomeUserPlanDataPage } from '../objects/home/plan-data'
import { LoginUserPage } from '../objects/login'
import { createUser, generateUser, validCard } from '../utils/user'

test.describe('[User] Plan profile', () => {
	const user = generateUser()

	test.afterAll(async ({ browserName }, { title }) =>
		generateJsonFile(user, {
			browserName,
			title,
			flowName: 'user-plan-profile'
		})
	)

	test('should be register user', async ({ page, baseURL }) => {
		const homeUserPersonalDataPage = new HomeUserPersonalDataPage(
			page,
			baseURL
		)

		await createUser(user, page, baseURL as string)

		await page.waitForResponse(
			(response) =>
				response.url().includes('users/profiles/personal') &&
				response.status().toString().startsWith('2')
		)

		await page.waitForResponse(
			(response) =>
				response.url().includes('users/profiles/sports') &&
				response.status().toString().startsWith('2')
		)

		await page.waitForResponse(
			(response) =>
				response.url().includes('users/profiles/nutritional') &&
				response.status().toString().startsWith('2')
		)

		const url = page.url()

		expect(url).toBe(`${baseURL}/home`)

		await homeUserPersonalDataPage.validateUserSession({
			email: user.email,
			name: user.name + ' ' + user.lastName
		})

		await homeUserPersonalDataPage.gotoPersonalData()

		await homeUserPersonalDataPage.verifyPersonalData({
			name: user.name,
			lastName: user.lastName,
			documentType: user.documentType,
			documentNumber: user.documentNumber.toString(),
			country: user.country,
			city: user.city,
			countryResidence: user.countryResidence,
			cityResidence: user.cityResidence,
			lengthOfStay: user.lengthOfStay,
			email: user.email.toLowerCase(),
			birdate: user.birthDate,
			gender: user.gender
		})
	})

	test('should be validate plan free in profile', async ({
		page,
		baseURL
	}) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		const homeUserPlanDataPage = new HomeUserPlanDataPage(page, baseURL)
		await loginUserPage.goto()

		await page.waitForTimeout(1000)

		await loginUserPage.loginCustomUser({
			email: user.email,
			password: user.password
		})

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)
		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('users/profiles/personal')
		)
		await page.waitForTimeout(1000)
		expect(await page.url()).toBe(`${baseURL}/home`)

		await homeUserPlanDataPage.gotoPlanData()
		await homeUserPlanDataPage.validateUserPlanData('PLAN_FREE')
		await homeUserPlanDataPage.isVisiblePreferentialButton(false)
	})

	test('should be change plan in profile for premium', async ({
		page,
		baseURL
	}) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		const homeUserPlanDataPage = new HomeUserPlanDataPage(page, baseURL)
		await loginUserPage.goto()

		await page.waitForTimeout(1000)

		await loginUserPage.loginCustomUser({
			email: user.email,
			password: user.password
		})

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)
		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('users/profiles/personal')
		)
		await page.waitForTimeout(1000)
		expect(await page.url()).toBe(`${baseURL}/home`)

		await homeUserPlanDataPage.gotoPlanData()
		await homeUserPlanDataPage.selectPlan('Plan PremiumIdeal para')
		await homeUserPlanDataPage.goToPayment()
		const card = validCard
		await homeUserPlanDataPage.getAndFillCardNumber(card.number)
		await homeUserPlanDataPage.getAndFillCardName(card.cardHolder)
		await homeUserPlanDataPage.getAndFillCardDate(
			card.expMonth + card.expYear
		)
		await homeUserPlanDataPage.getAndFillCardCvv(card.cvv)
		await homeUserPlanDataPage.goToPayPlan()

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)
		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)
		await page.waitForTimeout(1000)

		await homeUserPlanDataPage.validateUserPlanData('PLAN_PREMIUM')
	})

	test('should be validate plan premium in profile', async ({
		page,
		baseURL
	}) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		const homeUserPlanDataPage = new HomeUserPlanDataPage(page, baseURL)
		await loginUserPage.goto()

		await page.waitForTimeout(1000)

		await loginUserPage.loginCustomUser({
			email: user.email,
			password: user.password
		})

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)
		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('users/profiles/personal')
		)
		await page.waitForTimeout(1000)
		expect(await page.url()).toBe(`${baseURL}/home`)

		await homeUserPlanDataPage.gotoPlanData()
		await homeUserPlanDataPage.validateUserPlanData('PLAN_PREMIUM')
		await homeUserPlanDataPage.isVisiblePreferentialButton()
		// await page.getByText('Pago realizado con éxito y')
		await expect(
			await page.getByText('Pago realizado con éxito y')
		).toBeTruthy()
	})
})
