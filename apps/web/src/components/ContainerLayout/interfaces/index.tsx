import { ReactNode } from 'react'

export interface Props {
	children: ReactNode
	className?: string
	secondarySection?: ReactNode
	withSecondarySection?: boolean
}
