import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import schema, { FormData } from './utils/schema'
import LoadingButton from '@mui/lab/LoadingButton'
import RadioButtonController from '@/components/Inputs/RadioButtonController'
import './_index.scss'
import { useLangStore } from '@sportapp/stores'

export default function ChangeLang() {
	const { t } = useTranslation()
	const { changeLang } = useLangStore()
	const { lang } = useLangStore()
	const { handleSubmit, control } = useForm<FormData>({
		resolver: yupResolver(schema),
		values: {
			lang
		},
		mode: 'onChange'
	})

	const onSubmit = (data: FormData) => {
		changeLang(data.lang)
	}
	return (
		<Box
			sx={{
				p: 4
			}}>
			<Typography className='config-lang-title' variant='h3'>
				{t('config.menu.language')}
			</Typography>

			<form
				className='config-lang-form'
				onSubmit={handleSubmit(onSubmit)}>
				<RadioButtonController
					control={control}
					fullWidth
					label={t('config.language.select')}
					name='lang'
					options={[
						{ label: t('config.language.en'), value: 'en' },
						{ label: t('config.language.es'), value: 'es' }
					]}
				/>

				<LoadingButton
					fullWidth
					className='config-lang-submit'
					size='large'
					type='submit'
					variant='contained'>
					{t('config.language.button')}
				</LoadingButton>
			</form>
		</Box>
	)
}
