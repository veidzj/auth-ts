import { faker } from '@faker-js/faker'

import { VerifyConfirmationCodeSpy } from '@/tests/domain/mocks/queries'
import { VerifyConfirmationCodeMiddleware } from '@/presentation/middlewares'

const mockRequest = (): VerifyConfirmationCodeMiddleware.Request => ({
  accountId: faker.string.uuid(),
  confirmationCode: faker.string.alphanumeric(6)
})

describe('VerifyConfirmationCodeMiddleware', () => {
  test('Should call VerifyConfirmationCode with correct values', async() => {
    const verifyConfirmationCodeSpy = new VerifyConfirmationCodeSpy()
    const sut = new VerifyConfirmationCodeMiddleware(verifyConfirmationCodeSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(verifyConfirmationCodeSpy.accountId).toBe(request.accountId)
    expect(verifyConfirmationCodeSpy.confirmationCode).toBe(request.confirmationCode)
  })
})
