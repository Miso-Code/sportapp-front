import { expect, test } from '@playwright/test'
import { generateJsonFile } from '../../utils'
import { HomeUserPersonalDataPage } from '../objects/home/personal-data'
import { LoginUserPage } from '../objects/login'
import { OtherServiceUserPage } from '../objects/otherService'
import { createUser, generateUser, validCard } from '../utils/user'

test.describe('[User] Other service', () => {
	const user = generateUser()

	test.afterAll(async ({ browserName }, { title }) =>
		generateJsonFile(user, {
			browserName,
			title,
			flowName: 'user-other-service'
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

	test('should be obtain service', async ({ page, baseURL }) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		const otherServiceUserPage = new OtherServiceUserPage(page, baseURL)
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

		await otherServiceUserPage.goToPageWithNavbar()

		expect(await page.url()).toBe(`${baseURL}/other-services`)

		await otherServiceUserPage.selectProduct()

		await otherServiceUserPage.obtainProduct()

		await page.waitForTimeout(100)

		await otherServiceUserPage.getAndFillCardNumber(validCard.number)
		await otherServiceUserPage.getAndFillCardName(validCard.cardHolder)
		await otherServiceUserPage.getAndFillCardDate(
			`${validCard.expMonth}/${validCard.expYear}`
		)
		await otherServiceUserPage.getAndFillCardCvv(validCard.cvv)

		await otherServiceUserPage.goToPayPlan()

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)

		expect(
			await page.url().includes(`${baseURL}/other-services`)
		).toBeTruthy()
	})
})
