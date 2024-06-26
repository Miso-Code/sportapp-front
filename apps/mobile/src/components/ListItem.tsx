import React, { ComponentProps } from 'react'
import { StyleSheet } from 'react-native'
import { List, ListIconProps } from 'react-native-paper'

const LeftIcon = ({ icon, ...props }) => <List.Icon {...props} icon={icon} />
const RightIcon = (props) => <List.Icon {...props} icon='chevron-right' />

const ListItem: React.FC<
	{
		icon?: ListIconProps['icon']
		title: string
		onPress?: () => void
		variant?: 'flat' | 'outlined'
	} & ComponentProps<typeof List.Item>
> = ({
	icon = 'folder',
	title,
	onPress = () => {},
	variant = 'outlined',
	...props
}) => {
	return (
		<List.Item
			{...props}
			testID='list-item'
			title={title}
			/* eslint-disable react/no-unstable-nested-components*/
			left={(leftProps) => (
				<LeftIcon {...leftProps} icon={icon} key='leftIcon' />
			)}
			right={(rightProps) => (
				<RightIcon {...rightProps} key='rightIcon' />
			)}
			/* eslint-enable react/no-unstable-nested-components*/
			onPress={onPress}
			style={styles[variant]}
		/>
	)
}

const styles = StyleSheet.create({
	outlined: {
		marginVertical: 5,
		borderColor: '#E0E0E0', // use theme colors
		borderWidth: 1,
		borderRadius: 5
	},
	flat: {
		marginVertical: 5
	}
})

export default ListItem
