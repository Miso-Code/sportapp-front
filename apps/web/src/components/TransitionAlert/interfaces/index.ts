import { AlertProps } from '@mui/material/Alert'

export interface Props extends AlertProps {
	isOpen?: boolean
	message: string
	handleClose: (flag: boolean) => void
	containerClassName?: string
}
