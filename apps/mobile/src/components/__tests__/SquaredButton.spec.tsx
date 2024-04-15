import React from 'react'
import renderer, { ReactTestRenderer } from 'react-test-renderer'

import SquaredButton from '../SquaredButton'

describe('SquaredButton', () => {
	let component: ReactTestRenderer

	beforeEach(() => {
		component = renderer.create(
			<SquaredButton value='Ingresar' onPress={() => {}} />
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render correctly without props', () => {
		component.update(<SquaredButton />)
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render a button with the text "Ingresar"', () => {
		expect(
			component.root.findByProps({ testID: 'button-text' }).props.children
		).toBe('Ingresar')
	})

	it('should call the onPress function when the button is pressed', () => {
		const onPress = jest.fn()
		component.update(<SquaredButton value='Ingresar' onPress={onPress} />)
		component.root.findByProps({ testID: 'button' }).props.onPress()
		expect(onPress).toHaveBeenCalled()
	})

	it('should not call the onPress function when the button is pressed and the onPress prop is not provided', () => {
		const onPress = jest.fn()
		component.update(<SquaredButton value='Ingresar' />)
		component.root.findByProps({ testID: 'button' }).props.onPress()
		expect(onPress).not.toHaveBeenCalled()
	})
})
