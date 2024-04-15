import { Country, City } from 'country-state-city'

export const getCountryNameByCode = (countryCode: string) => {
	const country = Country.getCountryByCode(countryCode)
	return country ? country.name : undefined
}

export const getCountries = Country.getAllCountries().map((country) => ({
	label: country.name,
	value: country.isoCode
}))

export const getCitiesOfCountry = (countryCode: string) => {
	const cities = City.getCitiesOfCountry(countryCode)
	return cities
		? cities.map((city) => ({
				label: city.name,
				value: city.name
			}))
		: []
}
