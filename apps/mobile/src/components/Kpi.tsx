import React, { ComponentProps } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTheme, Text, Icon } from 'react-native-paper'

import { ProgressChart, LineChart } from 'react-native-chart-kit'
import { hexToRgb } from '@/components/TimerRing'

interface BaseKpiProps {
	color?: string
}

interface ProgressKpiProps extends BaseKpiProps {
	type: 'progress'
	value: number
	max: number
	label: string
	valueSuffix?: string
	icon?: ComponentProps<typeof Icon>['source']
}

interface LineChartKpiProps extends BaseKpiProps {
	type: 'lineChart'
	data: number[]
	labels: string[]
	label: string
}

type KpiProps = ProgressKpiProps | LineChartKpiProps

export default function Kpi(props: KpiProps) {
	const theme = useTheme()
	const colorRGB = hexToRgb(props.color || theme.colors.primary)
	const textColorRGB = hexToRgb(theme.colors.onBackground)

	return (
		<View style={styles.container}>
			{props.type === 'progress' && (
				<>
					<ProgressChart
						data={{
							data: [props.value / props.max]
						}}
						width={200}
						height={200}
						strokeWidth={16}
						radius={75}
						chartConfig={{
							backgroundGradientFromOpacity: 0,
							backgroundGradientToOpacity: 0,
							color: (opacity = 1) =>
								`rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${opacity})`
						}}
						hideLegend={true}
						data-testid='progressBar'
					/>
					<View style={styles.content}>
						{props.icon && (
							<Icon
								source={props.icon}
								size={35}
								color={props.color || theme.colors.primary}
								testID='icon'
							/>
						)}
						<Text variant='titleMedium'>
							{props.value} {props.valueSuffix}
						</Text>
						<Text variant='headlineSmall'>{props.label}</Text>
					</View>
				</>
			)}
			{props.type === 'lineChart' && (
				<>
					<LineChart
						data={{
							labels: props.labels,
							datasets: [
								{
									data: props.data
								}
							]
						}}
						width={350}
						height={200}
						chartConfig={{
							backgroundGradientFromOpacity: 0,
							backgroundGradientToOpacity: 0,
							color: (opacity = 1) =>
								`rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${opacity})`,
							labelColor: (opacity = 1) =>
								`rgba(${textColorRGB.r}, ${textColorRGB.g}, ${textColorRGB.b}, ${opacity})`
						}}
						bezier
						data-testid='lineChart'
					/>
					<View style={styles.content}>
						<Text variant='headlineSmall'>{props.label}</Text>
					</View>
				</>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	content: {
		position: 'absolute',
		alignItems: 'center'
	}
})
