import LoginContainer from 'containers/Login'
import loginImage from 'assets/images/login-wallpaper.jpg'
import 'pages/Login/_index.scss'

export default function Login() {
	return (
		<div className='login'>
			<main className='section-main'>
				<LoginContainer />
			</main>
			<section className='section-secondary'>
				<figure className='container-image'>
					<img className='image-login' src={loginImage} alt='Login' />
				</figure>
			</section>
		</div>
	)
}
