import ContainerLayout from '@/components/ContainerLayout'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ConfigMenu from './components/Menu'
import './_index.scss'
import { useState } from 'react'

export default function ConfigPage() {
	const { t } = useTranslation()
	const [selected, setSelected] = useState(-1)
	return (
		<ContainerLayout className='config'>
			<section className='config-section'>
				<Typography className='config-title' variant='h3'>
					{t('config.title')}
				</Typography>
				<ConfigMenu selected={selected} setSelected={setSelected} />
			</section>
		</ContainerLayout>
	)
}
