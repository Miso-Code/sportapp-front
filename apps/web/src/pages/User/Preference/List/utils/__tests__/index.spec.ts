import { createData } from '..'

describe('createData', () => {
	it('should return an object with the correct properties', () => {
		const id = '1'
		const dateAndTime = '2021-08-01T12:00:00Z'
		const type = 'virtual'
		const trainingName = 'Training Name'
		const location = 'Location'

		const result = createData(id, dateAndTime, type, trainingName, location)

		expect(result).toEqual({
			id,
			dateAndTime,
			type,
			location,
			trainingName
		})
	})
})
