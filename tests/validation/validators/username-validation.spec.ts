import { faker } from '@faker-js/faker'

import { UsernameValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

describe('UsernameValidation', () => {
  let shortUsername: UsernameValidation.Input
  let longUsername: UsernameValidation.Input
  let usernameStartsWithNumber: UsernameValidation.Input
  let usernameWithSpaces: UsernameValidation.Input
  let usernameWithSpecialCharacter: UsernameValidation.Input
  let invalidUsername: UsernameValidation.Input
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
    invalidUsername = {
      username: `${faker.string.numeric()}${faker.string.alpha(16)} ${faker.string.symbol()}`
    }
    validUsername = {
      username: `${faker.string.alpha()}${faker.string.alphanumeric(15)}`
    }
  })

  test('Should return an error if username is less than 3 characters long', () => {
    const sut = new UsernameValidation()
    const error = sut.validate(shortUsername)
    expect(error).toEqual(new ValidationError('Username must be between 3 and 16 characters long'))
  })

  test('Should return an error if username is greater than 16 characters long', () => {
    const sut = new UsernameValidation()
    const error = sut.validate(longUsername)
    expect(error).toEqual(new ValidationError('Username must be between 3 and 16 characters long'))
  })

  test('Should return an error if username starts with a number', () => {
    const sut = new UsernameValidation()
    const error = sut.validate(usernameStartsWithNumber)
    expect(error).toEqual(new ValidationError('Username must start with a letter'))
  })

  test('Should return an error if username contains a special character', () => {
    const sut = new UsernameValidation()
    const error = sut.validate(usernameWithSpecialCharacter)
    expect(error).toEqual(new ValidationError('Username can only contain letters, digits, underscore, hyphen and dot'))
  })

  test('Should return an error if username contains spaces', () => {
    const sut = new UsernameValidation()
    const error = sut.validate(usernameWithSpaces)
    expect(error).toEqual(new ValidationError('Username must not contain spaces'))
  })

  test('Should return only one error if username contains more than 1 error', () => {
    const sut = new UsernameValidation()
    const error = sut.validate(invalidUsername)
    expect(error).toEqual(new ValidationError('Username must be between 3 and 16 characters long'))
  })

  test('Should return null if username is valid', () => {
    const sut = new UsernameValidation()
    const error = sut.validate(validUsername)
    expect(error).toBeNull()
  })
})
