import {
	getCitiesOfCountry,
	getCountries,
	getCountryNameByCode
} from '../countries'

jest.mock('country-state-city', () => ({
	Country: {
		getCountryByCode: jest.fn((code) => {
			if (code === 'CO') {
				return { name: 'Colombia' }
			}
		}),
		getAllCountries: jest.fn(() => [
			{ name: 'Colombia', isoCode: 'CO' },
			{ name: 'United States', isoCode: 'US' }
		])
	},
	City: {
		getCitiesOfCountry: jest.fn((countryCode) => {
			if (countryCode === 'CO') {
				return [{ name: 'Medellín' }, { name: 'Bogotá' }]
			}
		})
	}
}))

describe('countries', () => {
	describe('getCountryNameByCode', () => {
		it('should return the country name', () => {
			expect(getCountryNameByCode('CO')).toEqual('Colombia')
		})

		it('should return undefined if the country code is not found', () => {
			expect(getCountryNameByCode('XX')).toBeUndefined()
		})
	})

	describe('getCountries', () => {
		it('should return an array of countries', () => {
			expect(getCountries).toEqual([
				{ label: 'Colombia', value: 'CO' },
				{ label: 'United States', value: 'US' }
			])
		})
	})

	describe('getCitiesOfCountry', () => {
		it('should return an array of cities', () => {
			expect(getCitiesOfCountry('CO')).toEqual([
				{ label: 'Medellín', value: 'Medellín' },
				{ label: 'Bogotá', value: 'Bogotá' }
			])
		})

		it('should return an empty array if the country code is not found', () => {
			expect(getCitiesOfCountry('XX')).toEqual([])
		})
	})
})
