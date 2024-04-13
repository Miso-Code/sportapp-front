import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme, Text } from 'react-native-paper'

import { ProgressChart } from 'react-native-chart-kit'

export function hexToRgb(hex: string) {
	if (hex.startsWith('rgb')) {
		const [r, g, b] = hex
			.replace(/rgba?\(/g, '')
			.replace(')', '')
			.split(',')
			.map((val) => parseInt(val, 10))
		return { r, g, b }
	}

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
		  }
		: null
}

export const formatTime = (time: number) => {
	const minutes = Math.floor(time / 60)
	const seconds = time % 60
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

interface TimeRingProps {
	currentTime: number
	maxTime: number
}

const TimerRing: FC<TimeRingProps> = ({ currentTime, maxTime }) => {
	const theme = useTheme()
	const primaryRGB = hexToRgb(theme.colors.primary)

	const data = {
		data: [currentTime / maxTime]
	}
	return (
		<View style={styles.container}>
			<ProgressChart
				data={data}
				width={250}
				height={250}
				strokeWidth={16}
				radius={100}
				chartConfig={{
					backgroundGradientFromOpacity: 0,
					backgroundGradientToOpacity: 0,
					color: (opacity = 1) =>
						`rgba(${primaryRGB.r}, ${primaryRGB.g}, ${primaryRGB.b}, ${opacity})`
				}}
				hideLegend={true}
			/>
			<Text variant='headlineLarge' style={styles.text}>
				{formatTime(currentTime)}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		position: 'absolute',
		fontWeight: 'bold'
	}
})

export default TimerRing
