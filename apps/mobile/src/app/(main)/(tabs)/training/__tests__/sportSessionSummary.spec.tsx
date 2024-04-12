import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { useSportSessionStore } from '@sportapp/stores'

import SportSessionSummary from '../sportSessionSummary'

jest.mock('react-native-safe-area-context')

jest.mock('@sportapp/stores', () => ({
	useSportSessionStore: jest.fn().mockReturnValue({
		sportSession: null
	})
}))

jest.mock('@/components/Kpi', () => {
	const native = jest.requireActual('react-native')
	return {
		__esModule: true,
		default: (props) => (
			<native.View {...props} testID={`kpi${props.label}`}>
				<native.Text>{props.label}</native.Text>
				<native.Text>{props.value}</native.Text>
			</native.View>
		)
	}
})

describe('SportSessionSummary', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<SportSessionSummary />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a progress bar when no sport session is available', () => {
		expect(
			component.root.findByProps({ testID: 'progressBar' })
		).toBeDefined()
	})

	it('should render a summary when a sport session is available', () => {
		;(useSportSessionStore as unknown as jest.Mock).mockReturnValueOnce({
			sportSession: {
				session_id: '1',
				sport_id: '1',
				user_id: '1',
				start_date: new Date().toISOString(),
				duration: 60,
				steps: 85,
				distance: 70,
				calories: 5,
				average_speed: 1.78,
				min_heartrate: 80,
				max_heartrate: 150,
				avg_heartrate: 133
			}
		})

		act(() => {
			component.update(<SportSessionSummary />)
		})

		const calories = component.root.findByProps({ testID: 'kpiCalorías' })
		const duration = component.root.findByProps({ testID: 'kpiTiempo' })
		const steps = component.root.findByProps({ testID: 'kpiPasos' })
		const distance = component.root.findByProps({ testID: 'kpiDistancia' })
		const speed = component.root.findByProps({ testID: 'kpiVelocidad' })
		const heartRate = component.root.findByProps({
			testID: 'kpiRitmo Cardíaco'
		})

		expect(calories.props.value).toBe(5)
		expect(duration.props.value).toBe(60)
		expect(steps.props.value).toBe(85)
		expect(distance.props.value).toBe(70)
		expect(speed.props.value).toBe(1.78)
		expect(heartRate.props.data).toStrictEqual([80, 133, 150])
	})
})
