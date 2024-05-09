/* eslint-disable no-console */
import { by, element, expect } from 'detox'
import { SportData } from '../utils/interfaces'
class SportsDataScreen {
	private readonly screenScrollView = element(
		by.type('android.widget.ScrollView')
	)
	private readonly screenTitle = element(by.text('Datos deportivos'))
	private readonly sportInput
	private readonly trainingObjectiveInput
	private readonly dayofWeekInputMonday
	private readonly dayofWeekInputTuesday
	private readonly dayofWeekInputWednesday
	private readonly dayofWeekInputThursday
	private readonly dayofWeekInputFriday
	private readonly dayofWeekInputSaturday
	private readonly dayofWeekInputSunday
	private readonly trainingTimeInput
	private readonly trainingHoursInput
	private readonly weightInput
	private readonly heightInput
	private readonly BMIInput
	private readonly addLimitationButton
	private readonly editButton

	constructor() {
		this.sportInput = element(by.id('dropdown-favourite-sport'))
		this.trainingObjectiveInput = element(
			by.id('dropdown-training-objective')
		)
		this.dayofWeekInputMonday = element(by.label('Lu'))
		this.dayofWeekInputTuesday = element(by.label('Ma'))
		this.dayofWeekInputWednesday = element(by.label('Mi'))
		this.dayofWeekInputThursday = element(by.label('Ju'))
		this.dayofWeekInputFriday = element(by.label('Vi'))
		this.dayofWeekInputSaturday = element(by.label('Sá'))
		this.dayofWeekInputSunday = element(by.label('Do'))
		this.trainingTimeInput = element(
			by.id('time-picker-preferred-training-start-time')
		)
		this.trainingHoursInput = element(
			by.id('text-input-available-training-hours')
		)
		this.weightInput = element(by.id('text-input-weight'))
		this.heightInput = element(by.id('text-input-height'))
		this.BMIInput = element(by.id('text-input-bmi'))

		this.addLimitationButton = element(by.id('button-add-limitation'))
		this.editButton = element(by.text('Editar'))
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.sportInput).toBeVisible()
		await expect(this.trainingObjectiveInput).toBeVisible()
		await expect(this.dayofWeekInputMonday).toBeVisible()
		await expect(this.dayofWeekInputTuesday).toBeVisible()
		await expect(this.dayofWeekInputWednesday).toBeVisible()
		await expect(this.dayofWeekInputThursday).toBeVisible()
		await expect(this.dayofWeekInputFriday).toBeVisible()
		await expect(this.dayofWeekInputSaturday).toBeVisible()
		await expect(this.dayofWeekInputSunday).toBeVisible()
		await expect(this.trainingTimeInput).toBeVisible()
		await expect(this.trainingHoursInput).toBeVisible()
		await expect(this.weightInput).toBeVisible()
		await expect(this.heightInput).toBeVisible()
		await expect(this.BMIInput).toBeVisible()
		await this.screenScrollView.scroll(500, 'down')

		await expect(this.addLimitationButton).toBeVisible()
		await this.screenScrollView.scroll(500, 'up', 0.5, 0.5)
	}

	async _clearDaysOfWeek() {
		const { checked: mondayChecked } =
			await this.dayofWeekInputMonday.getAttributes()
		const { checked: tuesdayChecked } =
			await this.dayofWeekInputTuesday.getAttributes()
		const { checked: wednesdayChecked } =
			await this.dayofWeekInputWednesday.getAttributes()
		const { checked: thursdayChecked } =
			await this.dayofWeekInputThursday.getAttributes()
		const { checked: fridayChecked } =
			await this.dayofWeekInputFriday.getAttributes()
		const { checked: saturdayChecked } =
			await this.dayofWeekInputSaturday.getAttributes()
		const { checked: sundayChecked } =
			await this.dayofWeekInputSunday.getAttributes()

		if (mondayChecked) await this.dayofWeekInputMonday.tap()
		if (tuesdayChecked) await this.dayofWeekInputTuesday.tap()
		if (wednesdayChecked) await this.dayofWeekInputWednesday.tap()
		if (thursdayChecked) await this.dayofWeekInputThursday.tap()
		if (fridayChecked) await this.dayofWeekInputFriday.tap()
		if (saturdayChecked) await this.dayofWeekInputSaturday.tap()
		if (sundayChecked) await this.dayofWeekInputSunday.tap()
	}

	async _fillDaysOfWeek(days: SportData['days_of_week']) {
		await this._clearDaysOfWeek()
		if (days.includes('monday')) {
			await this.dayofWeekInputMonday.tap()
		}
		if (days.includes('tuesday')) {
			await this.dayofWeekInputTuesday.tap()
		}
		if (days.includes('wednesday')) {
			await this.dayofWeekInputWednesday.tap()
		}
		if (days.includes('thursday')) {
			await this.dayofWeekInputThursday.tap()
		}
		if (days.includes('friday')) {
			await this.dayofWeekInputFriday.tap()
		}
		if (days.includes('saturday')) {
			await this.dayofWeekInputSaturday.tap()
		}
		if (days.includes('sunday')) {
			await this.dayofWeekInputSunday.tap()
		}
	}

	async validateDaysOfWeek(days: SportData['days_of_week']) {
		// TODO: Implement this method
		console.log('validateDaysOfWeek Method not implemented', days)
	}

	async _editTrainingTime(time: string) {
		await this.trainingTimeInput.tap()
		await element(by.label('toggle keyboard')).tap()

		// find text input with ancestor modal
		const hourInput = element(
			by
				.type('android.widget.EditText')
				.withAncestor(by.type('android.widget.FrameLayout'))
		).atIndex(0)
		const minutesInput = element(
			by
				.type('android.widget.EditText')
				.withAncestor(by.type('android.widget.FrameLayout'))
		).atIndex(1)
		// type time
		const [timePart, ampm] = time.split(' ')
		let [hours, minutes] = timePart.split(':')

		if (ampm === 'PM') {
			hours = (parseInt(hours, 10) + 12).toString()
		}

		await hourInput.replaceText(hours)
		await minutesInput.replaceText(minutes)

		await element(by.text('Ok')).tap()
	}

	async _editLimitations(limitations: SportData['limitations']) {
		// TODO: Implement this method
		console.log('_editLimitations Method not implemented', limitations)
	}

	async _validateLimitations(limitations: SportData['limitations']) {
		// TODO Implement this method
		console.log('_validateLimitations Method not implemented', limitations)
	}

	async validateSportsData(userData: SportData) {
		await expect(this.sportInput).toHaveText(userData.favourite_sport)
		await expect(this.trainingObjectiveInput).toHaveText(
			userData.training_objective
		)
		await this.validateDaysOfWeek(userData.days_of_week)
		await expect(this.trainingTimeInput).toHaveText(
			userData.preferred_training_start_time
		)
		await expect(this.trainingHoursInput).toHaveText(
			userData.available_training_hours.toString()
		)
		await expect(this.weightInput).toHaveText(userData.weight.toString())
		await expect(this.heightInput).toHaveText(userData.height.toString())

		await this.screenScrollView.scroll(500, 'down')

		await this._validateLimitations(userData.limitations)

		await this.screenScrollView.scroll(500, 'up', 0.5, 0.5)
	}

	async editSportsData(userData: SportData) {
		await this.screenScrollView.scroll(500, 'down')
		await this.editButton.tap()
		await this.screenScrollView.scroll(500, 'up', 0.5, 0.5)

		await this.sportInput.tap()
		await element(
			by
				.id('dropdown-item')
				.withDescendant(by.text(userData.favourite_sport))
		).tap()
		await this.trainingObjectiveInput.tap()
		await element(
			by
				.id('dropdown-item')
				.withDescendant(by.text(userData.training_objective))
		).tap()
		await this._fillDaysOfWeek(userData.days_of_week)
		await this._editTrainingTime(userData.preferred_training_start_time)
		await this.trainingHoursInput.replaceText(
			userData.available_training_hours.toString()
		)
		await this.weightInput.replaceText(userData.weight.toString())
		await this.heightInput.replaceText(userData.height.toString())

		await this.screenScrollView.scroll(500, 'down')

		await this._editLimitations(userData.limitations)

		await element(by.text('Guardar')).tap()

		await this.screenScrollView.scroll(500, 'up', 0.5, 0.5)
	}

	async back() {
		await element(by.id('back')).tap()
	}
}
export default SportsDataScreen
