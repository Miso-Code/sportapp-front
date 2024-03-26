import { useTranslation } from 'react-i18next'
import './App.scss'

function App() {
	const { t } = useTranslation()

	return (
		<>
			<h1>{t('app.name')}</h1>
		</>
	)
}

export default App
