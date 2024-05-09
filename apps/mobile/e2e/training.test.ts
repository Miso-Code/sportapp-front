import { device } from 'detox'
import {
	generateUser,
	generateTrainingSession,
	generateSportData,
	generateNutritionalData
} from './utils/generators'
import { registerUser } from './utils/api'
import { User } from './utils/interfaces'

import {
	LoginScreen,
	BottomNavigation,
	TrainingScreen,
	TrainingSessionScreen,
	TrainingSessionSummaryScreen,
	TrainingCalendarScreen,
	ProfileScreen,
	SportsDataScreen,
	SettingsScreen,
	NutritionalPlanScreen,
	NutritionalDataScreen
} from './screens'

describe('Training', () => {
	let userData: User
	beforeAll(async () => {
		device.launchApp({ newInstance: true })
		userData = generateUser()
		await registerUser(userData)
	})

	beforeEach(async () => {
		await device.reloadReactNative()
	})

	it('should start training without completing profiles', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		await bottomNav.goToTraining()

		const trainingScreen = new TrainingScreen()
		await trainingScreen.isVisible()

		await trainingScreen.goToTrainingAndEvents()

		const trainingCalendarScreen = new TrainingCalendarScreen()

		await trainingCalendarScreen.isVisibleAllViews()

		await trainingCalendarScreen.back()

		await trainingScreen.goToStartTraining()

		const trainingSessionScreen = new TrainingSessionScreen()

		await trainingSessionScreen.isVisible()

		const trainingSession = generateTrainingSession()

		await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second

		await trainingSessionScreen.startTraining()

		await trainingSessionScreen.waitSessionTime(trainingSession.duration)

		await trainingSessionScreen.pauseTraining()

		await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second

		await trainingSessionScreen.resumeTraining()

		await trainingSessionScreen.waitSessionTime(
			trainingSession.duration + 2
		)

		await trainingSessionScreen.stopTraining()

		await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second

		const trainingSessionSummaryScreen = new TrainingSessionSummaryScreen()

		await trainingSessionSummaryScreen.isVisible()

		await trainingSessionSummaryScreen.back()

		await trainingSessionScreen.back()

		await trainingScreen.goToTrainingAndEvents()

		await trainingCalendarScreen.goToTrainingSession()

		await trainingSessionSummaryScreen.isVisible()

		await bottomNav.goToProfile()

		const profileScreen = new ProfileScreen(userData)

		await profileScreen.isVisible()

		await profileScreen.goToSettings()

		const settings = new SettingsScreen()
		await settings.isVisible()

		await settings.logout()

		await loginScreen.isVisible()
	})

	it('should show training plan on sport profile completion', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		const profileScreen = new ProfileScreen(userData)
		await profileScreen.isVisible()

		await profileScreen.goToSportData()

		const sportsDataScreen = new SportsDataScreen()

		await sportsDataScreen.isVisible()

		const sportData = generateSportData()

		await sportsDataScreen.editSportsData(sportData)

		await sportsDataScreen.back()

		await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait 5 second

		await bottomNav.goToTraining()

		const trainingScreen = new TrainingScreen()
		await trainingScreen.isVisible()

		await trainingScreen.goToTrainingAndEvents()

		const trainingCalendarScreen = new TrainingCalendarScreen()

		await trainingCalendarScreen.isVisible()

		await trainingCalendarScreen.goToScheduleView()

		await trainingCalendarScreen.goToTrainingPlan()

		await trainingCalendarScreen.validateTrainingPlan()

		await trainingCalendarScreen.back()

		await bottomNav.goToProfile()

		await profileScreen.goToSettings()

		const settings = new SettingsScreen()
		await settings.isVisible()

		await settings.logout()

		await loginScreen.isVisible()
	})

	it('should show nutritional plan on nutritional profile completion', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		const profileScreen = new ProfileScreen(userData)
		await profileScreen.isVisible()

		await profileScreen.goToNutritionalData()
		const nutritionalDataScreen = new NutritionalDataScreen()
		await nutritionalDataScreen.isVisible()
		const nutritionalData = generateNutritionalData()
		await nutritionalDataScreen.editNutritionalData(nutritionalData)
		await nutritionalDataScreen.back()
		await new Promise((resolve) => setTimeout(resolve, 5000)) // Wait 5 second
		await bottomNav.goToTraining()

		const trainingScreen = new TrainingScreen()
		await trainingScreen.isVisible()

		await trainingScreen.goToNutritionalPlan()

		const nutritionalPlan = new NutritionalPlanScreen()
		await nutritionalPlan.isVisible()

		await bottomNav.goToProfile()

		await profileScreen.goToSettings()

		const settings = new SettingsScreen()
		await settings.isVisible()

		await settings.logout()

		await loginScreen.isVisible()
	})

	it('should show and event on calendar tap', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		await bottomNav.goToTraining()

		const trainingScreen = new TrainingScreen()
		await trainingScreen.isVisible()

		await trainingScreen.goToTrainingAndEvents()

		const trainingCalendarScreen = new TrainingCalendarScreen()

		await trainingCalendarScreen.isVisible()

		await trainingCalendarScreen.goToScheduleView()

		await trainingCalendarScreen.goToEvent()

		await trainingCalendarScreen.validateEvent()

		await trainingCalendarScreen.back()

		await bottomNav.goToProfile()

		const profileScreen = new ProfileScreen(userData)

		await profileScreen.isVisible()

		await profileScreen.goToSettings()

		const settings = new SettingsScreen()
		await settings.isVisible()

		await settings.logout()

		await loginScreen.isVisible()
	})
})
