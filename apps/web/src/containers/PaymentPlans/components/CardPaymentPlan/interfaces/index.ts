import { HTMLAttributes } from 'react'

export interface Props extends HTMLAttributes<HTMLDivElement> {
	name: string
	description: string
	price: number
	duration: string
	isActive?: boolean
	activeText?: string
	benefits: Benefits[]
	className?: string
}

export interface Benefits {
	description: string
	isActive: boolean
}
