import { Box } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { Props } from './interfaces'
import { useCallback, useEffect, useState } from 'react'
import { PieValueType } from '@mui/x-charts'

export default function GaugeChart({
	size = {
		width: 200,
		height: 200
	},
	children,
	value,
	maxValue,
	color = '#b02323'
}: Props) {
	const [data, setData] = useState<PieValueType[]>([])

	const handleSetDataValueChart = useCallback(
		(valueChart: number) => {
			const dataValue =
				Math.min(Math.max(0, valueChart), maxValue) / maxValue

			setData([
				{
					id: 'A',
					value,
					label: 'A',
					color
				},
				{
					id: 'B',
					value: maxValue - dataValue,
					label: 'B',
					color: '#bbbbbb'
				}
			])
		},
		[color, maxValue, value]
	)

	useEffect(() => {
		handleSetDataValueChart(value)
	}, [handleSetDataValueChart, value, maxValue])

	return (
		<Box
			style={{
				position: 'relative',
				width: size.width,
				height: size.height
			}}>
			<PieChart
				series={[{ data, innerRadius: 80 }]}
				margin={{ right: 5 }}
				slotProps={{
					legend: { hidden: true }
				}}
				{...size}
			/>
			<Box
				sx={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					display: 'grid',
					placeContent: 'center'
				}}>
				{children}
			</Box>
		</Box>
	)
}
