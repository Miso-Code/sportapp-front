import ContainerLayout from '@/components/ContainerLayout'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChevronRightFilledIcon from '@mui/icons-material/ChevronRight'
import ReceiptIcon from '@mui/icons-material/Receipt'
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper,
	Typography
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import './_index.scss'
import { useUserStore } from '@sportapp/stores'
import { useEffect } from 'react'

export default function PreferencePage() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { user } = useUserStore()

	useEffect(() => {
		if (user?.profileData?.subscription_type !== 'premium') {
			navigate('/home')
		}
	}, [user, navigate])

	return (
		<ContainerLayout withSecondarySection={false} className='preference'>
			<section className='preference-section'>
				<Typography className='preference-title' variant='h3'>
					{t('preference.title')}
				</Typography>

				<Box
					sx={{
						maxWidth: '45rem',
						marginTop: '2rem',
						display: 'flex',
						flexDirection: 'column',
						gap: '1.5rem'
					}}>
					<Paper
						variant='outlined'
						className='preference-menu-section'>
						<List className='preference-menu-section-container'>
							<ListItem disablePadding>
								<ListItemButton
									onClick={() =>
										navigate('/premium/selection')
									}
									tabIndex={0}
									className='preference-menu-item'>
									<ListItemIcon>
										<CalendarTodayIcon />
									</ListItemIcon>
									<ListItemText
										primary={t('preference.menu.schedule')}
									/>
									<ChevronRightFilledIcon color='action' />
								</ListItemButton>
							</ListItem>
						</List>
					</Paper>
					<Paper
						variant='outlined'
						className='preference-menu-section'>
						<List className='preference-menu-section-container'>
							<ListItem disablePadding>
								<ListItemButton
									tabIndex={1}
									onClick={() =>
										navigate('/premium/list-schedule')
									}
									className='preference-menu-item'>
									<ListItemIcon>
										<ReceiptIcon />
									</ListItemIcon>
									<ListItemText
										primary={t('preference.menu.list')}
									/>
									<ChevronRightFilledIcon color='action' />
								</ListItemButton>
							</ListItem>
						</List>
					</Paper>
				</Box>
			</section>
		</ContainerLayout>
	)
}
