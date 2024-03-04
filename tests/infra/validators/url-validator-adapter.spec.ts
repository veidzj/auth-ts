import validator from 'validator'
import { faker } from '@faker-js/faker'

import { URLValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isURL(): boolean {
    return true
  }
}))

const makeSut = (): URLValidatorAdapter => {
  return new URLValidatorAdapter()
}

describe('URLValidatorAdapter', () => {
  test('Should call validator with correct url', () => {
    const sut = makeSut()
    const isURLSpy = jest.spyOn(validator, 'isURL')
    const url = faker.internet.url()
    sut.isValid(url)
    expect(isURLSpy).toHaveBeenCalledWith(url)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid(faker.internet.url())
    expect(isValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isURL').mockReturnValueOnce(false)
    const isValid = sut.isValid(faker.internet.url())
    expect(isValid).toBe(false)
  })

  test('Should throw if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isURL').mockImplementationOnce(() => { throw new Error() })
    expect(() => {
      sut.isValid(faker.internet.url())
    }).toThrow()
  })
})
