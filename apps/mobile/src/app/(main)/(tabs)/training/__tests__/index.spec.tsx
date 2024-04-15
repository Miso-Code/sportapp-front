import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'
import { router } from 'expo-router'

import Training from '..'

jest.mock('expo-router')

describe('Training', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(<Training />)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call router.push when list item is pressed and item has onPress', () => {
		const listItems = component.root.findAllByProps({ testID: 'list-item' })

		for (const listItem of listItems) {
			listItem.props.onPress?.()
		}

		expect(router.push).toHaveBeenCalledWith('training/sportSession')
		expect(router.push).toHaveBeenCalledWith('training/sportSessionHistory')
	})
})
