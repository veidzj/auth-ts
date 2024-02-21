import { faker } from '@faker-js/faker'

import { RequiredFieldValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const fieldName: string = faker.word.words()

describe('RequiredFieldValidation', () => {
  test('Should throw ValidationError if field is not provided', () => {
    const sut = new RequiredFieldValidation(fieldName)
    expect(() => {
      sut.validate({
        [fieldName]: ''
      })
    }).toThrow(new ValidationError(`${fieldName} is required`))
  })
})
