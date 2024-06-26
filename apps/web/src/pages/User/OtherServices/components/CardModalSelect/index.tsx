import {
	Box,
	Button,
	CardActions,
	CardContent,
	CardMedia,
	TextField,
	Typography
} from '@mui/material'
import MuiMarkdown from 'mui-markdown'
import { Props } from './interfaces'
import { useTranslation } from 'react-i18next'

export default function CardModalSelect({
	selectedProduct,
	quantity,
	handleQuantityChange,
	handleClose,
	handleSuccess
}: Props) {
	const { t } = useTranslation()
	return (
		<CardContent>
			<Typography variant='h6'>{selectedProduct.name}</Typography>
			<CardMedia
				component='img'
				height='240'
				image={selectedProduct.image_url}
				alt={selectedProduct.name}
			/>
			<Typography sx={{ mt: 2 }} variant='body2'>
				{selectedProduct.summary}
			</Typography>
			<Box sx={{ my: 2, maxHeight: '15rem', overflowY: 'auto' }}>
				<MuiMarkdown>{selectedProduct.summary}</MuiMarkdown>
			</Box>
			<Box>
				<TextField
					id='quantity'
					name='quantity'
					type='number'
					inputMode='numeric'
					placeholder='0'
					value={quantity}
					fullWidth
					onChange={handleQuantityChange}
					label={t('productService.quantity')}
					variant='outlined'
				/>
			</Box>
			<CardActions
				sx={{
					display: 'flex',
					justifyContent: 'end',
					marginTop: '1rem'
				}}>
				<Button size='small' color='error' onClick={handleClose}>
					{t('productService.close')}
				</Button>
				<Button size='small' onClick={handleSuccess}>
					{t('productService.buy')}
				</Button>
			</CardActions>
		</CardContent>
	)
}
