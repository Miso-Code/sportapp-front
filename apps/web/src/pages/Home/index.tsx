import ContainerLayout from '@/components/ContainerLayout'
import ProfileMenu from '@/pages/Home/components/Menu'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import './_index.scss'

function Home() {
	const { t } = useTranslation()

	return (
		<ContainerLayout className='home'>
			<section className='home-section'>
				<Typography className='home-title' variant='h3'>
					{t('profile.title')}
				</Typography>
				<ProfileMenu className='mt-14' />
			</section>
		</ContainerLayout>
	)
}

export default Home
