import { faker } from '@faker-js/faker'

import { VerifyConfirmationCodeSpy } from '@/tests/domain/mocks/queries'
import { VerifyConfirmationCodeMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { InvalidOrExpiredConfirmationCodeError } from '@/domain/errors'

interface Sut {
  sut: VerifyConfirmationCodeMiddleware
  verifyConfirmationCodeSpy: VerifyConfirmationCodeSpy
}

const makeSut = (): Sut => {
  const verifyConfirmationCodeSpy = new VerifyConfirmationCodeSpy()
  const sut = new VerifyConfirmationCodeMiddleware(verifyConfirmationCodeSpy)
  return {
    sut,
    verifyConfirmationCodeSpy
  }
}

const mockRequest = (): VerifyConfirmationCodeMiddleware.Request => ({
  accountId: faker.string.uuid(),
  confirmationCode: faker.string.alphanumeric(6)
})

describe('VerifyConfirmationCodeMiddleware', () => {
  test('Should call VerifyConfirmationCode with correct values', async() => {
    const { sut, verifyConfirmationCodeSpy } = makeSut()
    const request = mockRequest()

    await sut.handle(request)

    expect(verifyConfirmationCodeSpy.accountId).toBe(request.accountId)
    expect(verifyConfirmationCodeSpy.confirmationCode).toBe(request.confirmationCode)
  })

  test('Should return badRequest if VerifyConfirmationCode throws InvalidOrExpiredConfirmationCodeError', async() => {
    const { sut, verifyConfirmationCodeSpy } = makeSut()
    jest.spyOn(verifyConfirmationCodeSpy, 'verify').mockRejectedValueOnce(new InvalidOrExpiredConfirmationCodeError())

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(HttpHelper.badRequest(new InvalidOrExpiredConfirmationCodeError()))
  })

  test('Should return serverError if VerifyConfirmationCode throws', async() => {
    const { sut, verifyConfirmationCodeSpy } = makeSut()
    jest.spyOn(verifyConfirmationCodeSpy, 'verify').mockRejectedValueOnce(new Error())

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return noContent on success', async() => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(mockRequest())

    expect(httpResponse).toEqual(HttpHelper.noContent())
  })
})
