import { faker } from '@faker-js/faker'

import { URLValidatorSpy } from '@/tests/validation/mocks'
import { URLValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: URLValidation
  urlValidatorSpy: URLValidatorSpy
}

const makeSut = (): Sut => {
  const urlValidatorSpy = new URLValidatorSpy()
  const sut = new URLValidation(urlValidatorSpy, fieldName)
  return {
    sut,
    urlValidatorSpy
  }
}

const fieldName: string = faker.word.words()

describe('URLValidation', () => {
  test('Should call URLValidator with correct url', () => {
    const { sut, urlValidatorSpy } = makeSut()
    const url = faker.internet.url()

    sut.validate({ [fieldName]: url })

    expect(urlValidatorSpy.url).toBe(url)
  })

  test('Should throw ValidationError if URLValidator returns false', () => {
    const { sut, urlValidatorSpy } = makeSut()
    urlValidatorSpy.islURLValid = false

    expect(() => {
      sut.validate({ [fieldName]: faker.internet.url() })
    }).toThrow(new ValidationError(`${fieldName} image must be a valid url`))
  })

  test('Should throw if URLValidator throws', () => {
    const { sut, urlValidatorSpy } = makeSut()
    jest.spyOn(urlValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })

    expect(() => {
      sut.validate({ [fieldName]: faker.internet.url() })
    }).toThrow()
  })

  test('Should not throw on success', () => {
    const { sut } = makeSut()

    expect(() => {
      sut.validate({ [fieldName]: faker.internet.url() })
    }).not.toThrow()
  })
})
