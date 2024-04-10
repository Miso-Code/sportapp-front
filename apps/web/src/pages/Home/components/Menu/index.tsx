import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined'
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverageOutlined'
import SellIcon from '@mui/icons-material/SellOutlined'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketballOutlined'
import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Paper
} from '@mui/material'
import './_index.scss'
import { Props } from './interfaces'
import { useTranslation } from 'react-i18next'

export default function ProfileMenu({ className, fullName, email }: Props) {
	const { t } = useTranslation()
	return (
		<Box className={className}>
			<Paper variant='outlined'>
				<ListItem disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<Avatar>JD</Avatar>
						</ListItemIcon>
						<ListItemText primary={fullName} secondary={email} />
					</ListItemButton>
				</ListItem>
			</Paper>
			<Paper
				variant='outlined'
				className='profile-menu-secondary-section'>
				<List className='profile-menu-secondary-section-container'>
					<ListItem disablePadding>
						<ListItemButton className='profile-menu-item'>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText
								primary={t('profile.menu.personalData')}
							/>
						</ListItemButton>
					</ListItem>
					<Divider className='profile-menu-divider' />
					<ListItem disablePadding>
						<ListItemButton className='profile-menu-item'>
							<ListItemIcon>
								<EmojiFoodBeverageIcon />
							</ListItemIcon>
							<ListItemText
								primary={t('profile.menu.sportData')}
							/>
						</ListItemButton>
					</ListItem>
					<Divider className='profile-menu-divider' />
					<ListItem disablePadding>
						<ListItemButton className='profile-menu-item'>
							<ListItemIcon>
								<SportsBasketballIcon />
							</ListItemIcon>
							<ListItemText
								primary={t('profile.menu.nutritionData')}
							/>
						</ListItemButton>
					</ListItem>
				</List>
			</Paper>
			<Paper className='profile-menu-third-section' variant='outlined'>
				<ListItem disablePadding>
					<ListItemButton className='profile-menu-item'>
						<ListItemIcon>
							<SellIcon />
						</ListItemIcon>
						<ListItemText
							primary={t('profile.menu.paymentPlans')}
						/>
					</ListItemButton>
				</ListItem>
			</Paper>
		</Box>
	)
}
