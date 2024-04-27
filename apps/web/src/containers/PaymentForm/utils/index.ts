export function generateLabelValuePairs(n: number) {
	const pairs = []
	for (let i = 1; i <= n; i++) {
		pairs.push({ label: i.toString(), value: i.toString() })
	}
	return pairs
}
