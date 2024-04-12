import React from 'react'
import { StyleSheet } from 'react-native'
import { List, ListIconProps } from 'react-native-paper'

const LeftIcon = ({ icon, ...props }) => <List.Icon {...props} icon={icon} />
const RightIcon = (props) => <List.Icon {...props} icon='chevron-right' />

const ListItem: React.FC<{
	icon?: ListIconProps['icon']
	title: string
	onPress?: () => void
}> = ({ icon = 'folder', title, onPress = () => {} }) => {
	return (
		<List.Item
			testID='list-item'
			title={title}
			left={(props) => <LeftIcon {...props} icon={icon} />}
			right={(props) => <RightIcon {...props} />}
			onPress={onPress}
			style={styles.listItem}
		/>
	)
}

const styles = StyleSheet.create({
	listItem: {
		marginVertical: 5,
		borderColor: '#E0E0E0', // use theme colors
		borderWidth: 1,
		borderRadius: 5
	}
})

export default ListItem
