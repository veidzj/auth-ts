import { faker } from '@faker-js/faker'

import { PasswordValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): PasswordValidation => {
  return new PasswordValidation(fieldName)
}

const fieldName: string = faker.word.words()

describe('PasswordValidation', () => {
  test('Should throw ValidationError if password is less than 6 characters long', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha({ length: { min: 1, max: 5 } }) })
    }).toThrow(new ValidationError(`${fieldName} must be between 6 and 255 characters long`))
  })

  test('Should throw ValidationError if password is greater than 255 characters long', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha(256) })
    }).toThrow(new ValidationError(`${fieldName} must be between 6 and 255 characters long`))
  })

  test('Should throw ValidationError if password does not contains a letter', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.numeric(6) })
    }).toThrow(new ValidationError(`${fieldName} must contain at least 1 letter, 1 digit, and 1 special character`))
  })

  test('Should throw ValidationError if password does not contains a number', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha(6) })
    }).toThrow(new ValidationError(`${fieldName} must contain at least 1 letter, 1 digit, and 1 special character`))
  })

  test('Should throw ValidationError if password does not contains a special character', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha(3) + faker.string.numeric(3) })
    }).toThrow(new ValidationError(`${fieldName} must contain at least 1 letter, 1 digit, and 1 special character`))
  })

  test('Should not throw on success', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.internet.password({ length: 15 }) + faker.string.alpha() + faker.string.numeric() + faker.string.symbol() })
    }).not.toThrow()
  })
})
