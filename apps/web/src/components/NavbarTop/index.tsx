import LogoutIcon from '@mui/icons-material/Logout'
import MenuIcon from '@mui/icons-material/Menu'
import TranslateIcon from '@mui/icons-material/Translate'
import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	Divider,
	IconButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography
} from '@mui/material'
import { usePartnerAuthStore } from '@sportapp/stores'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const pages = [
	{
		label: 'navbar.partner.getProducts',
		path: '/partner/home'
	},
	{
		label: 'navbar.partner.createProduct',
		path: '/partner/product/create'
	},
	{
		label: 'navbar.partner.purchasedProducts',
		path: '/partner/product/purchased'
	}
]

export default function NavbarTop() {
	const { t } = useTranslation()
	const { logout } = usePartnerAuthStore()
	const { user } = usePartnerAuthStore()
	const navigate = useNavigate()

	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
	const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget)
	}

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const handleGoToChangeLang = () => {
		navigate('/partner/lang')
	}

	return (
		<AppBar color='inherit' className='bg-white' position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' }
						}}>
						<IconButton
							size='large'
							aria-label={t('navbar.partner.menu')}
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}>
							{pages.map((page) => (
								<MenuItem
									key={page.label}
									onClick={() => navigate(page.path)}>
									<Typography textAlign='center'>
										{t(page.label)}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' }
						}}>
						{pages.map((page) => (
							<Button
								color='primary'
								key={page.label}
								title={t(page.label)}
								onClick={() => navigate(page.path)}
								sx={{
									my: 2,
									display: 'block'
								}}>
								{t(page.label)}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title={t('navbar.partner.open.profile')}>
							<IconButton
								onClick={handleOpenUserMenu}
								sx={{ p: 0 }}>
								<Avatar
									alt={user?.email[0] || ''}
									src='/static/images/avatar/2.jpg'
								/>
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar-user'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right'
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}>
							<MenuItem
								style={{ width: '15rem' }}
								onClick={handleCloseUserMenu}
								className='gap-4'>
								<ListItemText
									primary={user?.business_partner_name || ''}
									secondary={user?.email || ''}
								/>
							</MenuItem>
							<Divider />
							<MenuItem onClick={logout}>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText
									primary={t('navbar.partner.logout')}
								/>
							</MenuItem>
							<MenuItem onClick={handleGoToChangeLang}>
								<ListItemIcon>
									<TranslateIcon />
								</ListItemIcon>
								<ListItemText
									primary={t('navbar.partner.changeLang')}
								/>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
