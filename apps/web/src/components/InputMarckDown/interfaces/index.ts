export interface Props {
	readonly value: string
	readonly onChange: (value: string | undefined) => void
	readonly label: string
	readonly className?: string
}
