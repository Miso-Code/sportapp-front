import SecondarySection from '@/components/SecondarySection'
import RegisterContainer from '@/containers/Register'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useAuthStore } from '@sportapp/stores/src/auth'
import registerImage from 'assets/images/login-wallpaper.jpg'
import 'pages/Register/_index.scss'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const [step, setStep] = useState(0)
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { login } = useAuthStore()

	const handleNext = () => {
		if (step < 2) {
			setStep(step + 1)
		}
	}

	const handleSubmit = async () => {
		const result = await login('a', 'b')

		if (result) {
			navigate('/home')
		} else {
			alert('Error')
		}
	}

	return (
		<div className='register'>
			<main className='section-main'>
				<Typography className='title' variant='h1'>
					{t('app.name')}
				</Typography>
				<Paper
					variant='outlined'
					className={`card-register ${
						step !== 0 && 'card-register__full'
					}`}>
					<Typography className='card-title' variant='h6'>
						{t(step === 0 ? 'register.default' : 'register.full')}
					</Typography>
					<RegisterContainer
						step={step}
						onHandleFirstSubmit={handleNext}
						onHandleSecondSubmit={handleSubmit}
					/>
					{step === 0 && (
						<Button
							fullWidth
							type='button'
							variant='text'
							title={t('register.button')}
							className='navigation'>
							{t('register.login')}
						</Button>
					)}
				</Paper>
			</main>
			{step === 0 && (
				<SecondarySection
					image={registerImage}
					altImage={t('register.image')}
				/>
			)}
		</div>
	)
}
