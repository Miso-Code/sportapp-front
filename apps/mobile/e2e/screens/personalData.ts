import { element, by, expect, device } from 'detox'
import { User } from '../utils/interfaces'
import { genderToText, identificationTypeToText } from '../utils/maps'
import { getCountryNameByCode } from '../../src/utils/countries'
import { extractSearchableString } from '../utils/search'
class PersonalDataScreen {
	private readonly screenScrollView = element(
		by.type('android.widget.ScrollView')
	)
	private readonly screenTitle = element(by.text('Datos personales'))
	private readonly emailInput
	private readonly passwordInput
	private readonly nameInput
	private readonly lastNameInput
	private readonly identificationTypeInput
	private readonly identificationNumberInput
	private readonly countryOfBirthInput
	private readonly cityOfBirthInput
	private readonly countryOfResidenceInput
	private readonly cityOfResidenceInput
	private readonly residenceAgeInput
	private readonly birthDateInput
	private readonly genderInput
	private readonly editButton

	constructor() {
		this.emailInput = element(by.id('text-input-email'))
		this.passwordInput = element(by.id('text-input-password'))
		this.nameInput = element(by.id('text-input-first-name'))
		this.lastNameInput = element(by.id('text-input-last-name'))
		this.identificationTypeInput = element(by.id('dropdown-dni-type'))
		this.identificationNumberInput = element(by.id('text-input-dni-number'))
		this.countryOfBirthInput = element(by.id('dropdown-born-country'))
		this.cityOfBirthInput = element(by.id('dropdown-born-city'))
		this.countryOfResidenceInput = element(
			by.id('dropdown-residence-country')
		)
		this.cityOfResidenceInput = element(by.id('dropdown-residence-city'))
		this.residenceAgeInput = element(by.id('text-input-residence-years'))
		this.birthDateInput = element(by.id('date-picker-birth-date'))
		this.genderInput = element(by.id('dropdown-gender'))
		this.editButton = element(by.text('Editar'))
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.emailInput).toBeVisible()
		await expect(this.passwordInput).toBeVisible()
		await expect(this.nameInput).toBeVisible()
		await expect(this.lastNameInput).toBeVisible()
		await expect(this.identificationTypeInput).toBeVisible()
		await expect(this.identificationNumberInput).toBeVisible()
		await expect(this.countryOfBirthInput).toBeVisible()
		await expect(this.cityOfBirthInput).toBeVisible()
		await expect(this.countryOfResidenceInput).toBeVisible()

		await this.screenScrollView.scroll(500, 'down')

		await expect(this.cityOfResidenceInput).toBeVisible()
		await expect(this.residenceAgeInput).toBeVisible()
		await expect(this.genderInput).toBeVisible()
		await expect(this.birthDateInput).toBeVisible()
		await expect(this.editButton).toBeVisible()

		await this.screenScrollView.scroll(500, 'up', 0.5, 0.5)
	}

	async validatePersonalData(userData: User) {
		await expect(this.emailInput).toHaveText(userData.email)
		await expect(this.nameInput).toHaveText(userData.first_name)
		await expect(this.lastNameInput).toHaveText(userData.last_name)
		await expect(this.identificationTypeInput).toHaveText(
			identificationTypeToText(userData.identification_type)
		)
		await expect(this.identificationNumberInput).toHaveText(
			userData.identification_number
		)
		await expect(this.countryOfBirthInput).toHaveText(
			getCountryNameByCode(userData.country_of_birth)
		)
		if (userData.city_of_birth)
			await expect(this.cityOfBirthInput).toHaveText(
				userData.city_of_birth
			)
		await expect(this.countryOfResidenceInput).toHaveText(
			getCountryNameByCode(userData.country_of_residence)
		)

		await this.screenScrollView.scroll(500, 'down')

		if (userData.city_of_residence)
			await expect(this.cityOfResidenceInput).toHaveText(
				userData.city_of_residence
			)
		await expect(this.residenceAgeInput).toHaveText(
			userData.residence_age.toString()
		)
		await expect(this.genderInput).toHaveText(genderToText(userData.gender))

		const [year, month, day] = userData.birth_date.split('T')[0].split('-')
		await expect(this.birthDateInput).toHaveText(`${day}/${month}/${year}`)
		await this.screenScrollView.scroll(500, 'up', 0.5, 0.5)
	}

	async editPersonalData(userData: User) {
		await this.screenScrollView.scroll(500, 'down')
		await this.editButton.tap()
		await this.screenScrollView.scroll(500, 'up', 0.5, 0.5)
		await this.emailInput.replaceText(userData.email)
		await this.passwordInput.replaceText(userData.password)
		await this.nameInput.replaceText(userData.first_name)
		await this.lastNameInput.replaceText(userData.last_name)
		await this.identificationTypeInput.tap()
		await element(
			by
				.id('dropdown-item')
				.withDescendant(
					by.text(
						identificationTypeToText(userData.identification_type)
					)
				)
		).tap()
		await this.identificationNumberInput.replaceText(
			userData.identification_number
		)
		await this.countryOfBirthInput.tap()
		const countryOfBirthName = getCountryNameByCode(
			userData.country_of_birth
		)
		await element(by.id('searchbar')).typeText(
			extractSearchableString(countryOfBirthName)
		)
		await device.pressBack() // Close keyboard
		await element(
			by.id('dropdown-item').withDescendant(by.text(countryOfBirthName))
		).tap()

		if (userData.city_of_birth) {
			await this.cityOfBirthInput.tap()
			await element(by.id('searchbar')).typeText(
				extractSearchableString(userData.city_of_birth)
			)
			await device.pressBack() // Close keyboard

			await element(
				by
					.id('dropdown-item')
					.withDescendant(by.text(userData.city_of_birth))
			).tap()
		}
		await this.screenScrollView.scroll(500, 'down')
		await this.countryOfResidenceInput.tap()

		const countryOfResidenceName = getCountryNameByCode(
			userData.country_of_residence
		)

		await element(by.id('searchbar')).typeText(
			extractSearchableString(countryOfResidenceName)
		)
		await device.pressBack() // Close keyboard
		await element(
			by
				.id('dropdown-item')
				.withDescendant(by.text(countryOfResidenceName))
		).tap()

		await this.residenceAgeInput.replaceText(
			userData.residence_age.toString()
		)

		if (userData.city_of_residence) {
			await this.cityOfResidenceInput.tap()
			await element(by.id('searchbar')).typeText(
				extractSearchableString(userData.city_of_residence)
			)
			await device.pressBack() // Close keyboard
			await element(
				by
					.id('dropdown-item')
					.withDescendant(by.text(userData.city_of_residence))
			).tap()
		}
		await this.genderInput.tap()
		await element(
			by
				.id('dropdown-item')
				.withDescendant(by.text(genderToText(userData.gender)))
		).tap()
		const [year, month, day] = userData.birth_date.split('T')[0].split('-')
		await this.birthDateInput.replaceText(`${day}/${month}/${year}`)

		await element(by.text('Guardar')).tap()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default PersonalDataScreen
