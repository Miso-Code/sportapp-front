import { generateLabelValuePairs } from '..'

describe('generateLabelValuePairs', () => {
	it('should return an array of label-value pairs', () => {
		const n = 5
		const pairs = generateLabelValuePairs(n)
		expect(pairs).toEqual([
			{ label: '1', value: '1' },
			{ label: '2', value: '2' },
			{ label: '3', value: '3' },
			{ label: '4', value: '4' },
			{ label: '5', value: '5' }
		])
	})
})
