export function createData(
	id: string,
	dateAndTime: string,
	type: string,
	trainingName: string,
	location?: string
) {
	return { id, dateAndTime, type, location, trainingName }
}
