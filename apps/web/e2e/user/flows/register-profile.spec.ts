import { faker } from '@faker-js/faker'
import { expect, test } from '@playwright/test'
import { format } from 'date-fns'
import fs from 'node:fs'
import path from 'path'
import {
	FavoriteSportType,
	TrainingDays,
	TrainingObjective,
	allergyType,
	preferenceType
} from '../objects/home/interface'
import { HomeUserNutritionalDataPage } from '../objects/home/nutritional-data'
import { HomeUserPersonalDataPage } from '../objects/home/personal-data'
import { HomeUserSportDataPage } from '../objects/home/sport-data'
import { RegisterUserPage } from '../objects/register'
import { DocumentTypeKey, GenderTypeKey } from '../objects/register/interfaces'
import { LoginUserPage } from './../objects/login'

test.describe('[User] Register new user profile', () => {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password({
			length: 10,
			memorable: true,
			prefix: '!0aA'
		}),
		name: faker.person.firstName(),
		lastName: faker.person.lastName(),
		documentType: 'Cédula de ciudadanía' as DocumentTypeKey,
		documentNumber: faker.number
			.bigInt({ min: 99999, max: 999999999 })
			.toString(),
		birthDate: '08/23/1996',
		gender: 'Masculino' as GenderTypeKey,
		country: 'Colombia',
		city: 'Cali',
		countryResidence: 'Colombia',
		cityResidence: 'Cali',
		lengthOfStay: faker.number.int({ min: 1, max: 10 }),
		sport: {
			favoriteSport: 'Ciclismo',
			trainingObjective: 'Pérdida de peso',
			trainingDays: ['monday', 'wednesday', 'friday'],
			trainingHours: 2,
			weight: faker.number.int({ min: 50, max: 100 }),
			height: faker.number.int({ min: 1.5, max: 2 }),
			limitation: [
				{
					name: 'Rodilla',
					description: 'Lesión en la rodilla'
				}
			]
		},
		nutritional: {
			allergy: [allergyType.GLUTEN_FREE, allergyType.LACTOSE_FREE],
			preference: preferenceType.VEGETARIAN
		}
	}

	test.afterAll(async ({ browserName }, { title }) => {
		const data = JSON.stringify(user, null, 2)
		const date = format(new Date(), 'yyyy-MM-dd HH-mm-ss')
		const { pathname: root } = new URL('../files', import.meta.url)
		const file = path.join(
			root,
			`user-${date}-${browserName}_${title}.json`
		)
		fs.writeFileSync(file, data)
	})

	test('should be not login, because the user is not register', async ({
		page,
		baseURL
	}) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		await loginUserPage.goto()
		await page.waitForTimeout(1000)
		await loginUserPage.loginErrorUser()
	})

	test('should be register user', async ({ page, baseURL }) => {
		const registerUserPage = new RegisterUserPage(page, baseURL)
		const homeUserPersonalDataPage = new HomeUserPersonalDataPage(
			page,
			baseURL
		)

		await registerUserPage.goto()
		await page.waitForTimeout(1000)

		await registerUserPage.getAndFillEmail(user.email)
		await registerUserPage.getAndFillPassword(user.password)
		await registerUserPage.showPassword()
		await registerUserPage.getAndFillName(user.name)
		await registerUserPage.getAndFillLastName(user.lastName)
		await registerUserPage.clickSubmit()

		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)

		await registerUserPage.getAndFillDocumentType(user.documentType)
		await registerUserPage.getAndFillDocumentNumber(
			user.documentNumber.toString()
		)
		await registerUserPage.getAndFillGender(user.gender)
		await registerUserPage.getAndFillBirthdate(user.birthDate)
		await registerUserPage.getAndFillLengthOfStay(user.lengthOfStay)

		await registerUserPage.getAndFillCountry()
		await registerUserPage.getAndFillCity()
		await registerUserPage.getAndFillCountryResidence()
		await registerUserPage.getAndFillCityResidence()

		await registerUserPage.clickSubmit()

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

		await homeUserPersonalDataPage.gotoEditPersonalData()

		await homeUserPersonalDataPage.getAndFillNamePersonalData(
			user.name + '2'
		)

		await homeUserPersonalDataPage.getAndFillLastNamePersonalData(
			user.lastName + '2'
		)

		await homeUserPersonalDataPage.saveEditPersonalData()

		await page.waitForResponse((response) => {
			return (
				response.url().includes('profiles/personal') &&
				response.status().toString().startsWith('2')
			)
		})

		await homeUserPersonalDataPage.verifyPersonalData({
			name: user.name + '2',
			lastName: user.lastName + '2',
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

	test('should be login user', async ({ page, baseURL }) => {
		const homeUserPersonalDataPage = new HomeUserPersonalDataPage(
			page,
			baseURL
		)
		const loginUserPage = new LoginUserPage(page, baseURL)
		await loginUserPage.goto()
		await loginUserPage.loginCustomUser({
			email: user.email,
			password: user.password
		})

		await page.waitForResponse(
			(response) =>
				response.status().toString().startsWith('2') &&
				response.url().includes('users/login')
		)
		await page.waitForResponse((response) =>
			response.status().toString().startsWith('2')
		)
		await page.waitForTimeout(1000)
		expect(await page.url()).toBe(`${baseURL}/home`)
		await homeUserPersonalDataPage.validateUserSession({
			email: user.email,
			name: user.name + ' ' + user.lastName
		})
	})

	test('should be update profile sport', async ({ page, baseURL }) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		const homeUserSportDataPage = new HomeUserSportDataPage(page, baseURL)
		await loginUserPage.goto()
		await page.waitForTimeout(1000)
		/* await loginUserPage.loginCustomUser({
			email: 'jdoe@gmail.com',
			password: 'Test123!'
		}) */
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
		page.waitForTimeout(1000)
		expect(await page.url()).toBe(`${baseURL}/home`)

		await homeUserSportDataPage.gotoSportData()
		await homeUserSportDataPage.gotoEditSportData()

		await homeUserSportDataPage.getAndFillFavoriteSport(
			user.sport.favoriteSport as FavoriteSportType
		)
		await homeUserSportDataPage.getAndFillTrainingObjective(
			user.sport.trainingObjective as TrainingObjective
		)
		await homeUserSportDataPage.getAndFillTrainingDays(
			user.sport.trainingDays as TrainingDays[]
		)
		await homeUserSportDataPage.getAndFillTrainingHours()
		await homeUserSportDataPage.getAndFillAvailableTrainingHoursPerDay(
			user.sport.trainingHours
		)
		await homeUserSportDataPage.getAndFillWeight(user.sport.weight)
		await homeUserSportDataPage.getAndFillHeight(user.sport.height)
		user.sport.limitation.forEach(async () => {
			await page.waitForTimeout(100)
			await homeUserSportDataPage.addLimitation()
		})

		user.sport.limitation.forEach(async (limitation, index) => {
			await homeUserSportDataPage.getAndFillLimitationName(
				limitation.name,
				index
			)
			await homeUserSportDataPage.getAndFillLimitationDescription(
				limitation.description,
				index
			)
			await page.waitForTimeout(100)
		})
		await homeUserSportDataPage.saveEditSportData()

		await page.waitForResponse((response) => {
			return (
				response.url().includes('profiles/sports') &&
				response.status().toString().startsWith('2')
			)
		})
		await page.waitForResponse((response) => {
			return (
				response.url().includes('profiles/sports') &&
				response.status().toString().startsWith('2')
			)
		})

		await homeUserSportDataPage.verifySportData({
			favoriteSport: user.sport.favoriteSport as FavoriteSportType,
			trainingObjective: user.sport
				.trainingObjective as TrainingObjective,
			trainingDays: user.sport.trainingDays as TrainingDays[],
			trainingHours: user.sport.trainingHours,
			weight: user.sport.weight,
			height: user.sport.height
		})
	})

	test('should be update nutritional profile', async ({ page, baseURL }) => {
		const loginUserPage = new LoginUserPage(page, baseURL)
		const homeUserNutritionalDataPage = new HomeUserNutritionalDataPage(
			page,
			baseURL
		)
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
		page.waitForTimeout(1000)
		expect(await page.url()).toBe(`${baseURL}/home`)
		await homeUserNutritionalDataPage.gotoNutritionalData()
		await homeUserNutritionalDataPage.gotoEditNutritionalData()

		for (const allergy of user.nutritional.allergy) {
			await homeUserNutritionalDataPage.getAndFillAllergyNutritionalData(
				allergy
			)
		}
		await homeUserNutritionalDataPage.getAndFillPreferenceNutritionalData(
			user.nutritional.preference
		)
		await homeUserNutritionalDataPage.saveNutritionalData()

		await page.waitForResponse((response) => {
			return (
				response.url().includes('profiles/nutritional') &&
				response.status().toString().startsWith('2')
			)
		})

		await homeUserNutritionalDataPage.verifyNutritionalData({
			allergy: user.nutritional.allergy,
			preference: user.nutritional.preference
		})
	})
})
