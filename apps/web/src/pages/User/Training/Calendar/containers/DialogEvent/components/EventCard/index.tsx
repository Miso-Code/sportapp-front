import { Box, Card, CardContent, Typography } from '@mui/material'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CustomEvent } from '../../../CustomCalendar/interfaces'

export default function EventCard({
	selectedValue
}: {
	selectedValue: CustomEvent
}) {
	return (
		<Card>
			<CardContent>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						pb: 2
					}}>
					<Typography variant='body1' color='GrayText'>
						{format(
							selectedValue.start as Date,
							'dd MMMM yyyy hh:mm a',
							{
								locale: es
							}
						)}
					</Typography>
				</Box>
				<Typography gutterBottom variant='h6'>
					{selectedValue.title}
				</Typography>
				<Typography variant='body2' color='GrayText' component='div'>
					{selectedValue.description}
				</Typography>
			</CardContent>
		</Card>
	)
}
