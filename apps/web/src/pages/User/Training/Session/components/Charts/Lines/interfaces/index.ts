import { SxProps } from '@mui/material'
import { Theme } from '@mui/system'

export interface Props {
	sx?: SxProps<Theme>
	data: number[]
	label?: string
}
