import SecondarySection from '@/components/SecondarySection'
import RegisterContainer from '@/containers/Register'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import registerImage from 'assets/images/login-wallpaper.jpg'
import 'pages/Register/_index.scss'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function Register() {
	const [step, setStep] = useState(0)
	const { t } = useTranslation()

	const handleNext = () => {
		if (step < 2) {
			setStep(step + 1)
		} else {
			setStep(0)
		}
	}

	return (
		<div className='register'>
			<main className='section-main'>
				<Typography className='title' variant='h1'>
					{t('app.name')}
				</Typography>
				<Paper className='card-register'>
					<Typography className='card-title' variant='h6'>
						{t(step === 0 ? 'register.default' : 'register.full')}
					</Typography>
					<RegisterContainer
						step={step}
						onHandleFirstSubmit={handleNext}
						onHandleSecondSubmit={handleNext}
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
