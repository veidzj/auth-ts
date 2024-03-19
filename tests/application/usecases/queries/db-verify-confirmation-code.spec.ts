import { faker } from '@faker-js/faker'

import { VerifyConfirmationCodeRepositorySpy } from '@/tests/application/mocks/queries'
import { DbVerifyConfirmationCode } from '@/application/usecases/queries'
import { InvalidOrExpiredConfirmationCodeError } from '@/domain/errors'

interface Sut {
  sut: DbVerifyConfirmationCode
  verifyConfirmationCodeRepositorySpy: VerifyConfirmationCodeRepositorySpy
}

const makeSut = (): Sut => {
  const verifyConfirmationCodeRepositorySpy = new VerifyConfirmationCodeRepositorySpy()
  const sut = new DbVerifyConfirmationCode(verifyConfirmationCodeRepositorySpy)
  return {
    sut,
    verifyConfirmationCodeRepositorySpy
  }
}

const accountId: string = faker.string.uuid()
const confirmationCode: string = faker.string.alphanumeric(6)

describe('DbVerifyConfirmationCode', () => {
  test('Should call VerifyConfirmationCodeRepository with correct values', async() => {
    const { sut, verifyConfirmationCodeRepositorySpy } = makeSut()
    await sut.verify(accountId, confirmationCode)
    expect(verifyConfirmationCodeRepositorySpy.accountId).toBe(accountId)
    expect(verifyConfirmationCodeRepositorySpy.confirmationCode).toBe(confirmationCode)
  })

  test('Should throw InvalidOrExpiredConfirmationCodeError if VerifyConfirmationCodeRepository returns false', async() => {
    const { sut, verifyConfirmationCodeRepositorySpy } = makeSut()
    verifyConfirmationCodeRepositorySpy.output = false
    const promise = sut.verify(accountId, confirmationCode)
    await expect(promise).rejects.toThrow(new InvalidOrExpiredConfirmationCodeError())
  })

  test('Should throw if VerifyConfirmationCodeRepository throws', async() => {
    const { sut, verifyConfirmationCodeRepositorySpy } = makeSut()
    jest.spyOn(verifyConfirmationCodeRepositorySpy, 'verify').mockRejectedValueOnce(new Error())
    const promise = sut.verify(accountId, confirmationCode)
    await expect(promise).rejects.toThrow(new Error())
  })
})
