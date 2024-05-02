import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import DayOfTheWeekInput from '../DayOfTheWeekInput'
import { Avatar, TouchableRipple } from 'react-native-paper'

import { useTranslation } from 'react-i18next'

describe('DayOfTheWeekInput', () => {
	let component: ReactTestRenderer
	let onChange: jest.Mock

	beforeEach(() => {
		jest.clearAllMocks()
		onChange = jest.fn()
		component = renderer.create(
			<DayOfTheWeekInput
				value={['sunday', 'monday']}
				onChange={onChange}
				label='Test'
			/>
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render active days', () => {
		const days = component.root.findAllByType(Avatar.Text)
		expect(days).toHaveLength(7)
		for (let i = 0; i < 2; i++) {
			expect(days[i].props.testID).toBe('activeDay')
		}
		for (let i = 2; i < 7; i++) {
			expect(days[i].props.testID).toBe('inactiveDay')
		}
	})

	it('should call onChange when a day is pressed', () => {
		const dayContainers = component.root.findAllByType(TouchableRipple)
		act(() => {
			dayContainers[0].props.onPress()
		})
		expect(onChange).toHaveBeenCalledWith(['monday'])
	})

	it('should deactivate a day when it is pressed', () => {
		const dayContainers = component.root.findAllByType(TouchableRipple)
		act(() => {
			dayContainers[0].props.onPress()
		})
		const days = component.root.findAllByType(Avatar.Text)
		expect(days[0].props.testID).toBe('inactiveDay')
	})

	it('should activate a day when it is pressed', () => {
		const dayContainers = component.root.findAllByType(TouchableRipple)
		act(() => {
			dayContainers[2].props.onPress()
		})
		const days = component.root.findAllByType(Avatar.Text)
		expect(days[2].props.testID).toBe('activeDay')
	})

	it('should render monday first if locale starts with monday', () => {
		useTranslation().i18n.changeLanguage('es-CO')
		act(() => {
			component.update(
				<DayOfTheWeekInput
					value={['sunday', 'monday']}
					onChange={onChange}
					label='Test'
				/>
			)
		})
		const days = component.root.findAllByType(Avatar.Text)
		expect(days[0].props.label).toBe('form.daysOfTheWeekValues.MONDAY')
		expect(days[0].props.testID).toBe('activeDay')
		expect(days[days.length - 1].props.testID).toBe('activeDay')
	})

	it('should disable all days if is disabled', () => {
		act(() => {
			component.update(
				<DayOfTheWeekInput
					value={['sunday', 'monday']}
					onChange={onChange}
					label='Test'
					disabled
				/>
			)
		})
		const dayContainers = component.root.findAllByType(TouchableRipple)
		for (let i = 0; i < 7; i++) {
			expect(dayContainers[i].props.disabled).toBe(true)
		}
	})
})
