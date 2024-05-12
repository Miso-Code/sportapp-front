import { Box, Dialog } from '@mui/material'
import { useMemo } from 'react'
import { EventTypes } from '../CustomCalendar/interfaces'
import EventCard from './components/EventCard'
import SessionCard from './components/TrainingCard'
import { Props } from './interfaces'

export function DialogEvent({ onClose, selectedValue, open }: Props) {
	const handleClose = () => {
		onClose()
	}

	const cardShow = useMemo(
		() => ({
			[EventTypes.EVENT]: <EventCard selectedValue={selectedValue} />,
			[EventTypes.TRAINING]: <SessionCard selectedValue={selectedValue} />
		}),
		[selectedValue]
	)

	return (
		<Dialog onClose={handleClose} open={open}>
			<Box sx={{ width: 375 }}>
				{cardShow[selectedValue.type as 'event' | 'training']}
			</Box>
		</Dialog>
	)
}
