import { Box, Paper } from '@mui/material'
import Navbar from '../Navbar'
import './_index.scss'
import { Props } from './interfaces'

export default function ContainerLayout({
	children,
	className = '',
	secondarySection,
	withSecondarySection = true
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
			<Navbar />
			<Paper className='container-layout-main-section container-layout-main-section__full'>
				{children}
			</Paper>
			{withSecondarySection && (
				<Paper
					className={`container-layout-secondary-section ${handleSecondaryClass()}`}>
					{secondarySection}
				</Paper>
			)}
		</Box>
	)
}
