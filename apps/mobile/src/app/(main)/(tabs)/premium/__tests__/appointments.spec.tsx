import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import Appointments from '../appointments'
import { useSportsmanStore } from '@sportapp/stores'
import { ActivityIndicator } from 'react-native-paper'
import AppointmentCard from '@/components/AppointmentCard'

jest.mock('expo-router')

jest.mock('@/components/AppointmentCard', () => {
	const native = jest.requireActual('react-native')
	return jest.fn((props) => (
		<native.View {...props} testID='appointmentCard' />
	))
})

jest.mock('@sportapp/stores', () => ({
	useSportsmanStore: jest.fn().mockReturnValue({
		trainers: [],
		sportsmanAppointments: [],
		loading: false,
		getAllTrainers: jest.fn(),
		getAllSportsmanAppointments: jest.fn()
	}),
	useAlertStore: jest.fn().mockReturnValue({
		setAlert: jest.fn()
	})
}))

describe('Appointments', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Appointments />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call getAllSportsmanAppointments and getAllTrainers on mount', async () => {
		await act(async () => {
			await Promise.resolve()
		})
		expect(
			useSportsmanStore().getAllSportsmanAppointments
		).toHaveBeenCalled()
		expect(useSportsmanStore().getAllTrainers).toHaveBeenCalled()
	})

	it('should render loading indicator when loading', () => {
		;(useSportsmanStore as unknown as jest.Mock).mockReturnValueOnce({
			...useSportsmanStore(),
			loading: true
		})
		component.update(<Appointments />)
		const activityIndicator = component.root.findByType(ActivityIndicator)
		expect(activityIndicator).toBeTruthy()
	})

	it('should render appointment cards when not loading', async () => {
		const appointments = [
			{
				appointment_id: '1',
				appointment_date: new Date().toISOString(),
				trainer_id: '1',
				appointment_type: 'type',
				appointment_location: 'location'
			},
			{
				appointment_id: '2',
				appointment_date: new Date().toISOString(),
				trainer_id: '2',
				appointment_type: 'type',
				appointment_location: 'location'
			}
		]
		const trainers = [
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
		]
		;(useSportsmanStore as unknown as jest.Mock).mockReturnValueOnce({
			...useSportsmanStore(),
			sportsmanAppointments: appointments,
			trainers,
			loading: false
		})

		await act(async () => {
			component.update(<Appointments />)
			await Promise.resolve()
		})

		const appointmentCards = component.root.findAllByType(AppointmentCard)
		expect(appointmentCards).toHaveLength(2)

		for (const [index, card] of appointmentCards.entries()) {
			expect(card.props).toEqual({
				date: appointments[index].appointment_date,
				trainer: `${trainers[index].first_name} ${trainers[index].last_name}`,
				type: appointments[index].appointment_type,
				location: appointments[index].appointment_location
			})
		}
	})
})
