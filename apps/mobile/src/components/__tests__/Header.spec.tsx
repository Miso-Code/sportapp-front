import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'
import { router } from 'expo-router'

import Header from '../Header'

jest.mock('expo-router')
jest.mock('react-native-safe-area-context')

describe('Header', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<Header
				options={{}}
				route={{ key: '', name: '' }}
				navigation={undefined}
			/>
		)
	})

	afterEach(() => {
		jest.clearAllMocks()
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a back button', () => {
		act(() => {
			component.update(
				<Header
					options={{ title: 'Title' }}
					route={{ key: '', name: '' }}
					navigation={undefined}
					back={{
						title: 'test'
					}}
				/>
			)
		})
		expect(component.root.findByProps({ testID: 'back' })).toBeTruthy()
	})

	it('should call router.back when back button is pressed', () => {
		act(() => {
			component.update(
				<Header
					options={{ title: 'Title' }}
					route={{ key: '', name: '' }}
					navigation={undefined}
					back={{
						title: 'test'
					}}
				/>
			)
		})
		component.root.findByProps({ testID: 'back' }).props.onPress()
		expect(router.back).toHaveBeenCalled()
	})
})
