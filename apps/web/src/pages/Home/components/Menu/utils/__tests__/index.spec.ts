import { handleEdit } from '..'

describe('handleEdit', () => {
	it('should change the value of the index passed in the isEditing array', () => {
		const isEditing = [false, false, false]
		const setIsEditing = jest.fn()
		handleEdit(1, isEditing, setIsEditing)
		expect(setIsEditing).toHaveBeenCalledWith([false, true, false])
	})

	it('should change the value of the index passed in the isEditing array', () => {
		const isEditing = [false, false, false]
		const setIsEditing = jest.fn()
		handleEdit(0, isEditing, setIsEditing)
		expect(setIsEditing).toHaveBeenCalledWith([true, false, false])
	})
})
