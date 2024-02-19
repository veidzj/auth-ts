import { faker } from '@faker-js/faker'

import { FullNameValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

describe('FullNameValidation', () => {
  let shortFullName: FullNameValidation.Input
  let longFullName: FullNameValidation.Input
  let lowercaseFullName: FullNameValidation.Input
  let invalidSpaceBetweenFullName: FullNameValidation.Input
  let invalidSpaceAfterFullName: FullNameValidation.Input
  let fullNameWithSpecialCharacter: FullNameValidation.Input
  let fullNameWithIsolatedAccent: FullNameValidation.Input
  let invalidFullName: FullNameValidation.Input
  let validFullName: FullNameValidation.Input

  beforeAll(() => {
    shortFullName = {
      fullName: faker.string.alpha({ length: { min: 1, max: 2 } })
    }
    longFullName = {
      fullName: faker.string.alpha(51)
    }
    lowercaseFullName = {
      fullName: faker.string.alpha({ length: 16, casing: 'lower' })
    }
    invalidSpaceBetweenFullName = {
      fullName: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(16)}   ${faker.string.alpha(16)}`
    }
    invalidSpaceAfterFullName = {
      fullName: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(16)} `
    }
    fullNameWithSpecialCharacter = {
      fullName: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.symbol(15)}`
    }
    fullNameWithIsolatedAccent = {
      fullName: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(16)}~`
    }
    invalidFullName = {
      fullName: `${faker.string.alpha({ casing: 'lower' })}~${faker.string.alpha(50)} `
    }
    validFullName = {
      fullName: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(8)} ${faker.string.alpha(8)}`
    }
  })

  test('Should return an error if full name is less than 3 characters long', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(shortFullName)
    expect(error).toEqual(new ValidationError('Full name must be between 3 and 50 characters long'))
  })

  test('Should return an error if full name is greater than 50 characters long', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(longFullName)
    expect(error).toEqual(new ValidationError('Full name must be between 3 and 50 characters long'))
  })

  test('Should return an error if full name starts with a lowercase letter', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(lowercaseFullName)
    expect(error).toEqual(new ValidationError('Full name must start with an uppercase letter'))
  })

  test('Should return an error if full name have an invalid space between words', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(invalidSpaceBetweenFullName)
    expect(error).toEqual(new ValidationError('Full name must be separated by a single space'))
  })

  test('Should return an error if full name have an invalid space after words', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(invalidSpaceAfterFullName)
    expect(error).toEqual(new ValidationError('Full name must be separated by a single space'))
  })

  test('Should return an error if full name contains special character', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(fullNameWithSpecialCharacter)
    expect(error).toEqual(new ValidationError('Full name can only contain letters and letters with accents'))
  })

  test('Should return an error if full name contains an isolated accent', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(fullNameWithIsolatedAccent)
    expect(error).toEqual(new ValidationError('Full name can only contain letters and letters with accents'))
  })

  test('Should return all error if full name contains more than 1 error', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(invalidFullName)
    expect(error).toEqual(new ValidationError('Full name must be between 3 and 50 characters long'))
  })

  test('Should return nul if full name is valid', () => {
    const sut = new FullNameValidation()
    const error = sut.validate(validFullName)
    expect(error).toBeNull()
  })
})
