import SecondarySection from '@/components/SecondarySection'
import TransitionAlert from '@/components/TransitionAlert'
import RegisterContainer from '@/containers/Register'
import { FormData } from '@/containers/Register/Default/utils/schema'
import { FormData as FormDataFull } from '@/containers/Register/Full/utils/schema'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import {
	RegisterFullUserRequest,
	RegisterUserRequest
} from '@sportapp/sportapp-repository/src/user/interfaces'
import { useAuthStore } from '@sportapp/stores/src/auth'
import registerImage from 'assets/images/login-wallpaper.jpg'
import { format } from 'date-fns'
import 'pages/Register/_index.scss'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export default function Register() {
	const [step, setStep] = useState(0)
	const [alert, setAlert] = useState(false)
	const navigate = useNavigate()

	const { t } = useTranslation()
	const { register, registerFull, logout } = useAuthStore()
	const { loading, error, user } = useAuthStore()

	const handleNext = () => {
		if (step < 2) {
			setStep(step + 1)
		}
	}

	const handleFirstSubmit = async (data: FormData) => {
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
			setAlert(true)
		}
	}

	const handleSecondSubmit = async (data: FormDataFull) => {
		const payload: RegisterFullUserRequest = {
			birth_date: format(data.birthday, 'yyyy-MM-dd'),
			country_of_birth: data.nationality.country,
			city_of_birth: data.nationality.city,
			city_of_residence: data.residence.city,
			country_of_residence: data.residence.country,
			gender: data.gender,
			identification_number: data.documentNumber,
			identification_type: data.documentType,
			residence_age: parseInt(data.residence.lengthOfStay)
		}

		const result = await registerFull(payload)

		if (result) navigate('/home')
		else setAlert(true)
	}

	const handleGoToLogin = () => {
		navigate('/')
	}

	useEffect(() => {
		logout()
	}, [logout])

	return (
		<>
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
							{t(
								step === 0
									? 'register.default'
									: 'register.full'
							)}
						</Typography>
						<RegisterContainer
							step={step}
							isDisabled={loading}
							onHandleFirstSubmit={handleFirstSubmit}
							onHandleSecondSubmit={handleSecondSubmit}
							secondDefaultValues={{
								documentNumber: '',
								documentType: '',
								email: user?.email ?? '',
								name: user?.first_name ?? '',
								lastName: user?.last_name ?? '',
								nationality: {
									city: '',
									country: ''
								},
								residence: {
									city: '',
									country: '',
									lengthOfStay: ''
								},
								password: '********',
								birthday: '',
								gender: ''
							}}
						/>
						{step === 0 && (
							<div className='flex items-center justify-center navigation'>
								<Typography
									className='card-subtitle'
									variant='subtitle1'>
									{t('register.login.question')}
								</Typography>
								<Button
									type='button'
									disabled={loading}
									variant='text'
									onClick={handleGoToLogin}
									title={t('register.button')}>
									{t('register.login.default')}
								</Button>
							</div>
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
			<TransitionAlert
				containerClassName='alert-register-container'
				isOpen={alert}
				handleClose={setAlert}
				message={t(error ?? 'errors.register.base')}
				severity='error'
			/>
		</>
	)
}
