import { faker } from '@faker-js/faker'

import { FullNameValidation } from '@/validation/validators'

describe('FullNameValidation', () => {
  let shortFullName: string
  let longFullName: string
  let lowercaseFullName: string
  let invalidSpaceBetweenFullName: string
  let invalidSpaceAfterFullName: string

  beforeAll(() => {
    shortFullName = faker.string.alpha({ length: { min: 1, max: 2 } })
    longFullName = faker.string.alpha(51)
    lowercaseFullName = faker.string.alpha({ length: 16, casing: 'lower' })
    invalidSpaceBetweenFullName = faker.string.alpha({ casing: 'upper' }) + faker.string.alpha(16) + '  ' + faker.string.alpha(16)
    invalidSpaceAfterFullName = faker.string.alpha({ casing: 'upper' }) + faker.string.alpha(16) + ' '
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
})
