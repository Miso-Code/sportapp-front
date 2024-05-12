import {
	Box,
	Card,
	CardActionArea,
	CardContent,
	Chip,
	Typography
} from '@mui/material'
import { Props, StateTypes } from './interfaces'

export default function InfoCards({
	titleComponent,
	description,
	date,
	state,
	onClick,
	showChip = true
}: Props) {
	return (
		<Card>
			<CardActionArea onClick={onClick}>
				<CardContent>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							pb: 2
						}}>
						<Typography variant='body1' color='GrayText'>
							{date}
						</Typography>
						{showChip && (
							<Chip
								variant='filled'
								color={StateTypes[state.type]}
								label={state.text}
							/>
						)}
					</Box>
					<Typography gutterBottom variant='h6'>
						{titleComponent}
					</Typography>
					<Typography
						variant='body2'
						color='GrayText'
						component='div'>
						{description}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
