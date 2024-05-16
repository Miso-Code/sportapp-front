import { ReactNode } from 'react'

export interface Props {
	size?: {
		width: number
		height: number
	}
	children?: ReactNode
	value: number
	maxValue: number
	color?: string
}
