import { LineChart as LineChartMui } from '@mui/x-charts/LineChart'
import { Props } from './interfaces'
import { Box } from '@mui/material'

export default function LineChart({ data, label, ...props }: Props) {
	return (
		<Box {...props}>
			<LineChartMui
				xAxis={[
					{
						scaleType: 'point',
						data: ['min', 'avg', 'max'],
						label
					}
				]}
				series={[
					{
						data,
						area: true,
						showMark: true
					}
				]}
				width={450}
				height={300}
			/>
		</Box>
	)
}
