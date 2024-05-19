import { faker } from '@faker-js/faker'
import { Page } from '@playwright/test'
import { allergyType, preferenceType } from '../objects/home/interface'
import { RegisterUserPage } from '../objects/register'
import { DocumentTypeKey, GenderTypeKey } from '../objects/register/interfaces'
import { User } from './interfaces'

export const generateUser = () => ({
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
})

export const createUser = async (user: User, page: Page, baseURL: string) => {
	const registerUserPage = new RegisterUserPage(page, baseURL)

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

	await registerUserPage.getAndFillDocumentType(
		user.documentType as DocumentTypeKey
	)
	await registerUserPage.getAndFillDocumentNumber(
		user.documentNumber.toString()
	)
	await registerUserPage.getAndFillGender(user.gender as GenderTypeKey)
	await registerUserPage.getAndFillBirthdate(user.birthDate)
	await registerUserPage.getAndFillLengthOfStay(user.lengthOfStay)

	await registerUserPage.getAndFillCountry()
	await registerUserPage.getAndFillCity()
	await registerUserPage.getAndFillCountryResidence()
	await registerUserPage.getAndFillCityResidence()

	await registerUserPage.clickSubmit()
}

export const validCard = {
	cardHolder: 'John Doe',
	number: '1234567890123456',
	expMonth: '12',
	expYear: '25',
	cvv: '123'
}

export const getAndFillCardNumber = async (cardNumber: string, page: Page) => {
	await page.locator('#number').click()
	await page.locator('#number').fill(cardNumber)
}

export const getAndFillCardName = async (cardName: string, page: Page) => {
	await page.locator('#name').click()
	await page.locator('#name').fill(cardName)
}

export const getAndFillCardDate = async (cardDate: string, page: Page) => {
	await page.locator('#expiry').click()
	await page.locator('#expiry').fill(cardDate)
}

export const getAndFillCardCvv = async (cardCvv: string, page: Page) => {
	await page.locator('#cvc').click()
	await page.locator('#cvc').fill(cardCvv)
}

export const goToPayPlan = async (page: Page) => {
	await page.getByRole('button', { name: 'Pagar' }).click()
}
