import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { SendConfirmationCodeController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: SendConfirmationCodeController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new SendConfirmationCodeController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): object => ({
  email: faker.internet.email()
})

describe('SendConfirmationCodeController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return badRequest if Validation throws ValidationError', async() => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
  })

  test('Should return serverError if Validation throws', async() => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })
})
