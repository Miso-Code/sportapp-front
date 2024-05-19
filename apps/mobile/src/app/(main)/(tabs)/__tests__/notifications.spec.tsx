import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import Notifications from '../notifications'
import { ScrollView } from 'react-native'

jest.mock('@sportapp/stores', () => ({
	useAlertStore: jest.fn().mockReturnValue({
		alertHistory: [
			{
				createAt: new Date(),
				type: 'success',
				message: 'success'
			}
		]
	})
}))

jest.mock('dayjs', () => () => ({
	locale: jest.fn().mockReturnThis(),
	format: jest.fn().mockReturnValue('01 January 2021 12:00 AM')
}))

describe('Notifications', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Notifications />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should scroll up on FAB press', async () => {
		component.update(<Notifications />)

		const fab = component.root.findByProps({
			testID: 'fabScrollUp'
		})

		const scrollView = component.root.findByType(ScrollView)

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
