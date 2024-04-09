import { Box, Paper } from '@mui/material'
import { Props } from './interfaces'
import './_index.scss'
import Navbar from '../Navbar'

export default function ContainerLayout({
	children,
	className = '',
	secondarySection
}: Props) {
	const handleSecondaryClass = () => {
		if (secondarySection) {
			return 'container-layout-secondary-section__full'
		}
		return ''
	}

	return (
		<Box
			className={`container-layout ${className}`}
			display='flex'
			flexDirection='row'>
			<Navbar className='flex-1' />
			<Paper className='container-layout-main-section container-layout-main-section__full'>
				{children}
			</Paper>
			<Paper
				className={`container-layout-secondary-section ${handleSecondaryClass()}`}>
				{secondarySection}
			</Paper>
		</Box>
	)
}
