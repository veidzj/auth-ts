import { faker } from '@faker-js/faker'

import { UsernameValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): UsernameValidation => {
  return new UsernameValidation(fieldName)
}

const fieldName: string = faker.word.words()

describe('UsernameValidation', () => {
  test('Should throw ValidationError if username is less than 3 characters long', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha({ length: { min: 1, max: 2 } }) })
    }).toThrow(new ValidationError(`${fieldName} must be between 3 and 16 characters long`))
  })

  test('Should throw ValidationError if username is greater than 16 characters long', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha(17) })
    }).toThrow(new ValidationError(`${fieldName} must be between 3 and 16 characters long`))
  })

  test('Should throw ValidationError if username starts with a number', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.numeric()}${faker.string.alpha(2)}` })
    }).toThrow(new ValidationError(`${fieldName} must start with a letter`))
  })

  test('Should throw ValidationError if username contains a special character', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha()}${faker.string.symbol(15)}` })
    }).toThrow(new ValidationError(`${fieldName} can only contain letters, digits, underscore, hyphen and dot`))
  })

  test('Should throw ValidationError if username contains spaces', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha({ length: { min: 2, max: 15 } })} ` })
    }).toThrow(new ValidationError(`${fieldName} must not contain spaces`))
  })

  test('Should not throw on success', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha()}${faker.string.alphanumeric(15)}` })
    }).not.toThrow()
  })
})
