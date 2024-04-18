import { SetStateAction } from 'react'

export const handleEdit = (
	index: number,
	isEditing: boolean[],
	setIsEditing: (value: SetStateAction<boolean[]>) => void
) => {
	const newIsEditing = isEditing.map((value, i) => {
		if (i === index) return !value
		return value
	})
	setIsEditing(newIsEditing)
}
