import React from 'react'
import renderer, { ReactTestRenderer, act } from 'react-test-renderer'

import Dropdown from '../Dropdown'
import { List, TextInput } from 'react-native-paper'
import KeyboardAvoidingDialog from '../KeyboardAvoidingDialog'

jest.mock('react-native-safe-area-context')

jest.mock('../KeyboardAvoidingDialog', () =>
	jest.fn(({ children }) => children)
)

jest.mock('react-native-paper', () => {
	const textInput = jest.requireActual('react-native').TextInput
	textInput.Icon = jest.requireActual('react-native-paper').TextInput.Icon
	return {
		...jest.requireActual('react-native-paper'),
		Portal: jest.fn(({ children }) => children),
		TextInput: textInput, //prevents animation issues on jest
		Searchbar: jest.fn((props) => <view {...props} />)
	}
})

describe('Dropdown', () => {
	let component: ReactTestRenderer
	let onSelect: jest.Mock

	beforeEach(() => {
		jest.clearAllMocks()
		onSelect = jest.fn()
		component = renderer.create(
			<Dropdown
				label='Test'
				items={['item1', 'item2']}
				value={'item1'}
				onSelect={onSelect}
			/>
		)
	})

	afterEach(() => {
		component.unmount()
	})

	it('should render correctly', () => {
		expect(component.toJSON()).toMatchSnapshot()
	})

	it('should render selected item', async () => {
		await act(async () => {
			await Promise.resolve() // wait for useEffect to run
		})
		const text = component.root.findByType(TextInput)
		expect(text.props.value).toBe('item1')
	})

	it('should open the dropdown when pressed', () => {
		const dialog = component.root.findByType(KeyboardAvoidingDialog)
		expect(dialog.props.visible).toBe(false)
		const inputPressable = component.root.findByProps({
			testID: 'dropdown-pressable'
		})
		act(() => inputPressable.props.onPress())
		expect(dialog.props.visible).toBe(true)
	})

	it('should render items in the dropdown', () => {
		const items = component.root.findAllByType(List.Item)
		expect(items.length).toBe(2)
	})

	it('should call onSelect when an item is pressed', () => {
		const item = component.root.findAllByType(List.Item)[1]
		act(() => item.props.onPress())
		expect(onSelect).toHaveBeenCalledWith('item2')
	})

	it('should close the dropdown when an item is pressed', () => {
		const item = component.root.findAllByType(List.Item)[1]
		act(() => item.props.onPress())
		const dialog = component.root.findByType(KeyboardAvoidingDialog)
		expect(dialog.props.visible).toBe(false)
	})

	it('should close the dropdown on dismiss', () => {
		const dialog = component.root.findByType(KeyboardAvoidingDialog)
		act(() => dialog.props.onDismiss())
		expect(dialog.props.visible).toBe(false)
	})

	it('it should not render a searchbar if searchable is false', () => {
		const searchbar = component.root.findAllByProps({ testID: 'searchbar' })
		expect(searchbar.length).toBe(0)
	})

	it('should filter items when search query is set', async () => {
		act(() => {
			component.update(
				<Dropdown
					label='Test'
					items={['item1', 'item2']}
					value={'item1'}
					onSelect={onSelect}
					searchable
				/>
			)
		})

		const searchbar = component.root.findByProps({ testID: 'searchbar' })
		act(() => searchbar.props.onChangeText('item2'))
		const items = component.root.findAllByType(List.Item)
		expect(items.length).toBe(1)
		expect(items[0].props.title).toBe('item2')
	})

	it('should render items with labels', async () => {
		component.update(
			<Dropdown
				label='Test'
				items={[
					{ label: 'item1', value: 'value1' },
					{ label: 'item2', value: 'value2' }
				]}
				value={'value1'}
				onSelect={onSelect}
			/>
		)
		const items = component.root.findAllByType(List.Item)
		expect(component.toJSON()).toMatchSnapshot()
		expect(items[0].props.title).toBe('item1')
		expect(items[1].props.title).toBe('item2')
		await act(async () => {
			await Promise.resolve() // wait for useEffect to run
		})
		const text = component.root.findByType(TextInput)
		expect(text.props.value).toBe('item1')
	})

	it('should update selected item when value with label is selected', () => {
		component.update(
			<Dropdown
				label='Test'
				items={[
					{ label: 'item1', value: 'value1' },
					{ label: 'item2', value: 'value2' }
				]}
				value={'value1'}
				onSelect={onSelect}
			/>
		)
		const items = component.root.findAllByType(List.Item)
		act(() => items[1].props.onPress())
		expect(onSelect).toHaveBeenCalledWith('value2')
	})
})
