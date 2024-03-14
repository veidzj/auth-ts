import { faker } from '@faker-js/faker'

import { DbSendConfirmationCode } from '@/application/usecases/commands'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'

interface Sut {
  sut: DbSendConfirmationCode
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
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
  })
})
