import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import SportsProfile from '../sportsProfile'
import { useAlertStore, useSportStore, useUserStore } from '@sportapp/stores'
import { ActivityIndicator, Button } from 'react-native-paper'
import SquaredButton from '@/components/SquaredButton'

jest.mock('expo-router')

jest.mock('react-native-paper', () => {
	const textInput = jest.requireActual('react-native').TextInput
	textInput.Affix = jest.requireActual('react-native-paper').TextInput.Affix
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children),
		TextInput: textInput //prevents animation issues on jest
	}
})

jest.mock('@sportapp/stores', () => ({
	useSportStore: jest.fn(),
	useUserStore: jest.fn(),
	useAlertStore: jest.fn()
}))

jest.mock('@/components/Dropdown', () => {
	const native = jest.requireActual('react-native')
	return jest.fn((props) => <native.TextInput {...props} />)
})

jest.mock('@/components/TimePicker', () => {
	const native = jest.requireActual('react-native')
	return jest.fn((props) => <native.TextInput {...props} />)
})

jest.mock('@/components/DayOfTheWeekInput', () => {
	const native = jest.requireActual('react-native')
	return jest.fn(({ children, ...props }) => (
		<native.View {...props} testID='day-of-the-week-input'>
			{children}
		</native.View>
	))
})

describe('SportsProfile', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.clearAllMocks()
		;(useSportStore as unknown as jest.Mock).mockReturnValue({
			sports: [
				{
					id: '1',
					name: 'Athletics'
				},
				{
					id: '2',
					name: 'Cycling'
				}
			],
			getSports: jest.fn()
		})
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				sportData: {
					training_objective: 'lose_weight',
					weight: 70,
					height: 1.8,
					available_training_hours: 10,
					available_weekdays: ['monday', 'tuesday'],
					preferred_training_start_time: '08:00 AM',
					training_limitations: [
						{
							limitation_id: '1',
							name: 'Knee injury',
							description: "Can't do high impact exercises"
						},
						{
							limitation_id: '2',
							name: 'Back pain',
							description: "Can't do squats"
						}
					],
					bmi: 21,
					favourite_sport_id: '1'
				}
			},
			getSport: jest.fn(),
			updateSport: jest.fn()
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			setAlert: jest.fn()
		})
		component = renderer.create(<SportsProfile />)
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

	it('should render inputs disabled when loaded', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const dropdownFavouriteSport = component.root.findByProps({
			testID: 'dropdown-favourite-sport'
		})
		const dropdownTrainingObjective = component.root.findByProps({
			testID: 'dropdown-training-objective'
		})
		const inputDayOfTheWeek = component.root.findByProps({
			testID: 'day-of-the-week-input'
		})
		const inputPreferredTrainingStartTime = component.root.findByProps({
			testID: 'time-picker-preferred-training-start-time'
		})
		const inputAvailableTrainingHours = component.root.findByProps({
			testID: 'text-input-available-training-hours'
		})
		const inputWeight = component.root.findByProps({
			testID: 'text-input-weight'
		})
		const inputHeight = component.root.findByProps({
			testID: 'text-input-height'
		})
		const inputBMI = component.root.findByProps({
			testID: 'text-input-bmi'
		})
		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const buttonRemoveLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) =>
					button.props.testID === 'button-remove-limitation'
			)
		const buttonAddLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) => button.props.testID === 'button-add-limitation'
			)

		expect(dropdownFavouriteSport.props.disabled).toBe(true)
		expect(dropdownTrainingObjective.props.disabled).toBe(true)
		expect(inputDayOfTheWeek.props.disabled).toBe(true)
		expect(inputPreferredTrainingStartTime.props.disabled).toBe(true)
		expect(inputAvailableTrainingHours.props.disabled).toBe(true)
		expect(inputWeight.props.disabled).toBe(true)
		expect(inputHeight.props.disabled).toBe(true)
		expect(inputBMI.props.disabled).toBe(true)
		expect(inputTrainingLimitationNames).toHaveLength(2)
		expect(inputTrainingLimitationNames[0].props.disabled).toBe(true)
		expect(inputTrainingLimitationNames[1].props.disabled).toBe(true)
		expect(inputTrainingLimitationDescriptions).toHaveLength(2)
		expect(inputTrainingLimitationDescriptions[0].props.disabled).toBe(true)
		expect(inputTrainingLimitationDescriptions[1].props.disabled).toBe(true)
		expect(buttonRemoveLimitation).toHaveLength(2)
		expect(buttonRemoveLimitation[0].props.disabled).toBe(true)
		expect(buttonRemoveLimitation[1].props.disabled).toBe(true)
		expect(buttonAddLimitation).toHaveLength(1)
		expect(buttonAddLimitation[0].props.disabled).toBe(true)
	})

	it('should render user values when loaded', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const dropdownFavouriteSport = component.root.findByProps({
			testID: 'dropdown-favourite-sport'
		})
		const dropdownTrainingObjective = component.root.findByProps({
			testID: 'dropdown-training-objective'
		})
		const inputDayOfTheWeek = component.root.findByProps({
			testID: 'day-of-the-week-input'
		})
		const inputPreferredTrainingStartTime = component.root.findByProps({
			testID: 'time-picker-preferred-training-start-time'
		})
		const inputAvailableTrainingHours = component.root.findByProps({
			testID: 'text-input-available-training-hours'
		})
		const inputWeight = component.root.findByProps({
			testID: 'text-input-weight'
		})
		const inputHeight = component.root.findByProps({
			testID: 'text-input-height'
		})
		const inputBMI = component.root.findByProps({
			testID: 'text-input-bmi'
		})
		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const buttonRemoveLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) =>
					button.props.testID === 'button-remove-limitation'
			)
		const buttonAddLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) => button.props.testID === 'button-add-limitation'
			)

		expect(dropdownFavouriteSport.props.value).toBe('1')
		expect(dropdownTrainingObjective.props.value).toBe('lose_weight')
		expect(inputDayOfTheWeek.props.value).toStrictEqual([
			'monday',
			'tuesday'
		])
		expect(inputPreferredTrainingStartTime.props.value).toBe('08:00 AM')
		expect(inputAvailableTrainingHours.props.value).toBe('10')
		expect(inputWeight.props.value).toBe('70')
		expect(inputHeight.props.value).toBe('1.8')
		expect(inputBMI.props.value).toBe('21')
		expect(inputTrainingLimitationNames).toHaveLength(2)
		expect(inputTrainingLimitationNames[0].props.value).toBe('Knee injury')
		expect(inputTrainingLimitationNames[1].props.value).toBe('Back pain')
		expect(inputTrainingLimitationDescriptions).toHaveLength(2)
		expect(inputTrainingLimitationDescriptions[0].props.value).toBe(
			"Can't do high impact exercises"
		)
		expect(inputTrainingLimitationDescriptions[1].props.value).toBe(
			"Can't do squats"
		)
		expect(buttonRemoveLimitation).toHaveLength(2)
		expect(buttonAddLimitation).toHaveLength(1)
	})

	it('should update the values when changed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const dropdownFavouriteSport = component.root.findByProps({
			testID: 'dropdown-favourite-sport'
		})
		const dropdownTrainingObjective = component.root.findByProps({
			testID: 'dropdown-training-objective'
		})
		const inputDayOfTheWeek = component.root.findByProps({
			testID: 'day-of-the-week-input'
		})
		const inputPreferredTrainingStartTime = component.root.findByProps({
			testID: 'time-picker-preferred-training-start-time'
		})
		const inputAvailableTrainingHours = component.root.findByProps({
			testID: 'text-input-available-training-hours'
		})
		const inputWeight = component.root.findByProps({
			testID: 'text-input-weight'
		})
		const inputHeight = component.root.findByProps({
			testID: 'text-input-height'
		})
		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)

		await act(async () => {
			dropdownFavouriteSport.props.onSelect('2')
			dropdownTrainingObjective.props.onSelect('gain_muscle')
			inputDayOfTheWeek.props.onChange(['wednesday', 'thursday'])
			inputPreferredTrainingStartTime.props.onChangeText('09:00 AM')
			inputAvailableTrainingHours.props.onChangeText('20')
			inputWeight.props.onChangeText('80')
			inputHeight.props.onChangeText('1.9')
			inputTrainingLimitationNames[0].props.onChangeText('Ankle injury')
			inputTrainingLimitationNames[1].props.onChangeText('Shoulder pain')
			inputTrainingLimitationDescriptions[0].props.onChangeText(
				"Can't run"
			)
			inputTrainingLimitationDescriptions[1].props.onChangeText(
				"Can't lift weights"
			)
			await Promise.resolve()
		})

		expect(dropdownFavouriteSport.props.value).toBe('2')
		expect(dropdownTrainingObjective.props.value).toBe('gain_muscle')
		expect(inputDayOfTheWeek.props.value).toStrictEqual([
			'wednesday',
			'thursday'
		])
		expect(inputPreferredTrainingStartTime.props.value).toBe('09:00 AM')
		expect(inputAvailableTrainingHours.props.value).toBe('20')
		expect(inputWeight.props.value).toBe('80')
		expect(inputHeight.props.value).toBe('1.9')
		expect(inputTrainingLimitationNames[0].props.value).toBe('Ankle injury')
		expect(inputTrainingLimitationNames[1].props.value).toBe(
			'Shoulder pain'
		)
		expect(inputTrainingLimitationDescriptions[0].props.value).toBe(
			"Can't run"
		)
		expect(inputTrainingLimitationDescriptions[1].props.value).toBe(
			"Can't lift weights"
		)
	})

	it('should add a new training limitation', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const buttonAddLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) => button.props.testID === 'button-add-limitation'
			)

		await act(async () => {
			buttonAddLimitation[0].props.onPress()
			await Promise.resolve()
		})

		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)

		expect(inputTrainingLimitationNames).toHaveLength(3)
		expect(inputTrainingLimitationDescriptions).toHaveLength(3)
	})

	it('should remove a training limitation', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const buttonRemoveLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) =>
					button.props.testID === 'button-remove-limitation'
			)

		await act(async () => {
			buttonRemoveLimitation[0].props.onPress()
			await Promise.resolve()
		})

		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)

		expect(inputTrainingLimitationNames).toHaveLength(1)
		expect(inputTrainingLimitationDescriptions).toHaveLength(1)
		expect(inputTrainingLimitationNames[0].props.value).toBe('Back pain')
		expect(inputTrainingLimitationDescriptions[0].props.value).toBe(
			"Can't do squats"
		)
	})

	it('should enable inputs when editing', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const buttonEdit = component.root.findByType(SquaredButton)

		await act(async () => {
			buttonEdit.props.onPress()
			await Promise.resolve()
		})

		const dropdownFavouriteSport = component.root.findByProps({
			testID: 'dropdown-favourite-sport'
		})
		const dropdownTrainingObjective = component.root.findByProps({
			testID: 'dropdown-training-objective'
		})
		const inputDayOfTheWeek = component.root.findByProps({
			testID: 'day-of-the-week-input'
		})
		const inputPreferredTrainingStartTime = component.root.findByProps({
			testID: 'time-picker-preferred-training-start-time'
		})
		const inputAvailableTrainingHours = component.root.findByProps({
			testID: 'text-input-available-training-hours'
		})
		const inputWeight = component.root.findByProps({
			testID: 'text-input-weight'
		})
		const inputHeight = component.root.findByProps({
			testID: 'text-input-height'
		})
		const inputBMI = component.root.findByProps({
			testID: 'text-input-bmi'
		})
		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const buttonRemoveLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) =>
					button.props.testID === 'button-remove-limitation'
			)
		const buttonAddLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) => button.props.testID === 'button-add-limitation'
			)

		const buttons = component.root.findAllByType(SquaredButton)

		expect(dropdownFavouriteSport.props.disabled).toBe(false)
		expect(dropdownTrainingObjective.props.disabled).toBe(false)
		expect(inputDayOfTheWeek.props.disabled).toBe(false)
		expect(inputPreferredTrainingStartTime.props.disabled).toBe(false)
		expect(inputAvailableTrainingHours.props.disabled).toBe(false)
		expect(inputWeight.props.disabled).toBe(false)
		expect(inputHeight.props.disabled).toBe(false)
		expect(inputBMI.props.disabled).toBe(true)
		expect(inputTrainingLimitationNames).toHaveLength(2)
		expect(inputTrainingLimitationNames[0].props.disabled).toBe(false)
		expect(inputTrainingLimitationDescriptions).toHaveLength(2)
		expect(inputTrainingLimitationDescriptions[0].props.disabled).toBe(
			false
		)
		expect(buttonRemoveLimitation).toHaveLength(2)
		expect(buttonRemoveLimitation[0].props.disabled).toBe(false)
		expect(buttonRemoveLimitation[1].props.disabled).toBe(false)
		expect(buttonAddLimitation).toHaveLength(1)
		expect(buttonAddLimitation[0].props.disabled).toBe(false)
		expect(buttons).toHaveLength(2)
	})

	it('should disable inputs when canceling', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const buttonEdit = component.root.findByType(SquaredButton)

		await act(async () => {
			buttonEdit.props.onPress()
			await Promise.resolve()
		})

		const buttonCancel = component.root.findAllByType(SquaredButton)[1]

		await act(async () => {
			buttonCancel.props.onPress()
			await Promise.resolve()
		})

		const dropdownFavouriteSport = component.root.findByProps({
			testID: 'dropdown-favourite-sport'
		})
		const dropdownTrainingObjective = component.root.findByProps({
			testID: 'dropdown-training-objective'
		})
		const inputDayOfTheWeek = component.root.findByProps({
			testID: 'day-of-the-week-input'
		})
		const inputPreferredTrainingStartTime = component.root.findByProps({
			testID: 'time-picker-preferred-training-start-time'
		})
		const inputAvailableTrainingHours = component.root.findByProps({
			testID: 'text-input-available-training-hours'
		})
		const inputWeight = component.root.findByProps({
			testID: 'text-input-weight'
		})
		const inputHeight = component.root.findByProps({
			testID: 'text-input-height'
		})
		const inputBMI = component.root.findByProps({
			testID: 'text-input-bmi'
		})
		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const buttonRemoveLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) =>
					button.props.testID === 'button-remove-limitation'
			)
		const buttonAddLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) => button.props.testID === 'button-add-limitation'
			)

		const buttons = component.root.findAllByType(SquaredButton)

		expect(dropdownFavouriteSport.props.disabled).toBe(true)
		expect(dropdownTrainingObjective.props.disabled).toBe(true)
		expect(inputDayOfTheWeek.props.disabled).toBe(true)
		expect(inputPreferredTrainingStartTime.props.disabled).toBe(true)
		expect(inputAvailableTrainingHours.props.disabled).toBe(true)
		expect(inputWeight.props.disabled).toBe(true)
		expect(inputHeight.props.disabled).toBe(true)
		expect(inputBMI.props.disabled).toBe(true)
		expect(inputTrainingLimitationNames).toHaveLength(2)
		expect(inputTrainingLimitationNames[0].props.disabled).toBe(true)
		expect(inputTrainingLimitationDescriptions).toHaveLength(2)
		expect(inputTrainingLimitationDescriptions[0].props.disabled).toBe(true)
		expect(buttonRemoveLimitation).toHaveLength(2)
		expect(buttonRemoveLimitation[0].props.disabled).toBe(true)
		expect(buttonRemoveLimitation[1].props.disabled).toBe(true)
		expect(buttonAddLimitation).toHaveLength(1)
		expect(buttonAddLimitation[0].props.disabled).toBe(true)
		expect(buttons).toHaveLength(1)
	})

	it('should call updateSport when saving', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const buttonEdit = component.root.findByType(SquaredButton)

		await act(async () => {
			buttonEdit.props.onPress()
			await Promise.resolve()
		})

		const dropdownFavouriteSport = component.root.findByProps({
			testID: 'dropdown-favourite-sport'
		})
		const dropdownTrainingObjective = component.root.findByProps({
			testID: 'dropdown-training-objective'
		})
		const inputDayOfTheWeek = component.root.findByProps({
			testID: 'day-of-the-week-input'
		})
		const inputPreferredTrainingStartTime = component.root.findByProps({
			testID: 'time-picker-preferred-training-start-time'
		})
		const inputAvailableTrainingHours = component.root.findByProps({
			testID: 'text-input-available-training-hours'
		})
		const inputWeight = component.root.findByProps({
			testID: 'text-input-weight'
		})
		const inputHeight = component.root.findByProps({
			testID: 'text-input-height'
		})
		const buttonAddLimitation = component.root
			.findAllByType(Button)
			.filter(
				(button: any) => button.props.testID === 'button-add-limitation'
			)

		await act(async () => {
			buttonAddLimitation[0].props.onPress()
			await Promise.resolve()
		})
		const inputTrainingLimitationNames = component.root
			.findAllByProps({ testID: 'text-input-limitation-name' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)
		const inputTrainingLimitationDescriptions = component.root
			.findAllByProps({ testID: 'text-input-limitation-description' })
			.filter(
				(input: any) =>
					input._fiber?.elementType?.displayName === 'TextInput'
			)

		await act(async () => {
			dropdownFavouriteSport.props.onSelect('2')
			dropdownTrainingObjective.props.onSelect('gain_muscle')
			inputDayOfTheWeek.props.onChange(['wednesday', 'thursday'])
			inputPreferredTrainingStartTime.props.onChangeText('09:00 AM')
			inputAvailableTrainingHours.props.onChangeText('20')
			inputWeight.props.onChangeText('80')
			inputHeight.props.onChangeText('1.9')
			inputTrainingLimitationNames[0].props.onChangeText('Ankle injury')
			inputTrainingLimitationNames[1].props.onChangeText('Shoulder pain')
			inputTrainingLimitationNames[2].props.onChangeText('Knee injury')
			inputTrainingLimitationDescriptions[0].props.onChangeText(
				"Can't run"
			)
			inputTrainingLimitationDescriptions[1].props.onChangeText(
				"Can't lift weights"
			)
			inputTrainingLimitationDescriptions[2].props.onChangeText(
				"Can't jump"
			)
			await Promise.resolve()
		})

		const buttonSave = component.root.findAllByType(SquaredButton)[0]

		await act(async () => {
			buttonSave.props.onPress()
			await Promise.resolve()
		})

		const { updateSport } = useUserStore()

		expect(updateSport).toHaveBeenCalledWith({
			training_objective: 'gain_muscle',
			weight: 80,
			height: 1.9,
			available_training_hours: 20,
			available_weekdays: ['wednesday', 'thursday'],
			preferred_training_start_time: '09:00 AM',
			training_limitations: [
				{
					limitation_id: '1',
					name: 'Ankle injury',
					description: "Can't run"
				},
				{
					limitation_id: '2',
					name: 'Shoulder pain',
					description: "Can't lift weights"
				},
				{
					name: 'Knee injury',
					description: "Can't jump"
				}
			],
			favourite_sport_id: '2'
		})
	})

	it('should show an alert when saving', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const buttonEdit = component.root.findByType(SquaredButton)

		await act(async () => {
			buttonEdit.props.onPress()
			await Promise.resolve()
		})

		const buttonSave = component.root.findAllByType(SquaredButton)[0]

		await act(async () => {
			buttonSave.props.onPress()
			await Promise.resolve()
		})

		const { setAlert } = useAlertStore()

		expect(setAlert).toHaveBeenCalledWith({
			message: 'sportDataForm.success',
			type: 'success'
		})
	})

	it('should work when no sport data is available', async () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				sportData: null
			},
			getSport: jest.fn(),
			updateSport: jest.fn()
		})
		;(useSportStore as unknown as jest.Mock).mockReturnValue({
			sports: null,
			getSports: jest.fn()
		})

		await act(async () => {
			component.update(<SportsProfile />)
			await Promise.resolve()
		})

		expect(component.toJSON()).toMatchSnapshot()
	})
})
