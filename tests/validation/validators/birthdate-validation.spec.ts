import { faker } from '@faker-js/faker'

import { BirthdateValidation } from '@/validation/validators'

describe('BirthdateValidation', () => {
  let invalidBirthdate: { birthdate: string }

  beforeAll(() => {
    invalidBirthdate = {
      birthdate: faker.date.anytime().toString()
    }
  })

  test('Should add an error if birthdate is in invalid format', () => {
    const sut = new BirthdateValidation()
    const errors = sut.validate(invalidBirthdate)
    expect(errors[0]).toBe('Birthdate must be in the format YYYY-MM-DD (ISO 8601)')
  })
})
