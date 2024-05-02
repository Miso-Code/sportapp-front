import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import PersonalProfile from '../personalProfile'
import { useAlertStore, useUserStore } from '@sportapp/stores'
import { ActivityIndicator } from 'react-native-paper'
import { getCitiesOfCountry } from '@/utils/countries'
import SquaredButton from '@/components/SquaredButton'

jest.mock('expo-router')

jest.mock('react-native-paper-dates', () => {
	const native = jest.requireActual('react-native')
	return {
		// since this is a mock inputMode would break the test, we just ignore it
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		DatePickerInput: jest.fn(({ inputMode, value, ...props }) => (
			<native.TextInput {...props} value={value.toISOString()} />
		))
	}
})

jest.mock('react-native-paper', () => {
	const textInput = jest.requireActual('react-native').TextInput
	textInput.Icon = jest.requireActual('react-native-paper').TextInput.Icon
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children),
		TextInput: textInput //prevents animation issues on jest
	}
})

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn(),
	useAlertStore: jest.fn()
}))

jest.mock('@/utils/countries', () => ({
	countries: [
		{ label: 'Colombia', value: 'CO' },
		{ label: 'United States', value: 'US' }
	],
	getCitiesOfCountry: jest.fn().mockReturnValue([
		{ label: 'Bogotá', value: 'BO' },
		{ label: 'Medellín', value: 'ME' }
	])
}))

jest.mock('@/components/Dropdown', () => {
	const native = jest.requireActual('react-native')
	return jest.fn((props) => <native.TextInput {...props} />)
})

describe('PersonalProfile', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.clearAllMocks()
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					email: 'jdoe@gmail.com',
					first_name: 'John',
					last_name: 'Doe',
					identification_type: 'CC',
					identification_number: '123456789',
					gender: 'M',
					country_of_birth: 'CO',
					city_of_birth: 'BO',
					country_of_residence: 'CO',
					city_of_residence: 'BO',
					residence_age: 20,
					birth_date: '1989-12-31T00:00:00.000Z'
				}
			},
			getProfile: jest.fn(),
			updateProfile: jest.fn()
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			setAlert: jest.fn()
		})
		component = renderer.create(<PersonalProfile />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render an activity indicator when loading', () => {
		const loading = component.root.findByType(ActivityIndicator)
		expect(loading).toBeDefined()
	})

	it('should hide activity indicator when not loading', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const loading = component.root.findAllByType(ActivityIndicator)
		expect(loading).toHaveLength(0)
	})

	it('should render user values when loaded', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const inputEmail = component.root.findByProps({
			testID: 'text-input-email'
		})
		const inputPassword = component.root.findByProps({
			testID: 'text-input-password'
		})
		const inputFirstName = component.root.findByProps({
			testID: 'text-input-first-name'
		})
		const inputLastName = component.root.findByProps({
			testID: 'text-input-last-name'
		})
		const inputIdentificationType = component.root.findByProps({
			testID: 'dropdown-dni-type'
		})
		const inputIdentificationNumber = component.root.findByProps({
			testID: 'text-input-dni-number'
		})
		const inputGender = component.root.findByProps({
			testID: 'dropdown-gender'
		})
		const inputCountryOfBirth = component.root.findByProps({
			testID: 'dropdown-born-country'
		})
		const inputCityOfBirth = component.root.findByProps({
			testID: 'dropdown-born-city'
		})
		const inputCountryOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-country'
		})
		const inputCityOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-city'
		})
		const inputResidenceAge = component.root.findByProps({
			testID: 'text-input-residence-years'
		})
		const inputBirthDate = component.root.findByProps({
			testID: 'date-picker-birth-date'
		})
		expect(inputEmail.props.value).toBe('jdoe@gmail.com')
		expect(inputPassword.props.value).toBe('FakePassword123@')
		expect(inputFirstName.props.value).toBe('John')
		expect(inputLastName.props.value).toBe('Doe')
		expect(inputIdentificationType.props.value).toBe('CC')
		expect(inputIdentificationNumber.props.value).toBe('123456789')
		expect(inputGender.props.value).toBe('M')
		expect(inputCountryOfBirth.props.value).toBe('CO')
		expect(inputCityOfBirth.props.value).toBe('BO')
		expect(inputCountryOfResidence.props.value).toBe('CO')
		expect(inputCityOfResidence.props.value).toBe('BO')
		expect(inputResidenceAge.props.value).toBe('20')
		expect(inputBirthDate.props.value).toStrictEqual(
			new Date('1989-12-31T00:00:00.000Z')
		)
	})

	it('should call updateProfile when button is clicked', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const inputFirstName = component.root.findByProps({
			testID: 'text-input-first-name'
		})
		const inputLastName = component.root.findByProps({
			testID: 'text-input-last-name'
		})
		const inputIdentificationType = component.root.findByProps({
			testID: 'dropdown-dni-type'
		})
		const inputIdentificationNumber = component.root.findByProps({
			testID: 'text-input-dni-number'
		})
		const inputGender = component.root.findByProps({
			testID: 'dropdown-gender'
		})
		const inputCountryOfBirth = component.root.findByProps({
			testID: 'dropdown-born-country'
		})
		const inputCityOfBirth = component.root.findByProps({
			testID: 'dropdown-born-city'
		})
		const inputCountryOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-country'
		})
		const inputCityOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-city'
		})
		const inputResidenceAge = component.root.findByProps({
			testID: 'text-input-residence-years'
		})
		const inputBirthDate = component.root.findByProps({
			testID: 'date-picker-birth-date'
		})

		const buttons = component.root.findAllByType(SquaredButton)
		await act(async () => {
			buttons[0].props.onPress()
			await Promise.resolve()
		})

		inputFirstName.props.onChangeText('Jane')
		inputLastName.props.onChangeText('Joe')
		inputIdentificationType.props.onSelect('CE')
		inputIdentificationNumber.props.onChangeText('987654321')
		inputGender.props.onSelect('F')
		inputCountryOfBirth.props.onSelect('US')
		inputCityOfBirth.props.onSelect('ME')
		inputCountryOfResidence.props.onSelect('US')
		inputCityOfResidence.props.onSelect('ME')
		inputResidenceAge.props.onChangeText('25')
		inputBirthDate.props.onChange(new Date('1995-12-31T00:00:00.000Z'))

		const [button] = component.root.findAllByType(SquaredButton)

		act(() => {
			button.props.onPress()
		})
		expect(useUserStore().updateProfile).toHaveBeenCalledWith({
			email: 'jdoe@gmail.com',
			first_name: 'Jane',
			last_name: 'Joe',
			identification_type: 'CE',
			identification_number: '987654321',
			country_of_birth: 'US',
			city_of_birth: 'ME',
			country_of_residence: 'US',
			city_of_residence: 'ME',
			residence_age: 25,
			gender: 'F',
			birth_date: '1995-12-31T00:00:00.000Z'
		})
	})

	it('should show an error on invalid email', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const emailInput = component.root.findByProps({
			testID: 'text-input-email'
		})
		act(() => {
			emailInput.props.onChangeText('invalid')
		})
		expect(emailInput.props.error).toBe(true)
		const error = component.root.findByProps({
			testID: 'error-helper-text'
		})
		expect(error.props.children).toBe('validations.email')
	})

	it('should show an error on invalid password', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const passwordInput = component.root.findByProps({
			testID: 'text-input-password'
		})
		act(() => {
			passwordInput.props.onChangeText('invalid')
		})
		expect(passwordInput.props.error).toBe(true)
		const error = component.root.findByProps({
			testID: 'error-helper-text'
		})
		expect(error.props.children).toBe('validations.password.restrictions')
	})

	it('should set cities of country of birth when country of birth changes', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const countryInput = component.root.findByProps({
			testID: 'dropdown-born-country'
		})
		act(() => {
			countryInput.props.onSelect('US')
		})
		expect(getCitiesOfCountry).toHaveBeenCalledWith('US')
	})

	it('should unset city of birth when country of birth changes and city is not of country', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		;(getCitiesOfCountry as jest.Mock).mockReturnValue([])
		const countryInput = component.root.findByProps({
			testID: 'dropdown-born-country'
		})
		act(() => {
			countryInput.props.onSelect('US')
		})
		const cityInput = component.root.findByProps({
			testID: 'dropdown-born-city'
		})
		expect(cityInput.props.value).toBe('')
	})

	it('should set cities of country of residence when country of residence changes', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const countryInput = component.root.findByProps({
			testID: 'dropdown-residence-country'
		})
		act(() => {
			countryInput.props.onSelect('CO')
		})
		expect(getCitiesOfCountry).toHaveBeenCalledWith('CO')
	})

	it('should unset city of residence when country of residence changes and city is not of country', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		;(getCitiesOfCountry as jest.Mock).mockReturnValue([])
		const countryInput = component.root.findByProps({
			testID: 'dropdown-residence-country'
		})
		act(() => {
			countryInput.props.onSelect('US')
		})
		const cityInput = component.root.findByProps({
			testID: 'dropdown-residence-city'
		})
		expect(cityInput.props.value).toBe('')
	})

	it('should be disabled when loaded', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const inputEmail = component.root.findByProps({
			testID: 'text-input-email'
		})
		const inputPassword = component.root.findByProps({
			testID: 'text-input-password'
		})
		const inputFirstName = component.root.findByProps({
			testID: 'text-input-first-name'
		})
		const inputLastName = component.root.findByProps({
			testID: 'text-input-last-name'
		})
		const inputIdentificationType = component.root.findByProps({
			testID: 'dropdown-dni-type'
		})
		const inputIdentificationNumber = component.root.findByProps({
			testID: 'text-input-dni-number'
		})
		const inputGender = component.root.findByProps({
			testID: 'dropdown-gender'
		})
		const inputCountryOfBirth = component.root.findByProps({
			testID: 'dropdown-born-country'
		})
		const inputCityOfBirth = component.root.findByProps({
			testID: 'dropdown-born-city'
		})
		const inputCountryOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-country'
		})
		const inputCityOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-city'
		})
		const inputResidenceAge = component.root.findByProps({
			testID: 'text-input-residence-years'
		})
		const inputBirthDate = component.root.findByProps({
			testID: 'date-picker-birth-date'
		})
		expect(inputEmail.props.disabled).toBe(true)
		expect(inputPassword.props.disabled).toBe(true)
		expect(inputFirstName.props.disabled).toBe(true)
		expect(inputLastName.props.disabled).toBe(true)
		expect(inputIdentificationType.props.disabled).toBe(true)
		expect(inputIdentificationNumber.props.disabled).toBe(true)
		expect(inputGender.props.disabled).toBe(true)
		expect(inputCountryOfBirth.props.disabled).toBe(true)
		expect(inputCityOfBirth.props.disabled).toBe(true)
		expect(inputCountryOfResidence.props.disabled).toBe(true)
		expect(inputCityOfResidence.props.disabled).toBe(true)
		expect(inputResidenceAge.props.disabled).toBe(true)
		expect(inputBirthDate.props.disabled).toBe(true)
	})

	it('should enable inputs when button is clicked', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const inputEmail = component.root.findByProps({
			testID: 'text-input-email'
		})
		const inputPassword = component.root.findByProps({
			testID: 'text-input-password'
		})
		const inputFirstName = component.root.findByProps({
			testID: 'text-input-first-name'
		})
		const inputLastName = component.root.findByProps({
			testID: 'text-input-last-name'
		})
		const inputIdentificationType = component.root.findByProps({
			testID: 'dropdown-dni-type'
		})
		const inputIdentificationNumber = component.root.findByProps({
			testID: 'text-input-dni-number'
		})
		const inputGender = component.root.findByProps({
			testID: 'dropdown-gender'
		})
		const inputCountryOfBirth = component.root.findByProps({
			testID: 'dropdown-born-country'
		})
		const inputCityOfBirth = component.root.findByProps({
			testID: 'dropdown-born-city'
		})
		const inputCountryOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-country'
		})
		const inputCityOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-city'
		})
		const inputResidenceAge = component.root.findByProps({
			testID: 'text-input-residence-years'
		})
		const inputBirthDate = component.root.findByProps({
			testID: 'date-picker-birth-date'
		})

		const buttons = component.root.findAllByType(SquaredButton)

		expect(buttons.length).toBe(1)

		await act(async () => {
			buttons[0].props.onPress()
			await Promise.resolve()
		})

		expect(inputEmail.props.disabled).toBe(true) // always disabled
		expect(inputPassword.props.disabled).toBe(true) // always disabled
		expect(inputFirstName.props.disabled).toBe(false)
		expect(inputLastName.props.disabled).toBe(false)
		expect(inputIdentificationType.props.disabled).toBe(false)
		expect(inputIdentificationNumber.props.disabled).toBe(false)
		expect(inputGender.props.disabled).toBe(false)
		expect(inputCountryOfBirth.props.disabled).toBe(false)
		expect(inputCityOfBirth.props.disabled).toBe(false)
		expect(inputCountryOfResidence.props.disabled).toBe(false)
		expect(inputCityOfResidence.props.disabled).toBe(false)
		expect(inputResidenceAge.props.disabled).toBe(false)
		expect(inputBirthDate.props.disabled).toBe(false)

		const buttonsAfterEnable = component.root.findAllByType(SquaredButton)
		expect(buttonsAfterEnable.length).toBe(2)
	})

	it('should set an alert on button is clicked', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const buttons = component.root.findAllByType(SquaredButton)
		await act(async () => {
			buttons[0].props.onPress() // edit
			await Promise.resolve()
		})
		await act(async () => {
			buttons[0].props.onPress() // save
			await Promise.resolve()
		})

		expect(useAlertStore().setAlert).toHaveBeenCalledWith({
			message: 'personalDataForm.success',
			type: 'success'
		})
	})

	it('should disable inputs when cancel button is clicked', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const inputEmail = component.root.findByProps({
			testID: 'text-input-email'
		})
		const inputPassword = component.root.findByProps({
			testID: 'text-input-password'
		})
		const inputFirstName = component.root.findByProps({
			testID: 'text-input-first-name'
		})
		const inputLastName = component.root.findByProps({
			testID: 'text-input-last-name'
		})
		const inputIdentificationType = component.root.findByProps({
			testID: 'dropdown-dni-type'
		})
		const inputIdentificationNumber = component.root.findByProps({
			testID: 'text-input-dni-number'
		})
		const inputGender = component.root.findByProps({
			testID: 'dropdown-gender'
		})
		const inputCountryOfBirth = component.root.findByProps({
			testID: 'dropdown-born-country'
		})
		const inputCityOfBirth = component.root.findByProps({
			testID: 'dropdown-born-city'
		})
		const inputCountryOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-country'
		})
		const inputCityOfResidence = component.root.findByProps({
			testID: 'dropdown-residence-city'
		})
		const inputResidenceAge = component.root.findByProps({
			testID: 'text-input-residence-years'
		})
		const inputBirthDate = component.root.findByProps({
			testID: 'date-picker-birth-date'
		})

		let buttons = component.root.findAllByType(SquaredButton)
		await act(async () => {
			buttons[0].props.onPress()
			await Promise.resolve()
		})
		buttons = component.root.findAllByType(SquaredButton)
		await act(async () => {
			buttons[1].props.onPress()
			await Promise.resolve()
		})

		expect(inputEmail.props.disabled).toBe(true)
		expect(inputPassword.props.disabled).toBe(true)
		expect(inputFirstName.props.disabled).toBe(true)
		expect(inputLastName.props.disabled).toBe(true)
		expect(inputIdentificationType.props.disabled).toBe(true)
		expect(inputIdentificationNumber.props.disabled).toBe(true)
		expect(inputGender.props.disabled).toBe(true)
		expect(inputCountryOfBirth.props.disabled).toBe(true)
		expect(inputCityOfBirth.props.disabled).toBe(true)
		expect(inputCountryOfResidence.props.disabled).toBe(true)
		expect(inputCityOfResidence.props.disabled).toBe(true)
		expect(inputResidenceAge.props.disabled).toBe(true)
		expect(inputBirthDate.props.disabled).toBe(true)
	})
})
