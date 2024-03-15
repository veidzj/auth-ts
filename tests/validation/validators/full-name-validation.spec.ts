import { faker } from '@faker-js/faker'

import { FullNameValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): FullNameValidation => {
  return new FullNameValidation()
}

describe('FullNameValidation', () => {
  let shortFullName: FullNameValidation.Input
  let longFullName: FullNameValidation.Input
  let lowercaseFullName: FullNameValidation.Input
  let invalidSpaceBetweenFullName: FullNameValidation.Input
  let invalidSpaceAfterFullName: FullNameValidation.Input
  let fullNameWithSpecialCharacter: FullNameValidation.Input
  let fullNameWithIsolatedAccent: FullNameValidation.Input
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
    validFullName = {
      fullName: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(8)} ${faker.string.alpha(8)}`
    }
  })

  test('Should throw ValidationError if full name is less than 3 characters long', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(shortFullName)
    }).toThrow(new ValidationError('Full name must be between 3 and 50 characters long'))
  })

  test('Should throw ValidationError if full name is greater than 50 characters long', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(longFullName)
    }).toThrow(new ValidationError('Full name must be between 3 and 50 characters long'))
  })

  test('Should throw ValidationError if full name starts with a lowercase letter', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(lowercaseFullName)
    }).toThrow(new ValidationError('Full name must start with an uppercase letter'))
  })

  test('Should throw ValidationError if full name have an invalid space between words', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(invalidSpaceBetweenFullName)
    }).toThrow(new ValidationError('Full name must be separated by a single space'))
  })

  test('Should throw ValidationError if full name have an invalid space after words', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(invalidSpaceAfterFullName)
    }).toThrow(new ValidationError('Full name must be separated by a single space'))
  })

  test('Should throw ValidationError if full name contains special character', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(fullNameWithSpecialCharacter)
    }).toThrow(new ValidationError('Full name can only contain letters and letters with accents'))
  })

  test('Should throw ValidationError if full name contains an isolated accent', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(fullNameWithIsolatedAccent)
    }).toThrow(new ValidationError('Full name can only contain letters and letters with accents'))
  })

  test('Should not throw on success', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(validFullName)
    }).not.toThrow()
  })
})
