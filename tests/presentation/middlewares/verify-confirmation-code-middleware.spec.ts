import { faker } from '@faker-js/faker'

import { VerifyConfirmationCodeSpy } from '@/tests/domain/mocks/queries'
import { VerifyConfirmationCodeMiddleware } from '@/presentation/middlewares'

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
})
