import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { SendConfirmationCodeSpy } from '@/tests/domain/mocks/commands'
import { SendConfirmationCodeController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: SendConfirmationCodeController
  validationSpy: ValidationSpy
  sendConfirmationCodeSpy: SendConfirmationCodeSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sendConfirmationCodeSpy = new SendConfirmationCodeSpy()
  const sut = new SendConfirmationCodeController(validationSpy, sendConfirmationCodeSpy)
  return {
    sut,
    validationSpy,
    sendConfirmationCodeSpy
  }
}

const mockRequest = (): SendConfirmationCodeController.Request => ({
  email: faker.internet.email(),
  accountId: faker.string.uuid()
})

describe('SendConfirmationCodeController', () => {
  describe('Validation', () => {
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

      expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
    })
  })

  describe('SendConfirmationCode', () => {
    test('Should call SendConfirmationCode with correct values', async() => {
      const { sut, sendConfirmationCodeSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(sendConfirmationCodeSpy.email).toBe(request.email)
      expect(sendConfirmationCodeSpy.accountId).toBe(request.accountId)
    })

    test('Should return notFound if SendConfirmationCode throws AccountNotFoundError', async() => {
      const { sut, sendConfirmationCodeSpy } = makeSut()
      jest.spyOn(sendConfirmationCodeSpy, 'send').mockRejectedValueOnce(new AccountNotFoundError())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
    })

    test('Should return serverError if SendConfirmationCode throws', async() => {
      const { sut, sendConfirmationCodeSpy } = makeSut()
      jest.spyOn(sendConfirmationCodeSpy, 'send').mockRejectedValueOnce(new Error())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
    })

    test('Should return ok on success', async() => {
      const { sut, sendConfirmationCodeSpy } = makeSut()
      const request = mockRequest()

      const httpResponse = await sut.handle(request)

      expect(httpResponse).toEqual(HttpHelper.ok({
        insertedId: sendConfirmationCodeSpy.insertedId,
        message: `Confirmation code successfully sent to ${request.email}`
      }))
    })
  })
})
