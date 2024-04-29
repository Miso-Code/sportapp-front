import { Control, FieldValues, Path } from 'react-hook-form'

export interface Props<T extends FieldValues = FieldValues> {
	control: Control<T> | undefined
	readonly name: Path<T>
	readonly label: string
	readonly placeHolder?: string
	readonly className?: string
}
