import RegisterContainer from 'containers/Register'
import registerImage from 'assets/images/login-wallpaper.jpg'
import 'pages/Register/_index.scss'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'

export default function Login() {
	return (
		<div className='register'>
			<main className='section-main'>
				<Typography className='title' variant='h1'>
					SportApp
				</Typography>
				<Paper className='card-register'>
					<Typography className='card-title' variant='h6'>
						Registro
					</Typography>
					<RegisterContainer />
					<Button
						fullWidth
						type='button'
						variant='text'
						className='navigation'>
						Iniciar sesión
					</Button>
				</Paper>
			</main>
			<section className='section-secondary'>
				<figure className='container-image'>
					<img
						className='image-register'
						src={registerImage}
						alt='register'
					/>
				</figure>
			</section>
		</div>
	)
}
