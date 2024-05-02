import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import NutroitionalProfile from '../nutritionalProfile'
import { useAlertStore, useUserStore } from '@sportapp/stores'
import { ActivityIndicator, Checkbox, RadioButton } from 'react-native-paper'
import SquaredButton from '@/components/SquaredButton'

jest.mock('expo-router')

jest.mock('@sportapp/stores', () => ({
	useUserStore: jest.fn(),
	useAlertStore: jest.fn()
}))

describe('NutroitionalProfile', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		jest.clearAllMocks()
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				profileData: {
					first_name: 'John',
					last_name: 'Doe'
				},
				nutritionData: {
					food_preference: 'vegetarian',
					nutritional_limitations: [1]
				},
				nutritionalLimitations: [
					{
						name: 'test',
						description: 'test',
						limitation_id: 1
					},
					{
						name: 'test2',
						description: 'test2',
						limitation_id: 2
					}
				]
			},
			getAllNutritionalLimitations: jest.fn(),
			getNutrition: jest.fn(),
			updateNutrition: jest.fn()
		})
		;(useAlertStore as unknown as jest.Mock).mockReturnValue({
			setAlert: jest.fn()
		})
		component = renderer.create(<NutroitionalProfile />)
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

	it('should render limitations by status', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		expect(limitations).toHaveLength(2)
		expect(limitations[0].props.status).toBe('checked')
		expect(limitations[1].props.status).toBe('unchecked')
	})

	it('should activate a limitation when it is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		act(() => {
			limitations[1].props.onPress()
		})
		const updatedLimitations = component.root.findAllByType(
			Checkbox.Android
		)
		expect(updatedLimitations[1].props.status).toBe('checked')
	})

	it('should deactivate a limitation when it is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		act(() => {
			limitations[0].props.onPress()
		})
		const updatedLimitations = component.root.findAllByType(
			Checkbox.Android
		)
		expect(updatedLimitations[0].props.status).toBe('unchecked')
	})

	it('should activate a limitation when text is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		act(() => {
			limitations[1].parent.props.children[1].props.onPress()
		})
		const updatedLimitations = component.root.findAllByType(
			Checkbox.Android
		)
		expect(updatedLimitations[1].props.status).toBe('checked')
	})

	it('should deactivate a limitation when text is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		act(() => {
			limitations[0].parent.props.children[1].props.onPress()
		})
		const updatedLimitations = component.root.findAllByType(
			Checkbox.Android
		)
		expect(updatedLimitations[0].props.status).toBe('unchecked')
	})

	it('should render 3 food preferences', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const preferences = component.root.findAllByType(RadioButton.Android)
		expect(preferences).toHaveLength(3)
	})

	it('should render active food preference', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const preferences = component.root.findAllByType(RadioButton.Android)
		expect(preferences[0].props.status).toBe('checked')
	})

	it('should update food preference when a preference is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const preferencesGroup = component.root.findByType(RadioButton.Group)
		const preferences = component.root.findAllByType(RadioButton.Android)
		act(() => {
			preferencesGroup.props.onValueChange('vegan')
		})
		expect(preferences[0].props.status).toBe('unchecked')
		expect(preferences[1].props.status).toBe('checked')
		expect(preferences[2].props.status).toBe('unchecked')

		act(() => {
			preferencesGroup.props.onValueChange('everything')
		})
		expect(preferences[0].props.status).toBe('unchecked')
		expect(preferences[1].props.status).toBe('unchecked')
		expect(preferences[2].props.status).toBe('checked')

		act(() => {
			preferencesGroup.props.onValueChange('vegetarian')
		})
		expect(preferences[0].props.status).toBe('checked')
		expect(preferences[1].props.status).toBe('unchecked')
		expect(preferences[2].props.status).toBe('unchecked')
	})

	it('should update food preference when a preference text is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const preferences = component.root.findAllByType(RadioButton.Android)
		act(() => {
			preferences[1].parent.props.children[1].props.onPress()
		})
		expect(preferences[0].props.status).toBe('unchecked')
		expect(preferences[1].props.status).toBe('checked')
		expect(preferences[2].props.status).toBe('unchecked')

		act(() => {
			preferences[2].parent.props.children[1].props.onPress()
		})
		expect(preferences[0].props.status).toBe('unchecked')
		expect(preferences[1].props.status).toBe('unchecked')
		expect(preferences[2].props.status).toBe('checked')

		act(() => {
			preferences[0].parent.props.children[1].props.onPress()
		})
		expect(preferences[0].props.status).toBe('checked')
		expect(preferences[1].props.status).toBe('unchecked')
		expect(preferences[2].props.status).toBe('unchecked')
	})

	it('should disable limitations and preferences when not editing', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		const preferences = component.root.findAllByType(RadioButton.Android)
		expect(limitations[0].props.disabled).toBe(true)
		expect(limitations[1].props.disabled).toBe(true)
		expect(preferences[0].props.disabled).toBe(true)
		expect(preferences[1].props.disabled).toBe(true)
		expect(preferences[2].props.disabled).toBe(true)

		const labels = component.root.findAllByProps({ variant: 'titleSmall' })
		expect(labels.length).toBe(2)
		expect(labels[0].props.style).toBeDefined()
		expect(labels[1].props.style).toBeDefined()
	})

	it('should render a editing button when not editing', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const button = component.root.findAllByType(SquaredButton)
		expect(button.length).toBe(1)
	})

	it('should enable limitations and preferences when editing', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const button = component.root.findByType(SquaredButton)
		act(() => {
			button.props.onPress()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		const preferences = component.root.findAllByType(RadioButton.Android)
		expect(limitations[0].props.disabled).toBe(false)
		expect(limitations[1].props.disabled).toBe(false)
		expect(preferences[0].props.disabled).toBe(false)
		expect(preferences[1].props.disabled).toBe(false)
		expect(preferences[2].props.disabled).toBe(false)

		const labels = component.root.findAllByProps({ variant: 'titleSmall' })
		expect(labels.length).toBe(2)
		expect(labels[0].props.style).toStrictEqual({})
		expect(labels[1].props.style).toStrictEqual({})

		const onEnabledButtons = component.root.findAllByType(SquaredButton)
		expect(onEnabledButtons).toHaveLength(2)
	})

	it('should disable limitations and preferences when cancel button is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const button = component.root.findByType(SquaredButton)
		act(() => {
			button.props.onPress()
		})
		const cancelButton = component.root.findAllByType(SquaredButton)[1]
		act(() => {
			cancelButton.props.onPress()
		})
		const limitations = component.root.findAllByType(Checkbox.Android)
		const preferences = component.root.findAllByType(RadioButton.Android)
		expect(limitations[0].props.disabled).toBe(true)
		expect(limitations[1].props.disabled).toBe(true)
		expect(preferences[0].props.disabled).toBe(true)
		expect(preferences[1].props.disabled).toBe(true)
		expect(preferences[2].props.disabled).toBe(true)

		const labels = component.root.findAllByProps({ variant: 'titleSmall' })
		expect(labels.length).toBe(2)
		expect(labels[0].props.style).toBeDefined()
		expect(labels[1].props.style).toBeDefined()
	})

	it('should call updateNutritionalProfile when save button is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const button = component.root.findByType(SquaredButton)
		act(() => {
			button.props.onPress() // enable editing
		})
		const preferences = component.root.findAllByType(RadioButton.Android)
		act(() => {
			preferences[1].parent.props.children[1].props.onPress()
		})

		const limitations = component.root.findAllByType(Checkbox.Android)

		act(() => {
			limitations[1].parent.props.children[1].props.onPress()
		})

		await act(async () => {
			button.props.onPress() // save
			await Promise.resolve()
		})
		expect(useUserStore().updateNutrition).toHaveBeenCalledWith({
			food_preference: 'vegan',
			nutritional_limitations: [1, 2]
		})
	})

	it('should show an alert when save button is pressed', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const button = component.root.findByType(SquaredButton)
		act(() => {
			button.props.onPress() // enable editing
		})
		await act(async () => {
			button.props.onPress() // save
			await Promise.resolve()
		})
		expect(useAlertStore().setAlert).toHaveBeenCalledWith({
			message: 'nutritionalDataForm.success',
			type: 'success'
		})
	})

	it('should call updateNutritionalProfile once when save button is pressed more than once', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		const button = component.root.findByType(SquaredButton)
		act(() => {
			button.props.onPress() // enable editing
		})
		await act(async () => {
			button.props.onPress() // save
			await Promise.resolve()
		})
		await act(async () => {
			button.props.onPress() // save
			await Promise.resolve()
		})
		expect(useUserStore().updateNutrition).toHaveBeenCalledTimes(1)
	})

	it('should render if no user data is available', () => {
		;(useUserStore as unknown as jest.Mock).mockReturnValue({
			user: {
				nutritionalLimitations: [
					{
						name: 'test',
						description: 'test',
						limitation_id: 1
					},
					{
						name: 'test2',
						description: 'test2',
						limitation_id: 2
					}
				]
			},
			getAllNutritionalLimitations: jest.fn(),
			getNutrition: jest.fn(),
			updateNutrition: jest.fn()
		})
		component = renderer.create(<NutroitionalProfile />)
		expect(component.toJSON()).toMatchSnapshot()
	})
})
