import SecondarySection from '@/components/SecondarySection'
import TransitionAlert from '@/components/TransitionAlert'
import RegisterPartnerContainer from '@/containers/Partner/Register'
import { FormData } from '@/containers/Partner/Register/utils/schema'
import { Button } from '@mui/material'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { RegisterBusinessPartnerRequest } from '@sportapp/sportapp-repository/src/business-partner/interfaces/api/register'
import { usePartnerAuthStore } from '@sportapp/stores/src/partner/auth'
import registerImage from 'assets/images/login-partner-wallpaper.jpg'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './_index.scss'

export default function Register() {
	const [alertState, setAlert] = useState(false)
	const navigate = useNavigate()

	const { t } = useTranslation()
	const { register, logout } = usePartnerAuthStore()
	const { loading, error } = usePartnerAuthStore()

	const handleFirstSubmit = async (data: FormData) => {
		const payload: RegisterBusinessPartnerRequest = {
			email: data.email.toLowerCase(),
			password: data.password,
			business_partner_name: data.companyName
		}

		const result = await register(payload)

		if (result) {
			navigate('/partner/home')
		} else {
			setAlert(true)
		}
	}

	const handleGoToLogin = () => {
		navigate('/partner/login')
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
					<Paper variant='outlined' className={`card-register`}>
						<Typography className='card-title' variant='h6'>
							{t('register.partner.title')}
						</Typography>
						<RegisterPartnerContainer
							onHandleSubmit={handleFirstSubmit}
							isDisabled={loading}
						/>

						<div className='flex items-center justify-center navigation'>
							<Typography
								className='card-subtitle'
								variant='subtitle1'>
								{t('register.login.question')}
							</Typography>
							<Button
								type='button'
								disabled={loading}
								onClick={handleGoToLogin}
								variant='text'
								title={t('register.button')}>
								{t('register.login.default')}
							</Button>
						</div>
					</Paper>
				</main>

				<SecondarySection
					image={registerImage}
					altImage={t('register.image')}
				/>
			</div>
			<TransitionAlert
				containerClassName='alert-register-container'
				isOpen={alertState}
				handleClose={setAlert}
				message={t(error ?? 'errors.register.base')}
				severity='error'
			/>
		</>
	)
}
