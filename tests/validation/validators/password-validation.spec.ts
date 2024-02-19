import { faker } from '@faker-js/faker'

import { PasswordValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const mockPassword = (): PasswordValidation.Input => ({
  password: faker.internet.password({ length: 15 }) + faker.string.numeric() + faker.string.symbol(),
  username: faker.internet.userName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  birthdate: faker.date.anytime().toISOString()
})

describe('PasswordValidation', () => {
  let shortPassword: PasswordValidation.Input
  let longPassword: PasswordValidation.Input
  let passwordWithNoLetter: PasswordValidation.Input
  let passwordWithNoNumber: PasswordValidation.Input
  let passwordWithNoSpecialCharacter: PasswordValidation.Input
  let validPassword: PasswordValidation.Input
  let passwordContainsUsername: PasswordValidation.Input
  let passwordContainsFullName: PasswordValidation.Input
  let passwordContainsEmail: PasswordValidation.Input
  let passwordContainsBirthdate: PasswordValidation.Input
  let invalidPassword: PasswordValidation.Input

  beforeAll(() => {
    validPassword = mockPassword()
    shortPassword = { ...validPassword, password: faker.string.alpha({ length: { min: 1, max: 5 } }) }
    longPassword = { ...validPassword, password: faker.string.alpha(256) }
    passwordWithNoLetter = { ...validPassword, password: faker.string.numeric(6) }
    passwordWithNoNumber = { ...validPassword, password: faker.string.alpha(6) }
    passwordWithNoSpecialCharacter = { ...validPassword, password: faker.string.alpha(3) + faker.string.numeric(3) }
    passwordContainsUsername = { ...validPassword, password: `${validPassword.password}${validPassword.username}` }
    passwordContainsFullName = { ...validPassword, password: `${validPassword.password}${validPassword.fullName}` }
    passwordContainsEmail = { ...validPassword, password: `${validPassword.password}${validPassword.email}` }
    passwordContainsBirthdate = { ...validPassword, password: `${validPassword.password}${validPassword.birthdate}` }
    invalidPassword = { ...validPassword, password: `${validPassword.fullName}${faker.string.alpha(255)}` }
  })

  test('Should return an error if password is less than 6 characters long', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(shortPassword)
    expect(error).toEqual(new ValidationError('Password must be between 6 and 255 characters long'))
  })

  test('Should return an error if password is greater than 255 characters long', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(longPassword)
    expect(error).toEqual(new ValidationError('Password must be between 6 and 255 characters long'))
  })

  test('Should return an error if password does not contains a letter', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(passwordWithNoLetter)
    expect(error).toEqual(new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character'))
  })

  test('Should return an error if password does not contains a number', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(passwordWithNoNumber)
    expect(error).toEqual(new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character'))
  })

  test('Should return an error if password does not contains a special character', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(passwordWithNoSpecialCharacter)
    expect(error).toEqual(new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character'))
  })

  test('Should return an error if password contains username', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(passwordContainsUsername)
    expect(error).toEqual(new ValidationError('Password cannot contain personal data'))
  })

  test('Should return an error if password contains full name', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(passwordContainsFullName)
    expect(error).toEqual(new ValidationError('Password cannot contain personal data'))
  })

  test('Should return an error if password contains email', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(passwordContainsEmail)
    expect(error).toEqual(new ValidationError('Password cannot contain personal data'))
  })

  test('Should return an error if password contains birthdate', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(passwordContainsBirthdate)
    expect(error).toEqual(new ValidationError('Password cannot contain personal data'))
  })

  test('Should return only one error if password contains more than 1 error', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(invalidPassword)
    expect(error).toEqual(new ValidationError('Password must be between 6 and 255 characters long'))
  })

  test('Should return null if password is valid', () => {
    const sut = new PasswordValidation()
    const error = sut.validate(validPassword)
    expect(error).toBeNull()
  })
})
