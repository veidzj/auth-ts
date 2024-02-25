import { faker } from '@faker-js/faker'

import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makesut = (fieldName: string): RequiredFieldValidation => {
  return new RequiredFieldValidation(fieldName)
}

describe('RequiredFieldValidation', () => {
  let fieldName: string

  beforeEach(() => {
    fieldName = faker.word.words()
  })

  test('Should throw ValidationError if field is not provided', () => {
    const sut = makesut(fieldName)
    expect(() => {
      sut.validate({
        [fieldName]: ''
      })
    }).toThrow(new ValidationError(`${fieldName} is required`))
  })

  test('Should not throw if field is provided', () => {
    const sut = makesut(fieldName)
    expect(() => {
      sut.validate({
        [fieldName]: faker.word.words()
      })
    }).not.toThrow()
  })
})
