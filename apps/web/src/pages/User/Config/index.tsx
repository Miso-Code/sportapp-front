import ContainerLayout from '@/components/ContainerLayout'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import ConfigMenu from './components/Menu'
import './_index.scss'
import { useMemo, useState } from 'react'
import ChangeLang from '@/containers/ChangeLang'


export default function ConfigPage() {
	const { t } = useTranslation()
	const [selected, setSelected] = useState(-1)

	const secondarySection = useMemo(() => {
		switch (selected) {
			case 0:
				return <ChangeLang />
			default:
				return null
		}
	}, [selected])

	return (
		<ContainerLayout className='config' secondarySection={secondarySection}>
			<section className='config-section'>
				<Typography className='config-title' variant='h3'>
					{t('config.title')}
				</Typography>
				<ConfigMenu selected={selected} setSelected={setSelected} />
			</section>
		</ContainerLayout>
	)
}
