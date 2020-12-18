import { validateDate } from '../validationUtils'

describe('validateDate', () => {
    it('should pass undefined date as valid', () => {
        expect(validateDate(undefined)).toBeUndefined()
    })

    it('should pass empty date as valid date', () => {
        expect(validateDate('')).toBeUndefined()
    })

    it('should reject date with invalid format', () => {
        expect(validateDate('kdkdqk')).toBe('Errors.invalidDate')
    })

    it('should reject date with nonsense month', () => {
        expect(validateDate('1.270.1970')).toBe('Errors.invalidDate')
    })

    it('should reject date with nonsense day', () => {
        expect(validateDate('0.12.1970')).toBe('Errors.invalidDate')
    })

    it('should reject date with day that is not in the month', () => {
        expect(validateDate('31.4.1970')).toBe('Errors.invalidDate')
    })

    it('should reject date with day that is not in the leap year', () => {
        expect(validateDate('29.2.2021')).toBe('Errors.invalidDate')
    })

    it('should pass correct date', () => {
        expect(validateDate('28.2.2021')).toBeUndefined()
    })
})
