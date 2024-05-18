import TranslateIcon from '@mui/icons-material/Translate'
import LogoutIcon from '@mui/icons-material/Logout'
import ChevronRightFilledIcon from '@mui/icons-material/ChevronRight'
import {
	Box,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import './_index.scss'
import { Props } from './interfaces'
import { useAuthStore } from '@sportapp/stores'

export default function ConfigMenu({
	className = '',
	selected,
	setSelected
}: Props) {
	const { t } = useTranslation()
	const { logout } = useAuthStore()

	const handleSelected = (index: number) => {
		if (setSelected) {
			setSelected(index)
		}
	}
	return (
		<Box className={`config-menu ${className}`}>
			<Paper
				variant='outlined'
				className='config-menu-section config-menu-section__main'>
				<List className='config-menu-section-container'>
					<ListItem disablePadding>
						<ListItemButton
							selected={selected === 0}
							onClick={() => handleSelected(0)}
							tabIndex={0}
							className='config-menu-item'>
							<ListItemIcon>
								<TranslateIcon />
							</ListItemIcon>
							<ListItemText primary={t('config.menu.language')} />
							<ChevronRightFilledIcon color='action' />
						</ListItemButton>
					</ListItem>
				</List>
			</Paper>
			<Paper
				variant='outlined'
				className='config-menu-section config-menu-section__secondary'>
				<List className='config-menu-section-container'>
					<ListItem disablePadding>
						<ListItemButton
							onClick={logout}
							tabIndex={1}
							className='config-menu-item'>
							<ListItemIcon>
								<LogoutIcon />
							</ListItemIcon>
							<ListItemText primary={t('config.menu.logout')} />
							<ChevronRightFilledIcon color='action' />
						</ListItemButton>
					</ListItem>
				</List>
			</Paper>
		</Box>
	)
}
