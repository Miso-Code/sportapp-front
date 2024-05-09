/* eslint-disable no-console */
import { by, element, expect } from 'detox'
import { NutritionalData } from '../utils/interfaces'
class NutritionalDataScreen {
	private readonly screenTitle = element(by.text('Datos alimenticios'))
	private readonly alleryLactoseInput
	private readonly allerySeafoodInput
	private readonly alleryNutsInput
	private readonly allerySugarInput
	private readonly alleryGlutenInput
	private readonly dietTypeVegetarianInput
	private readonly dietTypeVeganInput
	private readonly dietTypeAllInput
	private readonly editButton

	constructor() {
		this.alleryLactoseInput = element(by.text('Sin lactosa'))
		this.allerySeafoodInput = element(by.text('Sin mariscos'))
		this.alleryNutsInput = element(by.text('Sin frutos secos'))
		this.allerySugarInput = element(by.text('Sin azúcar'))
		this.alleryGlutenInput = element(by.text('Sin gluten'))
		this.dietTypeVegetarianInput = element(by.text('Vegetariano'))
		this.dietTypeVeganInput = element(by.text('Vegano'))
		this.dietTypeAllInput = element(
			by.text('Omnívoro(no tengo restricciones dietéticas)')
		)
		this.editButton = element(by.text('Editar'))
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.alleryLactoseInput).toBeVisible()
		await expect(this.allerySeafoodInput).toBeVisible()
		await expect(this.alleryNutsInput).toBeVisible()
		await expect(this.allerySugarInput).toBeVisible()
		await expect(this.alleryGlutenInput).toBeVisible()
		await expect(this.dietTypeVegetarianInput).toBeVisible()
		await expect(this.dietTypeVeganInput).toBeVisible()
		await expect(this.dietTypeAllInput).toBeVisible()
	}

	async editNutritionalData(nutritionalData: NutritionalData) {
		await this.editButton.tap()
		if (nutritionalData.nutritional_limitations.includes('gluten')) {
			await this.alleryGlutenInput.tap()
		}
		if (nutritionalData.nutritional_limitations.includes('lactose')) {
			await this.alleryLactoseInput.tap()
		}
		if (nutritionalData.nutritional_limitations.includes('nuts')) {
			await this.alleryNutsInput.tap()
		}
		if (nutritionalData.nutritional_limitations.includes('seafood')) {
			await this.allerySeafoodInput.tap()
		}
		if (nutritionalData.nutritional_limitations.includes('sugar')) {
			await this.allerySugarInput.tap()
		}
		if (nutritionalData.food_preference === 'vegetarian') {
			await this.dietTypeVegetarianInput.tap()
		}
		if (nutritionalData.food_preference === 'vegan') {
			await this.dietTypeVeganInput.tap()
		}
		if (nutritionalData.food_preference === 'all') {
			await this.dietTypeAllInput.tap()
		}
		await element(by.text('Guardar')).tap()
	}

	async validateNutritionalData(nutritionalData: NutritionalData) {
		// TODO: Implement this method
		console.log('validateNutritionalData', nutritionalData)
		await this.isVisible()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default NutritionalDataScreen
