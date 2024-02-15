import { faker } from '@faker-js/faker'

import { PasswordValidation } from '@/validation/validators'

describe('PasswordValidation', () => {
  let shortPassword: string
  let longPassword: string
  let passwordWithNoLetter: string
  let passwordWithNoNumber: string
  let passwordWithNoSpecialCharacter: string
  let validOptions: { username: string, fullName: string, email: string, birthdate: string }
  let validPassword: string

  beforeAll(() => {
    shortPassword = faker.string.alpha({ length: { min: 1, max: 5 } })
    longPassword = faker.string.alpha(256)
    passwordWithNoLetter = faker.string.numeric(6)
    passwordWithNoNumber = faker.string.alpha(6)
    passwordWithNoSpecialCharacter = faker.string.alpha(3) + faker.string.numeric(3)
    validOptions = {
      username: faker.internet.userName(),
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      birthdate: faker.date.anytime().toDateString()
    }
    validPassword = faker.internet.password({ length: 15 }) + faker.string.symbol()
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
    const errors = sut.validate(validPassword + validOptions.username, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains full name', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(validPassword + validOptions.fullName, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains email', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(validPassword + validOptions.email, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains birthdate', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(validPassword + validOptions.birthdate, validOptions)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add only 1 error if password contains more than 1 personal data', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(validOptions.username + validOptions.fullName + validOptions.birthdate, validOptions)
    expect(errors.length).toBe(1)
  })
})
