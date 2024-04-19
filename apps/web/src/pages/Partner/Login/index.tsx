import SecondarySection from '@/components/SecondarySection'
import TransitionAlert from '@/components/TransitionAlert'
import LoginContainer from '@/containers/Login'
import { FormData } from '@/containers/Login/utils/schema'
import { Button, Paper, Typography } from '@mui/material'
import { usePartnerAuthStore } from '@sportapp/stores/src/partner/auth'
import registerImage from 'assets/images/login-partner-wallpaper.jpg'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './_index.scss'

export default function LoginPartner() {
	const [alert, setAlert] = useState(false)
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { loading, error, logout } = usePartnerAuthStore()
	const { login } = usePartnerAuthStore()

	const handleSubmit = async (data: FormData) => {
		const payload = {
			email: data.email.toLowerCase(),
			password: data.password
		}
		const result = await login(payload)

		if (result) {
			navigate('/partner/home')
		} else {
			setAlert(true)
		}
	}

	const handleGoToRegister = () => {
		navigate('/partner/register')
	}

	useEffect(() => {
		logout()
	}, [logout])

	return (
		<>
			<div className='login-partner'>
				<main className='section-main'>
					<Typography className='title' variant='h1'>
						{t('app.name')}
					</Typography>
					<Paper variant='outlined' className='card-login-partner'>
						<Typography className='card-title' variant='h6'>
							{t('login.partner.title')}
						</Typography>
						<LoginContainer
							isDisabled={loading}
							onHandleSubmit={handleSubmit}
						/>

						<Button
							type='button'
							id='go-to-register'
							fullWidth
							disabled={loading}
							onClick={handleGoToRegister}
							variant='text'
							className='navigation-login-partner-register'
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
				containerClassName='alert-partner-login-container'
				isOpen={alert}
				handleClose={setAlert}
				message={t(error ?? 'errors.register.base')}
				severity='error'
			/>
		</>
	)
}
