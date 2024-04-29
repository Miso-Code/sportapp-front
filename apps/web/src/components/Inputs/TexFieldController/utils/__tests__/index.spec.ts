import {
	handleCvvChange,
	handleExpirationDateChange,
	handleMaxCharacters
} from '..'

describe('TextfieldController utils', () => {
	describe('handleExpirationDateChange', () => {
		it('should format expiration date', () => {
			const event = { target: { value: '1223' } }
			expect(handleExpirationDateChange(event)).toBe('12/23')
		})
		it('should not format expiration date', () => {
			const event = { target: { value: '12/23' } }
			expect(handleExpirationDateChange(event)).toBe('12/23')
        })
        
        it('should not format expiration date but max characters', () => {
            const event = { target: { value: '12/234' } }
            expect(handleExpirationDateChange(event)).toBe('12/23')
        })
	})

	describe('handleCvvChange', () => {
		it('should return cvv', () => {
			const event = { target: { value: '123' } }
			expect(handleCvvChange(event)).toBe('123')
		})
		it('should not return cvv', () => {
			const event = { target: { value: '1234' } }
			expect(handleCvvChange(event)).toBe('123')
		})
	})

	describe('handleMaxCharacters', () => {
		it('should return value', () => {
			const event = { target: { value: '123' } }
			expect(handleMaxCharacters(event, 3)).toBe('123')
		})
		it('should not return value', () => {
			const event = { target: { value: '1234' } }
			expect(handleMaxCharacters(event, 3)).toBe('123')
		})
	})
})
