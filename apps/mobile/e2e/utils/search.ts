export const extractSearchableString = (text: string) => {
	const specialCharactersRege = /^[^\W]+|[^\W]+(?=[^\W]*$)|[^\W]+/g
	const matches = text.split(' ')[0].match(specialCharactersRege)

	if (!matches) return ''

	const serchable = matches.join('')

	if (serchable === text) return serchable.substring(0, serchable.length - 1)
	return serchable
}
