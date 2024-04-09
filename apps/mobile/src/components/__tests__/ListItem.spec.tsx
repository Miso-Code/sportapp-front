import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import ListItem from '../ListItem'

describe('ListItem', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<ListItem title='Item' onPress={() => {}} />
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should call the onPress function when the item is pressed', () => {
		const onPress = jest.fn()
		component.update(<ListItem title='Click me' onPress={onPress} />)
		component.root.findByProps({ testID: 'list-item' }).props.onPress()
		expect(onPress).toHaveBeenCalled()
	})

	it('should not call the onPress function when the button is pressed and the onPress prop is not provided', () => {
		const onPress = jest.fn()
		component.update(<ListItem title="Don't click me" />)
		component.root.findByProps({ testID: 'list-item' }).props.onPress()
		expect(onPress).not.toHaveBeenCalled()
	})
})
