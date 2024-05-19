import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { TimePickerModal } from 'react-native-paper-dates'

function parseTime(timeString: string) {
	const date = dayjs(timeString, 'hh:mm A')
	const hours = date.hour()
	const minutes = date.minute()
	return { hours, minutes }
}

function formatTime(hours: number, minutes: number) {
	const date = dayjs().hour(hours).minute(minutes)
	return date.format('hh:mm A')
}

interface TimePickerProps
	extends Omit<React.ComponentProps<typeof TextInput>, 'children'> {
	value?: string
	onPress?: () => void
}

const TimePicker: React.FC<TimePickerProps> = ({
	mode,
	label,
	disabled,
	value,
	onChangeText,
	...props
}) => {
	const { i18n } = useTranslation()

	const [visible, setVisible] = useState(false)
	const [time, setTime] = useState(value)

	const onDismiss = useCallback(() => {
		setVisible(false)
	}, [setVisible])

	const onConfirm = useCallback(
		({ hours, minutes }) => {
			setVisible(false)
			setTime(formatTime(hours, minutes))
			onChangeText && onChangeText(formatTime(hours, minutes))
		},
		[setVisible, onChangeText]
	)

	const { hours = 12, minutes = 0 } = value ? parseTime(value) : {}
	return (
		<View>
			<TimePickerModal
				data-testId='timePickerModal'
				locale={i18n.language}
				visible={visible}
				onDismiss={onDismiss}
				onConfirm={onConfirm}
				hours={hours}
				minutes={minutes}
			/>
			<View style={styles.container}>
				<TextInput
					mode={mode}
					label={label}
					value={time}
					right={<TextInput.Icon icon='clock-outline' />}
					editable={false}
					disabled={disabled}
					{...props}
				/>
				<Pressable
					testID='timePickerPressable'
					style={styles.pressable}
					onPress={() => !disabled && setVisible(true)}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
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

export default TimePicker
