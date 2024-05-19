import { device } from 'detox'
import {
	createProduct,
	deleteAllProducts,
	registerBusisnessPartner,
	registerUser
} from './utils/api'
import {
	generateBusinessPartner,
	generateProduct,
	generateProductCheckout,
	generateUser
} from './utils/generators'
import {
	BusinessPartner,
	Product,
	ProductCheckout,
	User
} from './utils/interfaces'

import {
	BottomNavigation,
	LoginScreen,
	ProfileScreen,
	ServicesAndProductsCheckoutScreen,
	ServicesAndProductsScreen,
	SettingsScreen,
	TrainingScreen
} from './screens'

describe('Services And Products', () => {
	let userData: User
	let businessPartnerData: BusinessPartner
	let productData: Product
	let productCheckoutData: ProductCheckout
	beforeAll(async () => {
		device.launchApp({ newInstance: true })
		userData = generateUser()
		await registerUser(userData)

		businessPartnerData = generateBusinessPartner()
		await registerBusisnessPartner(businessPartnerData)
		productData = generateProduct()
		await createProduct(productData, businessPartnerData.token)

		productCheckoutData = generateProductCheckout()
	})

	beforeEach(async () => {
		await device.reloadReactNative()
	})

	afterAll(async () => {
		await deleteAllProducts(businessPartnerData.token)
	})

	it('should search products and see details', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		await bottomNav.goToTraining()

		const trainingScreen = new TrainingScreen()
		await trainingScreen.isVisible()

		await trainingScreen.goToServices()

		const servicesAndProducts = new ServicesAndProductsScreen()

		await servicesAndProducts.isVisible()

		await servicesAndProducts.selectProduct(productData)

		await servicesAndProducts.closeModal()

		await bottomNav.goToProfile()

		const profileScreen = new ProfileScreen(userData)

		await profileScreen.isVisible()

		await profileScreen.goToSettings()

		const settings = new SettingsScreen()
		await settings.isVisible()

		await settings.logout()

		await loginScreen.isVisible()
	})

	it('should search products and checkout', async () => {
		const loginScreen = new LoginScreen()
		await loginScreen.isVisible()
		await loginScreen.login(userData.email, userData.password)

		const bottomNav = new BottomNavigation()
		await bottomNav.isVisible()

		await bottomNav.goToTraining()

		const trainingScreen = new TrainingScreen()
		await trainingScreen.isVisible()

		await trainingScreen.goToServices()

		const servicesAndProducts = new ServicesAndProductsScreen()

		await servicesAndProducts.isVisible()

		await servicesAndProducts.selectProduct(productData)

		await servicesAndProducts.adquireProduct(productCheckoutData.quantity)

		const servicesAndProductsCheckout =
			new ServicesAndProductsCheckoutScreen()

		await servicesAndProductsCheckout.isVisible()

		await servicesAndProductsCheckout.buyProduct(productCheckoutData)

		await new Promise((resolve) => setTimeout(resolve, 5000))

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
