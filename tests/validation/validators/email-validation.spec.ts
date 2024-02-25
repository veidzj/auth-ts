import { faker } from '@faker-js/faker'

import { EmailValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

const makeSut = (): EmailValidation => {
  return new EmailValidation()
}

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

  test('Should throw ValidationError if email is invalid', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(invalidEmail)
    }).toThrow(new ValidationError('Email must be a valid email'))
  })

  test('Should not throw if email is valid', () => {
    const sut = makeSut()
    expect(() => {
      sut.validate(validEmail)
    }).not.toThrow()
  })
})
