import { faker } from '@faker-js/faker'

import { BirthdateValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

describe('BirthdateValidation', () => {
  let invalidBirthdate: BirthdateValidation.Input
  let validBirthdate: BirthdateValidation.Input

  beforeAll(() => {
    invalidBirthdate = {
      birthdate: faker.date.anytime().toString()
    }
    validBirthdate = {
      birthdate: `${faker.string.numeric(4)}-${faker.string.numeric(2)}-${faker.string.numeric(2)}`
    }
  })

  test('Should return an error if birthdate is in invalid format', () => {
    const sut = new BirthdateValidation()
    const error = sut.validate(invalidBirthdate)
    expect(error).toEqual(new ValidationError('Birthdate must be in the format YYYY-MM-DD (ISO 8601)'))
  })

  test('Should return null if birthdate is in valid format', () => {
    const sut = new BirthdateValidation()
    const error = sut.validate(validBirthdate)
    expect(error).toBeNull()
  })
})
