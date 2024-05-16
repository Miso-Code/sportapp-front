import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Props } from './interfaces'
import './_index.scss'

export default function CardProduct({
	title,
	description,
	image,
	onClick
}: Props) {
	return (
		<Card
			sx={{
				width: 345,
				'@media (min-width: 600px)': { width: 500 }
			}}
			className='card-product'>
			<CardActionArea
				onClick={onClick}
				sx={{
					display: 'flex',
					justifyContent: 'unset',
					alignItems: 'unset',
					height: '8rem'
				}}>
				<CardMedia
					className='card-product-image'
					component='img'
					sx={{
						width: 151,
						objectFit: 'cover',
						objectPosition: 'center'
					}}
					image={image}
					alt='Live from space album cover'
				/>
				<Box sx={{ display: 'flex', flexDirection: 'column' }}>
					<CardContent sx={{ flex: '1 0 auto' }}>
						<Typography
							noWrap
							className='card-product-title'
							component='p'
							variant='h5'>
							{title}
						</Typography>
						<Typography
							className='card-product-description'
							variant='subtitle1'
							color='text.secondary'
							component='p'>
							{description}
						</Typography>
					</CardContent>
				</Box>
			</CardActionArea>
		</Card>
	)
}
