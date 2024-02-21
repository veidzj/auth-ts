import { faker } from '@faker-js/faker'

import { UsernameValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

describe('UsernameValidation', () => {
  let shortUsername: UsernameValidation.Input
  let longUsername: UsernameValidation.Input
  let usernameStartsWithNumber: UsernameValidation.Input
  let usernameWithSpaces: UsernameValidation.Input
  let usernameWithSpecialCharacter: UsernameValidation.Input
  let validUsername: UsernameValidation.Input

  beforeAll(() => {
    shortUsername = {
      username: faker.string.alpha({ length: { min: 1, max: 2 } })
    }
    longUsername = {
      username: faker.string.alpha(17)
    }
    usernameStartsWithNumber = {
      username: `${faker.string.numeric()}${faker.string.alpha(2)}`
    }
    usernameWithSpaces = {
      username: `${faker.string.alpha({ length: { min: 2, max: 15 } })} `
    }
    usernameWithSpecialCharacter = {
      username: `${faker.string.alpha()}${faker.string.symbol(15)}`
    }
    validUsername = {
      username: `${faker.string.alpha()}${faker.string.alphanumeric(15)}`
    }
  })

  test('Should throw ValidationError if username is less than 3 characters long', () => {
    const sut = new UsernameValidation()
    expect(() => {
      sut.validate(shortUsername)
    }).toThrow(new ValidationError('Username must be between 3 and 16 characters long'))
  })

  test('Should throw ValidationError if username is greater than 16 characters long', () => {
    const sut = new UsernameValidation()
    expect(() => {
      sut.validate(longUsername)
    }).toThrow(new ValidationError('Username must be between 3 and 16 characters long'))
  })

  test('Should throw ValidationError if username starts with a number', () => {
    const sut = new UsernameValidation()
    expect(() => {
      sut.validate(usernameStartsWithNumber)
    }).toThrow(new ValidationError('Username must start with a letter'))
  })

  test('Should throw ValidationError if username contains a special character', () => {
    const sut = new UsernameValidation()
    expect(() => {
      sut.validate(usernameWithSpecialCharacter)
    }).toThrow(new ValidationError('Username can only contain letters, digits, underscore, hyphen and dot'))
  })

  test('Should throw ValidationError if username contains spaces', () => {
    const sut = new UsernameValidation()
    expect(() => {
      sut.validate(usernameWithSpaces)
    }).toThrow(new ValidationError('Username must not contain spaces'))
  })

  test('Should return null if username is valid', () => {
    const sut = new UsernameValidation()
    expect(() => {
      sut.validate(validUsername)
    }).not.toThrow()
  })
})
