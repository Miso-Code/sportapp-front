import { ReactNode } from 'react'

export enum StateTypes {
	BACK = 'default',
	TODAY = 'primary',
	NEXT = 'warning'
}

export interface Props {
	titleComponent: string | ReactNode
	description: string | ReactNode
	state: { type: `${keyof typeof StateTypes}`; text: string }
	date: string
	showChip?: boolean
	onClick: () => void
}
