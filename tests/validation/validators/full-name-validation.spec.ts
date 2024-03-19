import { faker } from '@faker-js/faker'

import { FullNameValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): FullNameValidation => {
  return new FullNameValidation(fieldName)
}

const fieldName: string = faker.word.words()

describe('FullNameValidation', () => {
  test('Should throw ValidationError if full name is less than 3 characters long', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha({ length: { min: 1, max: 2 } }) })
    }).toThrow(new ValidationError(`${fieldName} must be between 3 and 50 characters long`))
  })

  test('Should throw ValidationError if full name is greater than 50 characters long', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha(51) })
    }).toThrow(new ValidationError(`${fieldName} must be between 3 and 50 characters long`))
  })

  test('Should throw ValidationError if full name starts with a lowercase letter', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.string.alpha({ length: 16, casing: 'lower' }) })
    }).toThrow(new ValidationError(`${fieldName} must start with an uppercase letter`))
  })

  test('Should throw ValidationError if full name have an invalid space between words', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(16)}   ${faker.string.alpha(16)}` })
    }).toThrow(new ValidationError(`${fieldName} must be separated by a single space`))
  })

  test('Should throw ValidationError if full name have an invalid space after words', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(16)} ` })
    }).toThrow(new ValidationError(`${fieldName} must be separated by a single space`))
  })

  test('Should throw ValidationError if full name contains special character', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.symbol(15)}` })
    }).toThrow(new ValidationError(`${fieldName} can only contain letters and letters with accents`))
  })

  test('Should throw ValidationError if full name contains an isolated accent', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(16)}~` })
    }).toThrow(new ValidationError(`${fieldName} can only contain letters and letters with accents`))
  })

  test('Should not throw on success', () => {
    const sut = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: `${faker.string.alpha({ casing: 'upper' })} ${faker.string.alpha(8)} ${faker.string.alpha(8)}` })
    }).not.toThrow()
  })
})
