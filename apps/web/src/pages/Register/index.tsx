import SecondarySection from '@/components/SecondarySection'
import RegisterContainer from '@/containers/Register'
import { FormData } from '@/containers/Register/Default/utils/schema'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { RegisterUserRequest } from '@sportapp/sportapp-repository/src/user/interfaces'
import { globalVariables } from '@sportapp/sportapp-repository/src/utils/global-variables'
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
	const { register } = useAuthStore()

	const handleNext = () => {
		if (step < 2) {
			setStep(step + 1)
		}
	}

	const handleFirstSubmit = async (data: FormData) => {
		console.log(data)
		console.log(globalVariables().VITE_SPORTAPP_API_URL)

		const payload: RegisterUserRequest = {
			email: data.email,
			password: data.password,
			first_name: data.name,
			last_name: data.lastName
		}

		const result = await register(payload)

		if (result) {
			handleNext()
		} else {
			alert('Error')
		}
	}

	const handleSecondSubmit = (data: unknown) => {
		console.log(data)
		navigate('/home')
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
						onHandleFirstSubmit={handleFirstSubmit}
						onHandleSecondSubmit={handleSecondSubmit}
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
