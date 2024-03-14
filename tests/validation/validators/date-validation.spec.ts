import { faker } from '@faker-js/faker'

import { DateValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): DateValidation => {
  return new DateValidation(fieldName)
}

const fieldName: string = faker.word.words()

describe('DateValidation', () => {
  let invalidDate: string
  let validDate: string

  beforeAll(() => {
    invalidDate = faker.date.anytime().toString()
    validDate = `${faker.string.numeric(4)}-${faker.string.numeric(2)}-${faker.string.numeric(2)}`
  })

  test('Should throw ValidationError if date is in invalid format', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate({ [fieldName]: invalidDate })
    }).toThrow(new ValidationError(`${fieldName} must be in the format YYYY-MM-DD (ISO 8601)`))
  })

  test('Should not throw if date is in valid format', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate({ [fieldName]: validDate })
    }).not.toThrow()
  })
})
