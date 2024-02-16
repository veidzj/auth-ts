import { faker } from '@faker-js/faker'

import { PasswordValidation } from '@/validation/validators'

describe('PasswordValidation', () => {
  let shortPassword: { password: string }
  let longPassword: { password: string }
  let passwordWithNoLetter: { password: string }
  let passwordWithNoNumber: { password: string }
  let passwordWithNoSpecialCharacter: { password: string }
  let validPassword: { password: string }
  let validOptions: { username: string, fullName: string, email: string, birthdate: string }
  let passwordContainsUsername: { password: string }
  let passwordContainsFullName: { password: string }
  let passwordContainsEmail: { password: string }
  let passwordContainsBirthdate: { password: string }
  let passwordContainsAllPersonalData: { password: string }
  let invalidPassword: { password: string }

  beforeAll(() => {
    shortPassword = {
      password: faker.string.alpha({ length: { min: 1, max: 5 } })
    }
    longPassword = {
      password: faker.string.alpha(256)
    }
    passwordWithNoLetter = {
      password: faker.string.numeric(6)
    }
    passwordWithNoNumber = {
      password: faker.string.alpha(6)
    }
    passwordWithNoSpecialCharacter = {
      password: faker.string.alpha(3) + faker.string.numeric(3)
    }
    validPassword = {
      password: faker.internet.password({ length: 15 }) + faker.string.symbol()
    }
    validOptions = {
      username: faker.internet.userName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      birthdate: faker.date.anytime().toISOString()
    }
    passwordContainsUsername = {
      password: `${validPassword.password}${validOptions.username}`
    }
    passwordContainsFullName = {
      password: `${validPassword.password}${validOptions.fullName}`
    }
    passwordContainsEmail = {
      password: `${validPassword.password}${validOptions.email}`
    }
    passwordContainsBirthdate = {
      password: `${validPassword.password}${validOptions.birthdate}`
    }
    passwordContainsAllPersonalData = {
      password: `${validPassword.password}${validOptions.username}${validOptions.fullName}${validOptions.email}${validOptions.birthdate}`
    }
    invalidPassword = {
      password: `${validOptions.fullName}${faker.string.alpha(255)}`
    }
  })

  test('Should add an error if password is less than 6 characters long', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(shortPassword, validOptions)
    expect(errors[0]).toBe('Password must be between 6 and 255 characters long')
  })

  test('Should add an error if password is greater than 255 characters long', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(longPassword, validOptions)
    expect(errors[0]).toBe('Password must be between 6 and 255 characters long')
  })

  test('Should add an error if password does not contains a letter', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordWithNoLetter, validOptions)
    expect(errors[0]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
  })

  test('Should add an error if password does not contains a number', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordWithNoNumber, validOptions)
    expect(errors[0]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
  })

  test('Should add an error if password does not contains a special character', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordWithNoSpecialCharacter, validOptions)
    expect(errors[0]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
  })

  test('Should add an error if password contains username', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsUsername, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains full name', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsFullName, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains email', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsEmail, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains birthdate', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsBirthdate, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add only 1 error if password contains more than 1 personal data', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsAllPersonalData, validOptions)
    expect(errors.length).toBe(1)
  })

  test('Should add all errors if password contains more than 1 error', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(invalidPassword, validOptions)
    expect(errors.length).toBe(3)
    expect(errors[0]).toBe('Password must be between 6 and 255 characters long')
    expect(errors[1]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
    expect(errors[2]).toBe('Password cannot contain personal data')
  })

  test('Should not add an error if password is valid', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(validPassword, validOptions)
    expect(errors).toEqual([])
  })
})
