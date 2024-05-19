import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import TimePicker from '../TimePicker'

jest.mock('dayjs')

jest.mock('react-native-paper-dates', () => {
	const view = jest.requireActual('react-native').View
	return {
		TimePickerModal: view
	}
})

jest.mock('react-native-paper', () => {
	const textInput = jest.requireActual('react-native').TextInput
	textInput.Icon = jest.requireActual('react-native-paper').TextInput.Icon
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children),
		TextInput: textInput //prevents animation issues on jest
	}
})

describe('TimePicker', () => {
	let component: ReactTestRenderer
	let onChangeText: jest.Mock

	beforeEach(() => {
		jest.clearAllMocks()
		onChangeText = jest.fn()
		component = renderer.create(
			<TimePicker
				label='Test'
				value='12:00 PM'
				onChangeText={onChangeText}
			/>
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should open the time picker when pressed', () => {
		const pressable = component.root.findByProps({
			testID: 'timePickerPressable'
		})
		act(() => pressable.props.onPress())
		expect(
			component.root.findByProps({ 'data-testId': 'timePickerModal' })
				.props.visible
		).toBe(true)
	})

	it('should close the time picker on dismiss', () => {
		const timePicker = component.root.findByProps({
			'data-testId': 'timePickerModal'
		})
		act(() => timePicker.props.onDismiss())
		expect(timePicker.props.visible).toBe(false)
	})

	it('should call onChangeText when a time is selected', () => {
		const timePicker = component.root.findByProps({
			'data-testId': 'timePickerModal'
		})
		act(() => timePicker.props.onConfirm({ hours: 13, minutes: 0 }))
		expect(onChangeText).toHaveBeenCalledWith('01:00 PM')
	})

	it('should work without a value', () => {
		component.update(
			<TimePicker label='Test' onChangeText={onChangeText} />
		)
		const timePicker = component.root.findByProps({
			'data-testId': 'timePickerModal'
		})
		act(() => timePicker.props.onConfirm({ hours: 13, minutes: 0 }))
		expect(onChangeText).toHaveBeenCalledWith('01:00 PM')
	})
})
