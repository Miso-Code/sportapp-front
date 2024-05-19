import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'

import CreateInPersonAppointment from '../createInPersonAppointment'
import { useAlertStore, useSportsmanStore } from '@sportapp/stores'
import SquaredButton from '@/components/SquaredButton'
import { ActivityIndicator } from 'react-native-paper'

jest.mock('expo-router')
jest.mock('dayjs')

jest.mock('@sportapp/stores', () => ({
	useSportsmanStore: jest.fn(),
	useAlertStore: jest.fn()
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

jest.mock('@/components/Dropdown', () => {
	const native = jest.requireActual('react-native')
	return jest.fn((props) => <native.TextInput {...props} />)
})

jest.mock('@/components/TimePicker', () => {
	const native = jest.requireActual('react-native')
	return jest.fn((props) => <native.TextInput {...props} />)
})

describe('CreateInPersonAppointment', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		;(useSportsmanStore as unknown as jest.Mock).mockReturnValue({
			trainers: [
				{
					trainer_id: '1',
					first_name: 'first',
					last_name: 'last'
				},
				{
					trainer_id: '2',
					first_name: 'first2',
					last_name: 'last2'
				}
			],
			loading: false,
			getAllTrainers: jest.fn(),
			addSportsmanAppointment: jest.fn()
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			setAlert: jest.fn()
		})
		component = renderer.create(<CreateInPersonAppointment />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render an activity indicator when loading', async () => {
		;(useSportsmanStore as unknown as jest.Mock).mockReturnValue({
			trainers: null,
			loading: true,
			getAllTrainers: jest.fn(),
			addSportsmanAppointment: jest.fn()
		})

		await act(async () => {
			component.update(<CreateInPersonAppointment />)
			await Promise.resolve()
		})

		const activityIndicator = component.root.findByType(ActivityIndicator)

		expect(activityIndicator).toBeDefined()
	})

	it('should call getAllTrainers on mount', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		expect(useSportsmanStore().getAllTrainers).toHaveBeenCalled()
	})

	it('should update fields on change', () => {
		const appointMentDateInput = component.root.findByProps({
			testID: 'date-picker-appointment-date'
		})

		const appointmentTimeInput = component.root.findByProps({
			testID: 'time-picker-appointment-time'
		})

		const trainerInput = component.root.findByProps({
			testID: 'dropdown-trainer'
		})

		const locationInput = component.root.findByProps({
			testID: 'dropdown-location'
		})

		const descriptionInput = component.root.findByProps({
			testID: 'input-description'
		})

		act(() => {
			appointMentDateInput.props.onChange(
				new Date('2013-03-22T18:41:00.925Z')
			)
			appointmentTimeInput.props.onChangeText('12:00 PM')
			trainerInput.props.onSelect('1')
			locationInput.props.onSelect('Calle Falsa 123, Springfield')
			descriptionInput.props.onChangeText('description')
		})

		expect(appointMentDateInput.props.value).toEqual(
			new Date('2013-03-22T18:41:00.925Z')
		)
		expect(appointmentTimeInput.props.value).toEqual('12:00 PM')
		expect(trainerInput.props.value).toEqual('1')
		expect(locationInput.props.value).toEqual(
			'Calle Falsa 123, Springfield'
		)
		expect(descriptionInput.props.value).toEqual('description')
	})

	it('should disable button when fields are empty', () => {
		const button = component.root.findByType(SquaredButton)
		expect(button.props.disabled).toBeTruthy()
	})

	it('should enable button when fields are filled', () => {
		const appointMentDateInput = component.root.findByProps({
			testID: 'date-picker-appointment-date'
		})

		const appointmentTimeInput = component.root.findByProps({
			testID: 'time-picker-appointment-time'
		})

		const trainerInput = component.root.findByProps({
			testID: 'dropdown-trainer'
		})

		const descriptionInput = component.root.findByProps({
			testID: 'input-description'
		})

		act(() => {
			appointMentDateInput.props.onChange(
				new Date('2013-03-22T18:41:00.925Z')
			)
			appointmentTimeInput.props.onChangeText('12:00 PM')
			trainerInput.props.onSelect('1')
			descriptionInput.props.onChangeText('description')
		})

		const button = component.root.findByType(SquaredButton)
		expect(button.props.disabled).toBeFalsy()
	})

	it('should call addSportsmanAppointment on button press', async () => {
		const appointMentDateInput = component.root.findByProps({
			testID: 'date-picker-appointment-date'
		})

		const appointmentTimeInput = component.root.findByProps({
			testID: 'time-picker-appointment-time'
		})

		const trainerInput = component.root.findByProps({
			testID: 'dropdown-trainer'
		})

		const locationInput = component.root.findByProps({
			testID: 'dropdown-location'
		})

		const descriptionInput = component.root.findByProps({
			testID: 'input-description'
		})

		act(() => {
			appointMentDateInput.props.onChange(
				new Date('2013-03-22T18:41:00Z')
			)
			appointmentTimeInput.props.onChangeText('12:00 PM')
			trainerInput.props.onSelect('1')
			locationInput.props.onSelect('Calle Falsa 123, Springfield')
			descriptionInput.props.onChangeText('description')
		})

		const button = component.root.findByType(SquaredButton)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		const date = new Date('2013-03-22T18:41:00Z')
		date.setHours(12, 0, 0, 0)

		expect(
			useSportsmanStore().addSportsmanAppointment
		).toHaveBeenCalledWith({
			appointment_date: date.toISOString(),
			appointment_type: 'in_person',
			trainer_id: '1',
			appointment_reason: 'description',
			appointment_location: 'Calle Falsa 123, Springfield'
		})
	})

	it('should show an alert on error and not redirect', async () => {
		;(
			useSportsmanStore().addSportsmanAppointment as jest.Mock
		).mockResolvedValue(false)

		const appointMentDateInput = component.root.findByProps({
			testID: 'date-picker-appointment-date'
		})

		const appointmentTimeInput = component.root.findByProps({
			testID: 'time-picker-appointment-time'
		})

		act(() => {
			appointMentDateInput.props.onChange(
				new Date('2013-03-22T18:41:00Z')
			)
			appointmentTimeInput.props.onChangeText('12:00 PM')
		})

		const button = component.root.findByType(SquaredButton)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		expect(useAlertStore().setAlert).toHaveBeenCalledWith({
			message: 'preference.error',
			type: 'error'
		})
		expect(router.push).not.toHaveBeenCalled()
	})

	it('should show an alert on success and redirect', async () => {
		;(
			useSportsmanStore().addSportsmanAppointment as jest.Mock
		).mockResolvedValue(true)

		const appointMentDateInput = component.root.findByProps({
			testID: 'date-picker-appointment-date'
		})

		const appointmentTimeInput = component.root.findByProps({
			testID: 'time-picker-appointment-time'
		})

		act(() => {
			appointMentDateInput.props.onChange(
				new Date('2013-03-22T18:41:00Z')
			)
			appointmentTimeInput.props.onChangeText('12:00 PM')
		})

		const button = component.root.findByType(SquaredButton)
		await act(async () => {
			button.props.onPress()
			await Promise.resolve()
		})

		expect(useAlertStore().setAlert).toHaveBeenCalledWith({
			message: 'preference.success',
			type: 'success'
		})
		expect(router.push).toHaveBeenCalledWith('/premium/appointments')
	})
})
