import { faker } from '@faker-js/faker'

import { VerifyConfirmationCodeRepositorySpy } from '@/tests/application/mocks/queries'
import { DbVerifyConfirmationCode } from '@/application/usecases/queries'
import { InvalidOrExpiredConfirmationCodeError } from '@/domain/errors'

const accountId: string = faker.string.uuid()
const confirmationCode: string = faker.string.alphanumeric(6)

describe('DbVerifyConfirmationCode', () => {
  test('Should call VerifyConfirmationCodeRepository with correct values', async() => {
    const verifyConfirmationCodeRepositorySpy = new VerifyConfirmationCodeRepositorySpy()
    const sut = new DbVerifyConfirmationCode(verifyConfirmationCodeRepositorySpy)
    await sut.verify(accountId, confirmationCode)
    expect(verifyConfirmationCodeRepositorySpy.accountId).toBe(accountId)
    expect(verifyConfirmationCodeRepositorySpy.confirmationCode).toBe(confirmationCode)
  })

  test('Should throw InvalidOrExpiredConfirmationCodeError if VerifyConfirmationCodeRepository returns false', async() => {
    const verifyConfirmationCodeRepositorySpy = new VerifyConfirmationCodeRepositorySpy()
    verifyConfirmationCodeRepositorySpy.output = false
    const sut = new DbVerifyConfirmationCode(verifyConfirmationCodeRepositorySpy)
    const promise = sut.verify(accountId, confirmationCode)
    await expect(promise).rejects.toThrow(new InvalidOrExpiredConfirmationCodeError())
  })
})
