import { faker } from '@faker-js/faker'

import { BirthdateValidation } from '@/validation/validators'

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

  test('Should add an error if birthdate is in invalid format', () => {
    const sut = new BirthdateValidation()
    const errors = sut.validate(invalidBirthdate)
    expect(errors[0]).toBe('Birthdate must be in the format YYYY-MM-DD (ISO 8601)')
  })

  test('Should not add an error if birthdate is in valid format', () => {
    const sut = new BirthdateValidation()
    const errors = sut.validate(validBirthdate)
    expect(errors).toEqual([])
  })
})
