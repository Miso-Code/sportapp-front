import { device } from 'detox'
import {
	generateNutritionalData,
	generateSportData,
	generateUser,
	validCard
} from './utils/generators'
import { registerUser } from './utils/api'
import { User } from './utils/interfaces'

import {
	LoginScreen,
	ProfileScreen,
	PersonalDataScreen,
	SportsDataScreen,
	NutritionalDataScreen,
	SettingsScreen,
	BottomNavigation,
	PaymentPlanScreen,
	TrainingScreen
} from './screens'

describe('Auth', () => {
	let userData: User
	beforeAll(async () => {
		device.launchApp({ newInstance: true })
		userData = generateUser()
		await registerUser(userData)
	})

	beforeEach(async () => {
		await device.reloadReactNative()
	})

	it('should login and view/update profiles and logout', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		const profileScreen = new ProfileScreen(userData)
		await profileScreen.isVisible()

		await profileScreen.goToPersonalData()

		const personalDataScreen = new PersonalDataScreen()
		await personalDataScreen.isVisible()
		await personalDataScreen.validatePersonalData(userData)
		const newUserData = generateUser()
		await personalDataScreen.editPersonalData(newUserData)
		await personalDataScreen.back()
		await profileScreen.goToPersonalData()
		newUserData.email = userData.email
		newUserData.password = userData.password
		userData = newUserData
		await personalDataScreen.validatePersonalData(newUserData)
		await personalDataScreen.back()
		await profileScreen.goToSportData()

		const sportsDataScreen = new SportsDataScreen()
		await sportsDataScreen.isVisible()
		const sportData = generateSportData()
		await sportsDataScreen.editSportsData(sportData)
		await sportsDataScreen.validateSportsData(sportData)
		await sportsDataScreen.back()

		await profileScreen.goToNutritionalData()
		const nutritionalDataScreen = new NutritionalDataScreen()
		await nutritionalDataScreen.isVisible()
		const nutritionalData = generateNutritionalData()
		await nutritionalDataScreen.editNutritionalData(nutritionalData)
		await nutritionalDataScreen.back()

		await profileScreen.goToPaymentData()
		await device.pressBack()

		await profileScreen.goToSettings()
		const settings = new SettingsScreen()
		await settings.isVisible()
		await settings.goToLanguage()
		await settings.back()
		await settings.logout()

		await loginScreen.isVisible()
	})

	it('should change payment plans', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		const profileScreen = new ProfileScreen(userData)
		await profileScreen.isVisible()

		await profileScreen.goToPaymentData()

		const paymentPlanScreen = new PaymentPlanScreen()

		await paymentPlanScreen.isVisible()

		await paymentPlanScreen.selectIntermediatePlan()

		await paymentPlanScreen.processPayment(validCard)

		await paymentPlanScreen.back()

		await profileScreen.goToPaymentData()

		await paymentPlanScreen.selectPremiumPlan()

		await paymentPlanScreen.processPayment(validCard)

		await paymentPlanScreen.back()

		await new Promise((resolve) => setTimeout(resolve, 5000))

		await bottomNav.isVisible(true)

		await bottomNav.goToTraining()

		const trainingScreen = new TrainingScreen()
		await trainingScreen.isVisible(true)

		await bottomNav.goToPremium()

		await bottomNav.goToProfile()

		await profileScreen.goToSettings()
		const settings = new SettingsScreen()
		await settings.isVisible()
		await settings.logout()

		await loginScreen.isVisible()
	})
})
