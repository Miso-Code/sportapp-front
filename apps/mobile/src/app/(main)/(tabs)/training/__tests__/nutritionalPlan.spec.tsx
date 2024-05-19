import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import NutritionalPlan from '../nutritionalPlan'
import { useNutritionalPlanStore } from '@sportapp/stores'

jest.mock('expo-router')

jest.mock('dayjs', () => {
	const dayjs = () => ({
		weekday: jest.fn().mockReturnValue(1)
	})
	dayjs.extend = jest.fn()
	return {
		__esModule: true,
		default: dayjs
	}
})

jest.mock('dayjs/locale/es', () => ({
	__esModule: true
}))

jest.mock('dayjs/locale/en', () => ({
	__esModule: true
}))

jest.mock('dayjs/plugin/isSameOrAfter', () => ({
	__esModule: true
}))

jest.mock('dayjs/plugin/weekday', () => ({
	__esModule: true
}))

jest.mock('@sportapp/stores', () => ({
	useNutritionalPlanStore: jest.fn()
}))

jest.mock('@/components/DishCard', () => {
	const native = jest.requireActual('react-native')
	return {
		__esModule: true,
		default: native.View
	}
})

describe('NutritionalPlan', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		;(useNutritionalPlanStore as unknown as jest.Mock).mockReturnValue({
			loading: false,
			getNutritionalPlan: jest.fn(),
			planDishes: [
				{
					week_day: 'monday',
					name: 'name',
					category: 'category',
					calories: 100,
					protein: 100,
					carbs: 100,
					fat: 100
				},
				{
					week_day: 'monday',
					name: 'name',
					category: 'category',
					calories: 200,
					protein: 200,
					carbs: 200,
					fat: 200
				},
				{
					week_day: 'tuesday',
					name: 'name2',
					category: 'category2',
					calories: 300,
					protein: 300,
					carbs: 300,
					fat: 300
				}
			]
		})
		component = renderer.create(<NutritionalPlan />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call getNutritionalPlan when component mounts', async () => {
		await act(async () => {
			await Promise.resolve()
		})

		expect(
			useNutritionalPlanStore().getNutritionalPlan
		).toHaveBeenNthCalledWith(1, { lang: 'en' })
	})
	it('should scroll up on FAB press', async () => {
		const fab = component.root.findByProps({
			testID: 'fabScrollUp'
		})

		const scrollView = component.root.findByProps({ testID: 'scrollView' })

		;(scrollView as any)._fiber.ref.current.scrollTo = jest.fn()
		await act(async () => {
			fab.props.onPress()
			await Promise.resolve()
		})

		expect(
			(scrollView as any)._fiber.ref.current.scrollTo
		).toHaveBeenCalled()
	})
})
