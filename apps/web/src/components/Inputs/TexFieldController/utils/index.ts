export const handleExpirationDateChange = (event: {
	target: { value: string }
}): string => {
	const value = event.target.value.replace(/\D/g, '')
	const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/')
	if (value.length <= 4) {
		return formattedValue
	}
	return formattedValue.slice(0, 5)
}

export const handleCvvChange = (event: { target: { value: string } }) => {
	const value = event.target.value.replace(/\D/g, '')
	if (value.length <= 3) {
		return value
	}
	return value.slice(0, 3)
}

export const handleMaxCharacters = (
	event: { target: { value: string } },
	max: number
) => {
	const value = event.target.value
	if (value.length <= max) {
		return value
	}
	return value.slice(0, max)
}
