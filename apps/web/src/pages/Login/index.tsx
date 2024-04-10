import SecondarySection from '@/components/SecondarySection'
import TransitionAlert from '@/components/TransitionAlert'
import LoginContainer from '@/containers/Login'
import { FormData } from '@/containers/Login/utils/schema'
import { Button, Paper, Typography } from '@mui/material'
import { useAuthStore } from '@sportapp/stores/src/auth'
import registerImage from 'assets/images/login-wallpaper.jpg'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './_index.scss'

export default function Login() {
	const [alert, setAlert] = useState(false)
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { loading, error } = useAuthStore()
	const { login } = useAuthStore()

	const handleSubmit = async (data: FormData) => {
		const result = await login(data)

		if (result) {
			navigate('/home')
		} else {
			setAlert(true)
		}
	}

	const handleGoToRegister = () => {
		navigate('/register')
	}

	return (
		<>
			<div className='login'>
				<main className='section-main'>
					<Typography className='title' variant='h1'>
						{t('app.name')}
					</Typography>
					<Paper variant='outlined' className='card-login'>
						<Typography className='card-title' variant='h6'>
							{t('login.default')}
						</Typography>
						<LoginContainer
							isDisabled={loading}
							onHandleSubmit={handleSubmit}
						/>

						<Button
							type='button'
							fullWidth
							disabled={loading}
							onClick={handleGoToRegister}
							variant='text'
							className='navigation'
							title={t('login.button')}>
							{t('login.register.go')}
						</Button>
					</Paper>
				</main>
				<SecondarySection
					image={registerImage}
					altImage={t('login.image')}
				/>
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
