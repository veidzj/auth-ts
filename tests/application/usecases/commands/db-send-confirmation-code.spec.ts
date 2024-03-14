import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { DbSendConfirmationCode } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DbSendConfirmationCode
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const sut = new DbSendConfirmationCode(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

const email: string = faker.internet.email()

describe('DbSendConfirmationCode', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      await sut.send(email)
      expect(checkAccountByEmailRepositorySpy.email).toBe(email)
    })

    test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = false
      const promise = sut.send(email)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })
  })
})
