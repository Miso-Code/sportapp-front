import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined'
import ChevronRightFilledIcon from '@mui/icons-material/ChevronRight'
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
import { useTranslation } from 'react-i18next'
import './_index.scss'
import { Props } from './interfaces'

export default function ProfileMenu({
	className,
	fullName,
	email,
	selected,
	setSelected
}: Props) {
	const { t } = useTranslation()

	const handleSelected = (index: number) => {
		if (setSelected) {
			setSelected(index)
		}
	}

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
						<ListItemButton
							selected={selected === 0}
							onClick={() => handleSelected(0)}
							tabIndex={0}
							className='profile-menu-item'>
							<ListItemIcon>
								<AccountCircleIcon />
							</ListItemIcon>
							<ListItemText
								primary={t('profile.menu.personalData')}
							/>
							<ChevronRightFilledIcon color='action' />
						</ListItemButton>
					</ListItem>
					<Divider className='profile-menu-divider' />
					<ListItem disablePadding>
						<ListItemButton
							selected={selected === 1}
							onClick={() => handleSelected(1)}
							tabIndex={1}
							className='profile-menu-item'>
							<ListItemIcon>
								<EmojiFoodBeverageIcon />
							</ListItemIcon>
							<ListItemText
								primary={t('profile.menu.sportData')}
							/>
							<ChevronRightFilledIcon color='action' />
						</ListItemButton>
					</ListItem>
					<Divider className='profile-menu-divider' />
					<ListItem disablePadding>
						<ListItemButton
							selected={selected === 2}
							tabIndex={2}
							onClick={() => handleSelected(2)}
							className='profile-menu-item'>
							<ListItemIcon>
								<SportsBasketballIcon />
							</ListItemIcon>
							<ListItemText
								primary={t('profile.menu.nutritionData')}
							/>
							<ChevronRightFilledIcon color='action' />
						</ListItemButton>
					</ListItem>
				</List>
			</Paper>
			<Paper className='profile-menu-third-section' variant='outlined'>
				<ListItem disablePadding>
					<ListItemButton
						selected={selected === 3}
						tabIndex={3}
						onClick={() => handleSelected(3)}
						className='profile-menu-item'>
						<ListItemIcon>
							<SellIcon />
						</ListItemIcon>
						<ListItemText
							primary={t('profile.menu.paymentPlans')}
						/>
						<ChevronRightFilledIcon color='action' />
					</ListItemButton>
				</ListItem>
			</Paper>
		</Box>
	)
}
