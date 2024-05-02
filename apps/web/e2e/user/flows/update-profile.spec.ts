import { test, expect } from '@playwright/test'
import { LoginUserPage } from './../objects/login'
import { faker } from '@faker-js/faker'
import { RegisterUserPage } from '../objects/register'

test.describe('[User] Update profile', () => {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password({
			length: 10,
			memorable: true,
			prefix: '!0aA'
		}),
		name: faker.name.firstName(),
		lastName: faker.name.lastName()
	}

	test('should be no login, because the user is not register', async ({
		page,
		baseURL
	}) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		await loginUserPage.goto()
		await loginUserPage.loginErrorUser()
	})

	test('should be register user', async ({ page, baseURL }) => {
		const registerUserPage = new RegisterUserPage(page, baseURL)

		await registerUserPage.goto()

		await registerUserPage.getAndFillEmail(user.email)
		await registerUserPage.getAndFillPassword(user.password)
		await registerUserPage.showPassword()
		await registerUserPage.getAndFillName(user.name)
		await registerUserPage.getAndFillLastName(user.lastName)
		await registerUserPage.clickSubmit()

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)

		await registerUserPage.getAndFillDocumentType('CC')
		await registerUserPage.getAndFillDocumentNumber(
			faker.number.bigInt({ min: 99999, max: 999999999 }).toString()
		)
		await registerUserPage.getAndFillGender('M')
		await registerUserPage.getAndFillBirthdate('08/23/1996')
		await registerUserPage.getAndFillLengthOfStay(
			faker.number.int({ min: 1, max: 10 })
		)

		await registerUserPage.getAndFillCountry()
		await registerUserPage.getAndFillCity()
		await registerUserPage.getAndFillCountryResidence()
		await registerUserPage.getAndFillCityResidence()

		await registerUserPage.clickSubmit()

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)
		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)

		const url = page.url()

		expect(url).toBe(`${baseURL}/home`)
	})
})
