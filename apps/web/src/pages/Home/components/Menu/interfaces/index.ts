export interface Props {
	readonly className?: string
	readonly fullName?: string
	readonly email?: string
	readonly selected?: number
	setSelected?: (selected: number) => void
}
