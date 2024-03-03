import { faker } from '@faker-js/faker'

import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { EmailValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): Sut => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('EmailValidation', () => {
  test('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('Should throw ValidationError if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    expect(() => {
      sut.validate({ email: faker.internet.email() })
    }).toThrow(new ValidationError('Email must be a valid email'))
  })

  test('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(() => {
      sut.validate({ email: faker.internet.email() })
    }).toThrow()
  })

  test('Should not throw if if EmailValidator returns true', () => {
    const { sut } = makeSut()
    expect(() => {
      sut.validate({ email: faker.internet.email() })
    }).not.toThrow()
  })
})
