import { element, by, expect } from 'detox'
import { User } from 'e2e/utils/interfaces'

class ProfileScreen {
	private readonly screenTitle
	private readonly userAvatar
	private readonly userName
	private readonly listItemPersonalData
	private readonly listItemSportData
	private readonly listItemNutritionalData
	private readonly listItemPaymentData
	private readonly listItemSettings

	constructor(user: User) {
		this.screenTitle = element(by.text('Perfil')).atIndex(0)
		this.userAvatar = element(
			by.text((user.first_name[0] + user.last_name[0]).toUpperCase())
		)
		this.userName = element(by.text(`${user.first_name} ${user.last_name}`))
		this.listItemPersonalData = element(by.text('Datos personales'))
		this.listItemSportData = element(by.text('Datos deportivos'))
		this.listItemNutritionalData = element(by.text('Datos alimenticios'))
		this.listItemPaymentData = element(by.text('Planes de pago'))
		this.listItemSettings = element(by.text('Configuraciones'))
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.userAvatar).toBeVisible()
		await expect(this.userName).toBeVisible()
		await expect(this.listItemPersonalData).toBeVisible()
		await expect(this.listItemSportData).toBeVisible()
		await expect(this.listItemNutritionalData).toBeVisible()
		await expect(this.listItemPaymentData).toBeVisible()
		await expect(this.listItemSettings).toBeVisible()
	}

	async goToPersonalData() {
		await this.listItemPersonalData.tap()
	}

	async goToSportData() {
		await this.listItemSportData.tap()
	}

	async goToNutritionalData() {
		await this.listItemNutritionalData.tap()
	}

	async goToPaymentData() {
		await this.listItemPaymentData.tap()
	}

	async goToSettings() {
		await this.listItemSettings.tap()
	}
}

export default ProfileScreen
