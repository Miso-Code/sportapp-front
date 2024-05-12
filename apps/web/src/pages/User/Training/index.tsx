import ContainerLayout from '@/components/ContainerLayout'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import ChevronRightFilledIcon from '@mui/icons-material/ChevronRight'
import MenuBookIcon from '@mui/icons-material/MenuBook'
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

export default function TrainingPage() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	return (
		<ContainerLayout withSecondarySection={false} className='training'>
			<section className='training-section'>
				<Typography className='training-title' variant='h3'>
					{t('training.trainings')}
				</Typography>

				<Box
					sx={{
						maxWidth: '45rem',
						marginTop: '2rem',
						display: 'flex',
						flexDirection: 'column',
						gap: '1.5rem'
					}}>
					<Paper variant='outlined' className='training-menu-section'>
						<List
							disablePadding
							className='training-menu-section-container'>
							<ListItem disablePadding sx={{ height: '100%' }}>
								<ListItemButton
									onClick={() =>
										navigate('/training/calendar')
									}
									tabIndex={0}
									className='training-menu-item'>
									<ListItemIcon>
										<CalendarTodayIcon />
									</ListItemIcon>
									<ListItemText
										primary={t('training.history')}
									/>
									<ChevronRightFilledIcon color='action' />
								</ListItemButton>
							</ListItem>
						</List>
					</Paper>
					<Paper variant='outlined' className='training-menu-section'>
						<List
							disablePadding
							className='training-menu-section-container'>
							<ListItem disablePadding sx={{ height: '100%' }}>
								<ListItemButton
									tabIndex={1}
									onClick={() =>
										navigate('/training/nutritionalPlan')
									}
									className='training-menu-item'>
									<ListItemIcon>
										<MenuBookIcon />
									</ListItemIcon>
									<ListItemText
										primary={t('training.nutritionalPlan')}
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
