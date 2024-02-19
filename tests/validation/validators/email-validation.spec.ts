import { faker } from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

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

  test('Should return an error if email is invalid', () => {
    const sut = new EmailValidation()
    const error = sut.validate(invalidEmail)
    expect(error).toEqual(new ValidationError('Email must be a valid email'))
  })

  test('Should return null if email is valid', () => {
    const sut = new EmailValidation()
    const error = sut.validate(validEmail)
    expect(error).toBeNull()
  })
})
