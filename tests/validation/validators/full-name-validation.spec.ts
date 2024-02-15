import { faker } from '@faker-js/faker'

import { FullNameValidation } from '@/validation/validators'

describe('FullNameValidation', () => {
  let shortFullName: { fullName: string }
  let longFullName: { fullName: string }
  let lowercaseFullName: { fullName: string }
  let invalidSpaceBetweenFullName: { fullName: string }
  let invalidSpaceAfterFullName: { fullName: string }
  let fullNameWithSpecialCharacter: { fullName: string }
  let fullNameWithIsolatedAccent: { fullName: string }
  let invalidFullName: { fullName: string }
  let validFullName: { fullName: string }

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
      fullName: faker.string.alpha({ casing: 'upper' }) + faker.string.alpha(16) + '  ' + faker.string.alpha(16)
    }
    invalidSpaceAfterFullName = {
      fullName: faker.string.alpha({ casing: 'upper' }) + faker.string.alpha(16) + ' '
    }
    fullNameWithSpecialCharacter = {
      fullName: faker.string.alpha({ casing: 'upper' }) + faker.string.symbol(15)
    }
    fullNameWithIsolatedAccent = {
      fullName: faker.string.alpha({ casing: 'upper' }) + faker.string.alpha(16) + '~'
    }
    invalidFullName = {
      fullName: faker.string.alpha({ casing: 'lower' }) + '`' + faker.string.alpha(50) + ' '
    }
    validFullName = {
      fullName: faker.person.firstName() + ' ' + faker.person.lastName()
    }
  })

  test('Should add an error if full name is less than 3 characters long', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(shortFullName)
    expect(errors[0]).toBe('Full name must be between 3 and 50 characters long')
  })

  test('Should add an error if full name is greater than 50 characters long', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(longFullName)
    expect(errors[0]).toBe('Full name must be between 3 and 50 characters long')
  })

  test('Should add an error if full name starts with a lowercase letter', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(lowercaseFullName)
    expect(errors[0]).toBe('Full name must start with an uppercase letter')
  })

  test('Should add an error if full name have an invalid space between words', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(invalidSpaceBetweenFullName)
    expect(errors[0]).toBe('Full name must be separated by a single space')
  })

  test('Should add an error if full name have an invalid space after words', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(invalidSpaceAfterFullName)
    expect(errors[0]).toBe('Full name must be separated by a single space')
  })

  test('Should add an error if full name contains special character', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(fullNameWithSpecialCharacter)
    expect(errors[0]).toBe('Full name can only contain letters and letters with accents')
  })

  test('Should add an error if full name contains an isolated accent', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(fullNameWithIsolatedAccent)
    expect(errors[0]).toBe('Full name can only contain letters and letters with accents')
  })

  test('Should add all errors if full name contains more than 1 error', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(invalidFullName)
    expect(errors.length).toBe(4)
    expect(errors[0]).toBe('Full name must be between 3 and 50 characters long')
    expect(errors[1]).toBe('Full name must start with an uppercase letter')
    expect(errors[2]).toBe('Full name must be separated by a single space')
    expect(errors[3]).toBe('Full name can only contain letters and letters with accents')
  })

  test('Should not add an error if full name is valid', () => {
    const sut = new FullNameValidation()
    const errors = sut.validate(validFullName)
    console.log(validFullName)
    expect(errors).toEqual([])
  })
})
