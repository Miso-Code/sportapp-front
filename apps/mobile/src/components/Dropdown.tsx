import React, { ComponentProps, useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import {
	TextInput,
	Text,
	Portal,
	List,
	Divider,
	Searchbar
} from 'react-native-paper'

import KeyboardAvoidingDialog from './KeyboardAvoidingDialog'
import { useTranslation } from 'react-i18next'

interface DropdownProps extends ComponentProps<typeof TextInput> {
	items: string[] | { label: string; value: string }[]
	value: string
	onSelect: (item: string) => void
	label: string
	mode?: 'outlined' | 'flat'
	searchable?: boolean
	disabled?: boolean
}

const Dropdown: React.FC<DropdownProps> = ({
	items,
	value,
	onSelect,
	label,
	mode = 'outlined',
	searchable,
	disabled,
	...props
}) => {
	const [visible, setVisible] = useState(false)
	const [selectedItem, setSelectedItem] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const { t } = useTranslation()

	const openMenu = () => !disabled && setVisible(true)
	const closeMenu = () => !disabled && setVisible(false)

	const handleItemSelect = (
		item: string | { label: string; value: string }
	) => {
		setSelectedItem(item instanceof Object ? item.label : item)
		onSelect(item instanceof Object ? item.value : item)
		closeMenu()
	}

	useEffect(() => {
		items[0] instanceof Object
			? setSelectedItem(
					(items as any[]).find((item) => item.value === value)?.label
			  )
			: setSelectedItem(value)
	}, [value, items])

	return (
		<>
			<Portal>
				<KeyboardAvoidingDialog
					visible={visible}
					onDismiss={() => setVisible(false)}>
					<ScrollView>
						<Text style={styles.label}>{label}</Text>
						{searchable && (
							<Searchbar
								testID='searchbar'
								placeholder={t('productService.search')}
								onChangeText={setSearchQuery}
								value={searchQuery}
							/>
						)}
						<List.Section>
							{items
								.filter((item) =>
									item instanceof Object
										? item.label
												.toLowerCase()
												.includes(
													searchQuery.toLowerCase()
												)
										: item
												.toLowerCase()
												.includes(
													searchQuery.toLowerCase()
												)
								)
								.map((item, index) => (
									<React.Fragment
										key={item.toString() + index}>
										<List.Item
											testID='dropdown-item'
											title={
												item instanceof Object
													? item.label
													: item
											}
											onPress={() =>
												handleItemSelect(item)
											}
										/>
										{index < items.length - 1 && (
											<Divider />
										)}
									</React.Fragment>
								))}
						</List.Section>
					</ScrollView>
				</KeyboardAvoidingDialog>
			</Portal>
			<View style={styles.container}>
				<TextInput
					mode={mode}
					label={label}
					value={selectedItem}
					right={<TextInput.Icon icon='menu-down' />}
					editable={false}
					disabled={disabled}
					{...props}
				/>
				<Pressable
					testID='dropdown-pressable'
					style={styles.pressable}
					onPress={openMenu}
				/>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	label: {
		marginBottom: 10
	},
	container: {
		flex: 1,
		position: 'relative'
	},
	pressable: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}
})

export default Dropdown
