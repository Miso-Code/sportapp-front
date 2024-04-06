import CloseIcon from '@mui/icons-material/Close'
import { Alert, Box, Collapse, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import { Props } from './interfaces'

export default function TransitionAlert({
	isOpen = false,
	message,
	handleClose: handleCloseProp,
	containerClassName,
	...props
}: Props) {
	const [open, setOpen] = useState(isOpen)

	useEffect(() => {
		setOpen(isOpen)
	}, [isOpen])

	const handleClose = () => {
		setOpen(false)
		handleCloseProp(false)
	}

	return (
		<Box className={containerClassName}>
			<Collapse in={open}>
				<Alert
					action={
						<IconButton
							aria-label='close'
							color='inherit'
							size='small'
							onClick={handleClose}>
							<CloseIcon fontSize='inherit' />
						</IconButton>
					}
					sx={{ mb: 2 }}
					{...props}>
					{message}
				</Alert>
			</Collapse>
		</Box>
	)
}
