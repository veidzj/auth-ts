import { faker } from '@faker-js/faker'

import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makesut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(fieldName)
}

const fieldName: string = faker.word.words()

describe('RequiredFieldValidation', () => {
  test('Should throw ValidationError if field is not provided', () => {
    const sut = makesut()
    expect(() => {
      sut.validate({
        [fieldName]: ''
      })
    }).toThrow(new ValidationError(`${fieldName} is required`))
  })

  test('Should not throw if field is provided', () => {
    const sut = makesut()
    expect(() => {
      sut.validate({
        [fieldName]: faker.word.words()
      })
    }).not.toThrow()
  })
})
