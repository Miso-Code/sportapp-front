import NavbarTop from '@/components/NavbarTop'
import ChangeLang from '@/containers/ChangeLang'
import { Box, Container } from '@mui/material'

export default function LangPartnerPage() {
	return (
		<Box className='config-partner-page'>
			<NavbarTop />
			<Container
				maxWidth='xl'
				sx={{
					display: 'flex',
					justifyContent: 'center',
					paddingTop: '2rem'
				}}>
				<Box
					sx={{
						maxWidth: '24rem'
					}}>
					<ChangeLang />
				</Box>
			</Container>
		</Box>
	)
}
