import { faker } from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'

describe('EmailValidation', () => {
  let invalidEmail: EmailValidation.Input
  let validEmail: EmailValidation.Input

  beforeAll(() => {
    invalidEmail = {
      email: faker.string.alpha(12)
    }
    validEmail = {
      email: faker.internet.email()
    }
  })

  test('Should add an error if email is invalid', () => {
    const sut = new EmailValidation()
    const errors = sut.validate(invalidEmail)
    expect(errors[0]).toBe('Email must be a valid email')
  })

  test('Should not add an error if email is valid', () => {
    const sut = new EmailValidation()
    const errors = sut.validate(validEmail)
    expect(errors).toEqual([])
  })
})
