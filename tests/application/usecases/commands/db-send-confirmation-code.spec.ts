import { faker } from '@faker-js/faker'

import { DbSendConfirmationCode } from '@/application/usecases/commands'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'

const email: string = faker.internet.email()

describe('DbSendConfirmationCode', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
      const sut = new DbSendConfirmationCode(checkAccountByEmailRepositorySpy)
      await sut.send(email)
      expect(checkAccountByEmailRepositorySpy.email).toBe(email)
    })
  })
})
