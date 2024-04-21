import { toBase64 } from '../files'

describe('toBase64', () => {
	it('should return a base64 string', async () => {
		const file = new File([''], 'filename', { type: 'image/png' })
		const result = await toBase64(file)
		expect(result).toEqual('data:image/png;base64,')
	})

	it('should throw an error', async () => {
		const file = new File([''], 'filename', { type: 'image/png' })
		const spy = jest.spyOn(FileReader.prototype, 'readAsDataURL')
		spy.mockImplementation(() => {
			throw new Error()
		})
		await expect(toBase64(file)).rejects.toThrow()
	})
})
