import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import ShoppingIcon from '@mui/icons-material/ShoppingCart'
import StartIcon from '@mui/icons-material/Star'
import {
	AppBar,
	BottomNavigation,
	BottomNavigationAction,
	Box
} from '@mui/material'
import './_index.scss'
import { Props } from './interfaces'
import { useTranslation } from 'react-i18next'

export default function Navbar({
	className = '',
	currentNavigationStep = 0
}: Props) {
	const { t } = useTranslation()
	return (
		<Box className={`navbar ${className}`} flexGrow={0}>
			<AppBar
				className='navbar-content'
				elevation={0}
				position='relative'>
				<BottomNavigation
					className='navbar-content-navigation'
					value={currentNavigationStep}
					showLabels>
					<BottomNavigationAction
						label={t('navbar.profile')}
						className='navbar-content-navigation-button navbar-content-navigation-button__start'
						icon={<PersonIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.training')}
						className='navbar-content-navigation-button'
						icon={<FavoriteIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.otherServices')}
						className='navbar-content-navigation-button'
						icon={<ShoppingIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.preferential')}
						className='navbar-content-navigation-button'
						icon={<StartIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.settings')}
						className='navbar-content-navigation-button navbar-content-navigation-button__end'
						icon={<SettingsIcon />}
					/>
				</BottomNavigation>
			</AppBar>
		</Box>
	)
}
