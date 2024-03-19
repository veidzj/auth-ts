import { faker } from '@faker-js/faker'

import { VerifyConfirmationCodeRepositorySpy } from '@/tests/application/mocks/queries'
import { DbVerifyConfirmationCode } from '@/application/usecases/queries'

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
})
