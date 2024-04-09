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

export default function Navbar({
	className = '',
	currentNavigationStep = 0
}: Props) {
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
						label='Recents'
						className='navbar-content-navigation-button navbar-content-navigation-button__start'
						icon={<PersonIcon />}
					/>
					<BottomNavigationAction
						label='Entrenamiento'
						className='navbar-content-navigation-button'
						icon={<FavoriteIcon />}
					/>
					<BottomNavigationAction
						label='Otros Servicios'
						className='navbar-content-navigation-button'
						icon={<ShoppingIcon />}
					/>
					<BottomNavigationAction
						label='Preferenciales'
						className='navbar-content-navigation-button'
						icon={<StartIcon />}
					/>
					<BottomNavigationAction
						label='Configuración'
						className='navbar-content-navigation-button navbar-content-navigation-button__end'
						icon={<SettingsIcon />}
					/>
				</BottomNavigation>
			</AppBar>
		</Box>
	)
}
