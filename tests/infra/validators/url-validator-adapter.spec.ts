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
})
