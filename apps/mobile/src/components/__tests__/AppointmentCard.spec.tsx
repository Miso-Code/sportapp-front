import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import AppointmentCard from '../AppointmentCard'
import { Button } from 'react-native-paper'

jest.mock('dayjs')

describe('AppointmentCard', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<AppointmentCard
				date={new Date().toISOString()}
				trainer='trainer'
				type='virtual'
				location='location'
			/>
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a button for virtual appointments and no location', () => {
		expect(component.root.findByType(Button)).toBeDefined()
		expect(
			component.root.findAllByProps({ testID: 'location' })
		).toHaveLength(0)
	})

	it('should render a location for in person appointments and no button', () => {
		component.update(
			<AppointmentCard
				date={new Date().toISOString()}
				trainer='trainer'
				type='inPerson'
				location='location'
			/>
		)

		expect(
			component.root.findAllByProps({ testID: 'location' })
		).toHaveLength(3) // react native stuff ¯\_(ツ)_/¯
		expect(component.root.findAllByType(Button)).toHaveLength(0)
	})
})
