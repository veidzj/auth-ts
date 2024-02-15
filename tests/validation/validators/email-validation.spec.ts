import { faker } from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'

describe('EmailValidation', () => {
  let invalidEmail: { email: string }

  beforeAll(() => {
    invalidEmail = {
      email: faker.string.alpha(12)
    }
  })

  test('Should add an error if email is not a valid email', () => {
    const sut = new EmailValidation()
    const errors = sut.validate(invalidEmail)
    expect(errors[0]).toBe('Email must be a valid email')
  })
})
