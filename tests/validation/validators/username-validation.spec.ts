import { faker } from '@faker-js/faker'

import { UsernameValidation } from '@/validation/validators'

describe('UsernameValidation', () => {
  let shortUsername: string
  let longUsername: string
  let usernameStartsWithNumber: string
  let usernameWithSpaces: string
  let usernameWithSpecialCharacter: string
  let invalidUsername: string

  beforeAll(() => {
    shortUsername = faker.string.alpha({ length: { min: 1, max: 2 } })
    longUsername = faker.string.alpha(17)
    usernameStartsWithNumber = faker.string.numeric() + faker.string.alpha(2)
    usernameWithSpaces = faker.string.alpha({ length: { min: 2, max: 15 } }) + ' '
    usernameWithSpecialCharacter = faker.string.alpha() + faker.string.symbol(15)
    invalidUsername = faker.string.numeric() + faker.string.alpha(16) + ' ' + faker.string.symbol()
  })

  test('Should add an error if username is less than 3 characters long', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(shortUsername)
    expect(errors[0]).toBe('Username must be between 3 and 16 characters long')
  })

  test('Should add an error if username is greater than 16 characters long', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(longUsername)
    expect(errors[0]).toBe('Username must be between 3 and 16 characters long')
  })

  test('Should add an error if username starts with a number', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(usernameStartsWithNumber)
    expect(errors[0]).toBe('Username must start with a letter')
  })

  test('Should add an error if username contains a special character', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(usernameWithSpecialCharacter)
    expect(errors[0]).toBe('Username can only contain letters, digits, underscore, hyphen and dot')
  })

  test('Should add an error if username contains spaces', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(usernameWithSpaces)
    expect(errors[0]).toBe('Username must not contain spaces')
  })

  test('Should add all errors if username contains more than 1 error', () => {
    const sut = new UsernameValidation()
    const errors = sut.validate(invalidUsername)
    expect(errors.length).toBe(4)
    expect(errors[0]).toBe('Username must be between 3 and 16 characters long')
    expect(errors[1]).toBe('Username must start with a letter')
    expect(errors[2]).toBe('Username must not contain spaces')
    expect(errors[3]).toBe('Username can only contain letters, digits, underscore, hyphen and dot')
  })
})
