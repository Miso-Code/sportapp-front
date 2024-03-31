import RegisterFullContainer from '@/containers/Register/Full'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import registerImage from 'assets/images/login-wallpaper.jpg'
import 'pages/Register/_index.scss'
import { useTranslation } from 'react-i18next'

export default function Register() {
	const { t } = useTranslation()
	return (
		<div className='register'>
			<main className='section-main'>
				<Typography className='title' variant='h1'>
					{t('app.name')}
				</Typography>
				<Paper className='card-register'>
					<Typography className='card-title' variant='h6'>
						{t('register.default')}
					</Typography>
					{/* <RegisterContainer onHandleSubmit={console.log} /> */}
					<RegisterFullContainer onHandleSubmit={console.log} />
					<Button
						fullWidth
						type='button'
						variant='text'
						title={t('register.button')}
						className='navigation'>
						{t('register.login')}
					</Button>
				</Paper>
			</main>
			<section className='section-secondary'>
				<figure className='container-image'>
					<img
						className='image-register'
						src={registerImage}
						alt={t('register.image')}
					/>
				</figure>
			</section>
		</div>
	)
}
