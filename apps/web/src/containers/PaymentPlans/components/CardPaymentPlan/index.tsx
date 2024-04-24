import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import {
	Card,
	CardContent,
	Chip,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography
} from '@mui/material'
import { Props } from './interfaces'

export default function CardPaymentPlan({
	name,
	description,
	className = '',
	benefits,
	price,
	duration,
	isActive = false,
	activeText = 'Active',
	...props
}: Props) {
	return (
		<Card className={`px-2 pb-4 max-w-[24rem] ${className}`} {...props}>
			<CardContent className='flex justify-between'>
				<Typography variant='h6'>{name}</Typography>
				{isActive && (
					<Chip
						label={activeText}
						color='primary'
						variant='outlined'
						className='bg-[#2195f337]'
						size='medium'
					/>
				)}
			</CardContent>
			<CardContent className='py-0'>
				<Typography variant='caption'>{description}</Typography>
			</CardContent>
			<CardContent className='flex items-end'>
				<Typography component='p' variant='h2'>
					${price}
					<span className='text-3xl'>/ {duration}</span>
				</Typography>
			</CardContent>
			<CardContent className='py-0'>
				<List>
					{benefits.map((benefit, index) => (
						<ListItem key={index} className='p-0'>
							<ListItemIcon>
								{benefit.isActive ? (
									<CheckCircleIcon />
								) : (
									<CancelIcon />
								)}
							</ListItemIcon>
							<ListItemText primary={benefit.description} />
						</ListItem>
					))}
				</List>
			</CardContent>
		</Card>
	)
}
