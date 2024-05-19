import {
	User,
	SportData,
	NutritionalData,
	TrainingSession,
	Product,
	BusinessPartner,
	ProductCheckout
} from './interfaces'
import { faker } from '@faker-js/faker'
import { countries, getCitiesOfCountry } from '../../src/utils/countries'

export const generateUser = (): User => {
	const countryOfBirth = faker.helpers.arrayElement(countries)
	const countryOfResidence = faker.helpers.arrayElement(countries)
	const citiesOfCountryOfBirth = getCitiesOfCountry(countryOfBirth.value)
	const citiescountryOfResidence = getCitiesOfCountry(
		countryOfResidence.value
	)
	const cityOfBirth = faker.helpers.arrayElement(
		citiesOfCountryOfBirth.length ? citiesOfCountryOfBirth : [undefined]
	)
	const cityOfResidence = faker.helpers.arrayElement(
		citiescountryOfResidence.length ? citiescountryOfResidence : [undefined]
	)

	const first_name = faker.person.firstName()
	const last_name = faker.person.lastName()

	return {
		email: faker.internet
			.email({
				firstName: first_name,
				lastName: last_name
			})
			.toLowerCase(),
		password: faker.internet.password({
			length: faker.number.int({ min: 8, max: 20 }),
			prefix:
				faker.helpers.arrayElement(['!', '@', '#', '$']) +
				faker.number.int({ min: 0, max: 100 })
		}),
		first_name: first_name,
		last_name: last_name,
		identification_type: faker.helpers.arrayElement(['CC', 'CE', 'PA']),
		identification_number: new Date().getTime().toString(),
		country_of_birth: countryOfBirth.value,
		city_of_birth: cityOfBirth?.value ?? '',
		country_of_residence: countryOfResidence.value,
		city_of_residence: cityOfResidence?.value ?? '',
		residence_age: faker.number.int({ max: 100 }),
		birth_date: faker.date.past().toISOString(),
		gender: faker.person.sex().toUpperCase()[0] as 'M' | 'F' | 'O'
	}
}

export const generateSportData = (): SportData => {
	const prependZeroIfNeeded = (number) => (number < 10 ? '0' : '') + number
	const weight = faker.number.int({ min: 40, max: 120 })
	const height = parseFloat(
		faker.number.float({ min: 1.5, max: 2.0 }).toFixed(2)
	)
	return {
		favourite_sport: faker.helpers.arrayElement(['Ciclismo', 'Atletismo']),
		training_objective: faker.helpers.arrayElement([
			'Aumento de masa muscular',
			'Pérdida de peso',
			'Tonificación',
			'Mantener la forma física'
		]),
		days_of_week: faker.helpers.arrayElements([
			'monday',
			'tuesday',
			'wednesday',
			'thursday',
			'friday',
			'saturday',
			'sunday'
		]),
		preferred_training_start_time: `${prependZeroIfNeeded(
			faker.number.int({
				min: 0,
				max: 12
			})
		)}:${prependZeroIfNeeded(
			faker.number.int({
				min: 0,
				max: 59
			})
		)} ${faker.helpers.arrayElement(['AM', 'PM'])}`,
		available_training_hours: faker.number.int({
			min: 1,
			max: 4
		}),
		weight: weight,
		height: height,
		bmi: parseFloat((weight / height ** 2).toFixed(2)),
		limitations: Array.from({
			length: faker.number.int({ min: 0, max: 3 })
		}).map(() => ({
			name: faker.lorem.words(faker.number.int({ min: 1, max: 3 })),
			description: faker.lorem.sentence()
		}))
	}
}

export const generateNutritionalData = (): NutritionalData => {
	return {
		nutritional_limitations: faker.helpers.arrayElements([
			'gluten',
			'lactose',
			'nuts',
			'seafood',
			'sugar'
		]),
		food_preference: faker.helpers.arrayElement([
			'vegetarian',
			'vegan',
			'all'
		])
	}
}

export const generateTrainingSession = (): TrainingSession => {
	return {
		duration: faker.number.int({ min: 3, max: 7 })
	}
}

export const generateBusinessPartner = (): BusinessPartner => {
	const company = faker.company.name()
	return {
		email: faker.internet
			.email({
				provider: `${company.replace(/\s/g, '')}.com`.toLowerCase()
			})
			.toLowerCase(),
		password: faker.internet.password({
			length: faker.number.int({ min: 8, max: 20 }),
			prefix:
				faker.helpers.arrayElement(['!', '@', '#', '$']) +
				faker.number.int({ min: 0, max: 100 })
		}),
		business_partner_name: company
	}
}

export const generateProduct = (): Product => {
	return {
		category: faker.helpers.arrayElement([
			'equipement',
			'apparel',
			'nutrition',
			'training_services',
			'wellness',
			'sports_technology',
			'medical_services'
		]),
		name: faker.commerce.productName(),
		summary: faker.lorem.sentence(),
		url: faker.internet.url(),
		price: parseFloat(faker.commerce.price()),
		payment_type: faker.helpers.arrayElement(['unique', 'periodic']),
		payment_frequency: faker.helpers.arrayElement([
			'weekly',
			'monthly',
			'annually',
			'bi_annually',
			'quarterly',
			'other'
		]),
		image_url: faker.image.url({
			height: 500,
			width: 500
		}),
		description: faker.lorem.paragraph()
	}
}

export const validCard = {
	cardHolder: 'John Doe',
	number: '1234567890123456',
	expMonth: '12',
	expYear: '25',
	cvv: '123'
}

export const generateProductCheckout = (): ProductCheckout => {
	return {
		quantity: faker.number.int({ min: 1, max: 10 }),
		card: validCard
	}
}
