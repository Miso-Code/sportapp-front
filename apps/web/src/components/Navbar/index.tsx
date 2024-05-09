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
import { useUserStore } from '@sportapp/stores'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import './_index.scss'
import { Props } from './interfaces'

export default function Navbar({ className = '' }: Props) {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const location = useLocation()
	const { user } = useUserStore()

	const currentPath = location.pathname

	const currentStep = useMemo(() => {
		if (currentPath.includes('/home')) {
			return 0
		}
		if (currentPath.includes('/premium')) {
			return 3
		}
		if (currentPath.includes('/config')) {
			return 4
		}
		if (currentPath.includes('/other-services')) {
			return 2
		}
		return -1
	}, [currentPath])

	const isPremium = useMemo(() => {
		return user?.profileData?.subscription_type === 'premium'
	}, [user])

	return (
		<Box className={`navbar ${className}`} flexGrow={0}>
			<AppBar
				className='navbar-content'
				elevation={0}
				position='relative'>
				<BottomNavigation
					className='navbar-content-navigation'
					value={currentStep}
					showLabels>
					<BottomNavigationAction
						label={t('navbar.profile')}
						LinkComponent={'a'}
						onClick={() => navigate('/home')}
						className='navbar-content-navigation-button navbar-content-navigation-button__start'
						icon={<PersonIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.training')}
						LinkComponent={'a'}
						className='navbar-content-navigation-button'
						icon={<FavoriteIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.otherServices')}
						LinkComponent={'a'}
						onClick={() => navigate('/other-services')}
						className='navbar-content-navigation-button'
						icon={<ShoppingIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.preferential')}
						LinkComponent={'a'}
						disabled={!isPremium}
						onClick={() => navigate('/premium')}
						className={`navbar-content-navigation-button ${
							!isPremium &&
							'navbar-content-navigation-button__disabled'
						}`}
						icon={<StartIcon />}
					/>
					<BottomNavigationAction
						label={t('navbar.settings')}
						LinkComponent={'a'}
						onClick={() => navigate('/config')}
						className='navbar-content-navigation-button navbar-content-navigation-button__end'
						icon={<SettingsIcon />}
					/>
				</BottomNavigation>
			</AppBar>
		</Box>
	)
}
