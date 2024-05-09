import { element, by, expect, waitFor } from 'detox'

class TrainingCalendarScreen {
	private readonly screenTitle
	private readonly calendarSwitch
	private readonly calendarModelMonthButton
	private readonly calendarModelWeekButton
	private readonly calendarModelDayButton
	private readonly calendarModelScheduleButton
	private readonly calendarView

	constructor() {
		this.screenTitle = element(by.text('Entrenamientos')).atIndex(0)
		this.calendarSwitch = element(by.id('calendarSwitch'))
		this.calendarModelMonthButton = element(
			by.text('Mes').withAncestor(by.id('actionsContainer'))
		)
		this.calendarModelWeekButton = element(
			by.text('Semana').withAncestor(by.id('actionsContainer'))
		)
		this.calendarModelDayButton = element(
			by.text('Día').withAncestor(by.id('actionsContainer'))
		)
		this.calendarModelScheduleButton = element(
			by.text('Agenda').withAncestor(by.id('actionsContainer'))
		)
		this.calendarView = element(by.id('calendarContainer'))
	}

	async isVisibleAllViews() {
		await this.isVisible()
		await this.goToMonthView()
		await this.isVisible()
		await this.goToWeekView()
		await this.isVisible()
		await this.goToDayView()
		await this.isVisible()
		await this.goToScheduleView()
		await this.isVisible()
	}

	async isVisible() {
		await expect(this.screenTitle).toBeVisible()
		await expect(this.calendarSwitch).toBeVisible()
		await expect(this.calendarModelMonthButton).toBeVisible()
		await expect(this.calendarModelWeekButton).toBeVisible()
		await expect(this.calendarModelDayButton).toBeVisible()
		await expect(this.calendarModelScheduleButton).toBeVisible()
		await expect(this.calendarView).toBeVisible()
	}

	async goToMonthView() {
		await this.calendarModelMonthButton.tap()
	}

	async goToWeekView() {
		await this.calendarModelWeekButton.tap()
	}

	async goToDayView() {
		await this.calendarModelDayButton.tap()
	}

	async goToScheduleView() {
		await this.calendarModelScheduleButton.tap()
	}

	async goToTrainingSession() {
		await element(
			by
				.text(/.*Entrenamiento.*/)
				.withAncestor(by.id('calendarContainer'))
		)
			.atIndex(0)
			.tap()
	}

	async goToTrainingPlan() {
		await element(
			by
				.text(/.*Entrenamiento.*/)
				.withAncestor(by.id('calendarContainer'))
		)
			.atIndex(1)
			.tap()
	}

	async goToEvent() {
		await waitFor(
			element(
				by
					.text(/.*Test Event.*/)
					.withAncestor(by.id('calendarContainer'))
			)
		)
			.toBeVisible()
			.withTimeout(10000)

		await element(
			by.text(/.*Test Event.*/).withAncestor(by.id('calendarContainer'))
		)
			.atIndex(0)
			.tap()
	}

	async validateTrainingPlan() {
		await waitFor(element(by.text('Próximo Entrenamiento')))
			.toBeVisible()
			.withTimeout(10000)

		await element(by.text('Cerrar')).tap()
	}

	async validateEvent() {
		await waitFor(element(by.text(/.*Test Event.*/)).atIndex(1))
			.toBeVisible()
			.withTimeout(10000)

		await element(by.text('Cerrar')).tap()
	}

	async back() {
		await element(by.id('back')).tap()
	}
}

export default TrainingCalendarScreen
