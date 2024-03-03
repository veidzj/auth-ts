import { faker } from '@faker-js/faker'

import { URLValidatorSpy } from '@/tests/validation/mocks'
import { ProfileImageValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: ProfileImageValidation
  urlValidatorSpy: URLValidatorSpy
}

const makeSut = (): Sut => {
  const urlValidatorSpy = new URLValidatorSpy()
  const sut = new ProfileImageValidation(urlValidatorSpy)
  return {
    sut,
    urlValidatorSpy
  }
}

describe('ProfileImageValidation', () => {
  test('Should call URLValidator with correct url', () => {
    const { sut, urlValidatorSpy } = makeSut()
    const url = faker.internet.url()
    sut.validate({ profileImage: url })
    expect(urlValidatorSpy.url).toBe(url)
  })

  test('Should throw ValidationError if URLValidator returns false', () => {
    const { sut, urlValidatorSpy } = makeSut()
    urlValidatorSpy.islURLValid = false
    expect(() => {
      sut.validate({ profileImage: faker.internet.url() })
    }).toThrow(new ValidationError('Profile image must be a valid url'))
  })
})
