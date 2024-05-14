import React from 'react'
import { ESubscription } from '@sportapp/sportapp-repository/src/user/interfaces/api/updatePlan'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import PaymentPlans from '../paymentPlans'
import {
	useUserStore,
	useAlertStore,
	usePaymentPlanStore,
	useAuthStore
} from '@sportapp/stores'
import { Surface } from 'react-native-paper'

jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn(),
	useAlertStore: jest.fn(),
	usePaymentPlanStore: jest.fn(),
	useAuthStore: jest.fn()
}))

jest.mock('react-native-paper', () => {
	const textInput = jest.requireActual('react-native').TextInput
	textInput.Icon = jest.requireActual('react-native-paper').TextInput.Icon
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children),
		TextInput: textInput //prevents animation issues on jest
	}
})

jest.mock('@/components/KeyboardAvoidingDialog', () => {
	const native = jest.requireActual('react-native')
	return jest.fn(({ children, ...props }) => (
		<native.View {...props} testID='planModal'>
			{children}
		</native.View>
	))
})

describe('PaymentPlans', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.clearAllMocks()
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.FREE
				}
			},
			getProfile: jest.fn()
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			setAlert: jest.fn()
		})
		;(usePaymentPlanStore as unknown as jest.Mock).mockReturnValue({
			setSelectedPlan: jest.fn(),
			setPaymentData: jest.fn(),
			updatePlan: jest.fn(),
			loading: false
		})
		;(useAuthStore as unknown as jest.Mock).mockReturnValue({
			refreshToken: jest.fn()
		})
		component = renderer.create(<PaymentPlans />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render 3 payment plans', () => {
		const cards = component.root
			.findAllByType(Surface)
			.filter((card) => card.props.style)
		expect(cards).toHaveLength(6) // react native paper surfaces are rendered twice
	})

	it('should show a modal when a plan is selected', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())
		const planModal = component.root.findByProps({ testID: 'planModal' })
		expect(planModal.props.visible).toBe(true)
	})

	it('should not show the modal if the user is already subscribed to the selected plan', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[0]
		act(() => cardPressable.props.onPress())
		const planModal = component.root.findByProps({ testID: 'planModal' })
		expect(planModal.props.visible).toBe(false)
	})

	it('should close the modal when the close button is pressed', async () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())
		const planModal = component.root.findByProps({ testID: 'planModal' })
		const closeButton = planModal.findByProps({ testID: 'closeButton' })
		act(() => closeButton.props.onPress())
		expect(planModal.props.visible).toBe(false)
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.INTERMEDIATE
				}
			},
			getProfile: jest.fn()
		})

		await act(async () => {
			component.update(<PaymentPlans />)
			await Promise.resolve()
		})

		const cardPressables2 = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable2) => cardPressable2.props.onPress)
		const cardPressable2 = cardPressables2[2]

		act(() => cardPressable2.props.onPress())
		const planModal2 = component.root.findByProps({ testID: 'planModal' })
		const closeButton2 = planModal2.findByProps({ testID: 'closeButton' })
		act(() => closeButton2.props.onPress())
		expect(planModal2.props.visible).toBe(false)
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.PREMIUM
				}
			},
			getProfile: jest.fn()
		})

		await act(async () => {
			component.update(<PaymentPlans />)
			await Promise.resolve()
		})

		const cardPressables3 = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable3) => cardPressable3.props.onPress)

		const cardPressable3 = cardPressables3[2]
		act(() => cardPressable3.props.onPress())

		const planModal3 = component.root.findByProps({ testID: 'planModal' })

		const closeButton3 = planModal3.findByProps({ testID: 'closeButton' })

		act(() => closeButton3.props.onPress())
		expect(planModal3.props.visible).toBe(false)
	})

	it('should close the modal when the background is pressed', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())
		const planModal = component.root.findByProps({ testID: 'planModal' })
		act(() => planModal.props.onDismiss())
		expect(planModal.props.visible).toBe(false)
	})

	it('should show a modal with checkout fields when a plan is selected', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		expect(cardNumberInput).toBeDefined()
		expect(cardHolderInput).toBeDefined()
		expect(expirationDateInput).toBeDefined()
		expect(cvvInput).toBeDefined()
	})

	it('should update fields when typing and format them', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		act(() => {
			cardNumberInput.props.onChangeText('1234567890123456')
			cardHolderInput.props.onChangeText('John Doe')
			expirationDateInput.props.onChangeText('1222')
			cvvInput.props.onChangeText('123')
		})

		expect(cardNumberInput.props.value).toBe('1234 5678 9012 3456')
		expect(cardHolderInput.props.value).toBe('JOHN DOE')
		expect(expirationDateInput.props.value).toBe('12/22')
		expect(cvvInput.props.value).toBe('123')
	})

	it('should disable accept button if fields are not filled', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		expect(acceptButton.props.disabled).toBe(true)
	})

	it('should disable accept button if fields are filled with errors', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		act(() => {
			cardNumberInput.props.onChangeText('1234')
			cardHolderInput.props.onChangeText('John Doe')
			expirationDateInput.props.onChangeText('1222')
			cvvInput.props.onChangeText('123')
		})

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		expect(acceptButton.props.disabled).toBe(true)
	})

	it('should enable accept button if fields are filled correctly', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		act(() => {
			cardNumberInput.props.onChangeText('1234567890123456')
			cardHolderInput.props.onChangeText('John Doe')
			expirationDateInput.props.onChangeText('1222')
			cvvInput.props.onChangeText('123')
		})

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		expect(acceptButton.props.disabled).toBe(false)
	})

	it('shuld call updatePlan when accept button is pressed', () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		act(() => {
			cardNumberInput.props.onChangeText('1234567890123456')
			cardHolderInput.props.onChangeText('John Doe')
			expirationDateInput.props.onChangeText('1222')
			cvvInput.props.onChangeText('123')
		})

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		act(() => acceptButton.props.onPress())

		const { setPaymentData, updatePlan } = usePaymentPlanStore()
		expect(setPaymentData).toHaveBeenCalledWith({
			amount: 1,
			card_number: '1234567890123456',
			card_holder: 'JOHN DOE',
			card_expiration_date: '12/22',
			card_cvv: '123'
		})
		expect(updatePlan).toHaveBeenCalled()
	})

	it('should show a success alert when payment is successful', async () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		act(() => {
			cardNumberInput.props.onChangeText('1234567890123456')
			cardHolderInput.props.onChangeText('John Doe')
			expirationDateInput.props.onChangeText('1222')
			cvvInput.props.onChangeText('123')
		})

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		const { updatePlan } = usePaymentPlanStore()
		;(updatePlan as jest.Mock).mockResolvedValue(true)

		await act(async () => acceptButton.props.onPress())

		const { setAlert } = useAlertStore()
		expect(setAlert).toHaveBeenCalledWith({
			type: 'success',
			message: 'paymentPlans.alert.success'
		})
	})

	it('should refresh token if payment is successful', async () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		act(() => {
			cardNumberInput.props.onChangeText('1234567890123456')
			cardHolderInput.props.onChangeText('John Doe')
			expirationDateInput.props.onChangeText('1222')
			cvvInput.props.onChangeText('123')
		})

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		const { updatePlan } = usePaymentPlanStore()
		;(updatePlan as jest.Mock).mockResolvedValue(true)

		await act(async () => acceptButton.props.onPress())

		const { refreshToken } = useAuthStore()
		expect(refreshToken).toHaveBeenCalledWith()
	})

	it('should show an error alert when payment is unsuccessful', async () => {
		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInput = planModal.findByProps({ testID: 'cardNumber' })
		const cardHolderInput = planModal.findByProps({ testID: 'cardHolder' })
		const expirationDateInput = planModal.findByProps({
			testID: 'expirationDate'
		})
		const cvvInput = planModal.findByProps({ testID: 'cvv' })

		act(() => {
			cardNumberInput.props.onChangeText('1234567890123456')
			cardHolderInput.props.onChangeText('John Doe')
			expirationDateInput.props.onChangeText('1222')
			cvvInput.props.onChangeText('123')
		})

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		const { updatePlan } = usePaymentPlanStore()
		;(updatePlan as jest.Mock).mockResolvedValue(false)

		await act(async () => acceptButton.props.onPress())

		const { setAlert } = useAlertStore()
		expect(setAlert).toHaveBeenCalledWith({
			type: 'error',
			message: 'paymentPlans.alert.error'
		})
	})

	it('should not show a modal with checkout fields if the selected plan is the free plan', async () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.INTERMEDIATE
				}
			},
			getProfile: jest.fn()
		})

		await act(async () => {
			component.update(<PaymentPlans />)
			await Promise.resolve()
		})

		const cardPressables = component.root
			.findAllByProps({
				testID: 'paymentPressable'
			})
			.filter((cardPressable) => cardPressable.props.onPress)
		const cardPressable = cardPressables[2]
		act(() => cardPressable.props.onPress())

		const planModal = component.root.findByProps({ testID: 'planModal' })

		const cardNumberInputs = planModal.findAllByProps({
			testID: 'cardNumber'
		})
		const cardHolderInputs = planModal.findAllByProps({
			testID: 'cardHolder'
		})
		const expirationDateInputs = planModal.findAllByProps({
			testID: 'expirationDate'
		})
		const cvvInputs = planModal.findAllByProps({ testID: 'cvv' })

		const acceptButton = planModal.findByProps({ testID: 'acceptButton' })

		expect(cardNumberInputs).toHaveLength(0)
		expect(cardHolderInputs).toHaveLength(0)
		expect(expirationDateInputs).toHaveLength(0)
		expect(cvvInputs).toHaveLength(0)
		expect(acceptButton.props.disabled).toBe(false)
	})

	it('should render the current plan first', async () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.PREMIUM
				}
			},
			getProfile: jest.fn()
		})

		await act(async () => {
			component.update(<PaymentPlans />)
			await Promise.resolve()
		})
		const [planTitle] = component.root
			.findAllByType(Surface)
			.filter((card) => card.props.style && card.props.children)
			.flatMap((card) => card.findAllByProps({ variant: 'titleMedium' }))

		expect(planTitle.props.children).toBe('paymentPlans.premium.title')
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.INTERMEDIATE
				}
			},
			getProfile: jest.fn()
		})

		await act(async () => {
			component.update(<PaymentPlans />)
			await Promise.resolve()
		})

		const [planTitle2] = component.root
			.findAllByType(Surface)
			.filter((card) => card.props.style && card.props.children)
			.flatMap((card) => card.findAllByProps({ variant: 'titleMedium' }))

		expect(planTitle2.props.children).toBe(
			'paymentPlans.intermediate.title'
		)
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					subscription_type: ESubscription.FREE
				}
			},
			getProfile: jest.fn()
		})

		await act(async () => {
			component.update(<PaymentPlans />)
			await Promise.resolve()
		})

		const [planTitle3] = component.root
			.findAllByType(Surface)
			.filter((card) => card.props.style && card.props.children)
			.flatMap((card) => card.findAllByProps({ variant: 'titleMedium' }))

		expect(planTitle3.props.children).toBe('paymentPlans.free.title')
	})
})
