import { faker } from '@faker-js/faker'

import { PasswordValidation } from '@/validation/validators'

const mockPassword = (): PasswordValidation.Input => ({
  password: faker.internet.password({ length: 15 }) + faker.string.symbol(),
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
  let passwordContainsAllPersonalData: PasswordValidation.Input
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
    passwordContainsAllPersonalData = { ...validPassword, password: `${validPassword.password}${validPassword.username}${validPassword.fullName}${validPassword.email}${validPassword.birthdate}` }
    invalidPassword = { ...validPassword, password: `${validPassword.fullName}${faker.string.alpha(255)}` }
  })

  test('Should add an error if password is less than 6 characters long', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(shortPassword)
    expect(errors[0]).toBe('Password must be between 6 and 255 characters long')
  })

  test('Should add an error if password is greater than 255 characters long', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(longPassword)
    expect(errors[0]).toBe('Password must be between 6 and 255 characters long')
  })

  test('Should add an error if password does not contains a letter', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordWithNoLetter)
    expect(errors[0]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
  })

  test('Should add an error if password does not contains a number', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordWithNoNumber)
    expect(errors[0]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
  })

  test('Should add an error if password does not contains a special character', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordWithNoSpecialCharacter)
    expect(errors[0]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
  })

  test('Should add an error if password contains username', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsUsername)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains full name', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsFullName)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains email', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsEmail)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add an error if password contains birthdate', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsBirthdate)
    expect(errors[0]).toBe('Password cannot contain personal data')
  })

  test('Should add only 1 error if password contains more than 1 personal data', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(passwordContainsAllPersonalData)
    expect(errors.length).toBe(1)
  })

  test('Should add all errors if password contains more than 1 error', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(invalidPassword)
    expect(errors.length).toBe(3)
    expect(errors[0]).toBe('Password must be between 6 and 255 characters long')
    expect(errors[1]).toBe('Password must contain at least 1 letter, 1 digit, and 1 special character')
    expect(errors[2]).toBe('Password cannot contain personal data')
  })

  test('Should not add an error if password is valid', () => {
    const sut = new PasswordValidation()
    const errors = sut.validate(validPassword)
    expect(errors).toEqual([])
  })
})
