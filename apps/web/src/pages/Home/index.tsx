import { useTranslation } from 'react-i18next'
import './_index.scss'
import Button from '@mui/material/Button'

function Home() {
	const { t } = useTranslation()

	return (
		<>
			<h1 className='text-9xl'>{t('app.name')}</h1>
			<Button variant='contained'>Hello world</Button>
		</>
	)
}

export default Home
