import {
	Card,
	CardContent,
	List,
	ListItem,
	Typography
} from '@mui/material'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { useTranslation } from 'react-i18next'
import { CustomEvent } from '../../../CustomCalendar/interfaces'

export default function SessionCard({
	selectedValue
}: {
	selectedValue: CustomEvent
}) {
	const { t } = useTranslation()
	return (
		<Card>
			<CardContent>
				<Typography variant='body1' color='GrayText'>
					{format(
						selectedValue.start as Date,
						'dd MMMM yyyy hh:mm a',
						{
							locale: es
						}
					)}
				</Typography>
				<Typography gutterBottom variant='h6'>
					{selectedValue.title}
				</Typography>
				<List disablePadding>
					<ListItem
						disablePadding
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}>
						<Typography
							sx={{
								fontWeight: 700
							}}>
							{t('training.warmUp')}
						</Typography>
						<Typography>
							{(selectedValue.warm_up || 0) * 60}
						</Typography>
					</ListItem>
					<ListItem
						disablePadding
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}>
						<Typography
							sx={{
								fontWeight: 700
							}}>
							{t('training.cardio')}
						</Typography>
						<Typography>
							{(selectedValue.cardio || 0) * 60}
						</Typography>
					</ListItem>
					<ListItem
						disablePadding
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}>
						<Typography
							sx={{
								fontWeight: 700
							}}>
							{t('training.strength')}
						</Typography>
						<Typography>
							{(selectedValue.strength || 0) * 60}
						</Typography>
					</ListItem>
					<ListItem
						disablePadding
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}>
						<Typography
							sx={{
								fontWeight: 700
							}}>
							{t('training.coolDown')}
						</Typography>
						<Typography>
							{(selectedValue.cool_down || 0) * 60}
						</Typography>
					</ListItem>
				</List>
			</CardContent>
		</Card>
	)
}
