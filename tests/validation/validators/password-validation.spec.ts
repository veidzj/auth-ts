import { faker } from '@faker-js/faker'

import { PasswordValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): PasswordValidation => {
  return new PasswordValidation()
}

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
  })

  test('Should throw ValidationError if password is less than 6 characters long', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(shortPassword)
    }).toThrow(new ValidationError('Password must be between 6 and 255 characters long'))
  })

  test('Should throw ValidationError if password is greater than 255 characters long', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(longPassword)
    }).toThrow(new ValidationError('Password must be between 6 and 255 characters long'))
  })

  test('Should throw ValidationError if password does not contains a letter', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(passwordWithNoLetter)
    }).toThrow(new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character'))
  })

  test('Should throw ValidationError if password does not contains a number', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(passwordWithNoNumber)
    }).toThrow(new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character'))
  })

  test('Should throw ValidationError if password does not contains a special character', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(passwordWithNoSpecialCharacter)
    }).toThrow(new ValidationError('Password must contain at least 1 letter, 1 digit, and 1 special character'))
  })

  test('Should throw ValidationError if password contains username', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(passwordContainsUsername)
    }).toThrow(new ValidationError('Password cannot contain personal data'))
  })

  test('Should throw ValidationError if password contains full name', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(passwordContainsFullName)
    }).toThrow(new ValidationError('Password cannot contain personal data'))
  })

  test('Should throw ValidationError if password contains email', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(passwordContainsEmail)
    }).toThrow(new ValidationError('Password cannot contain personal data'))
  })

  test('Should throw ValidationError if password contains birthdate', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(passwordContainsBirthdate)
    }).toThrow(new ValidationError('Password cannot contain personal data'))
  })

  test('Should not throw if password is valid', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(validPassword)
    }).not.toThrow()
  })
})
