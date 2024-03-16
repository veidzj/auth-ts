import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { DbChangePassword } from '@/application/usecases/commands'

const email: string = faker.internet.email()
const newPassword: string = faker.internet.password()

describe('DbChangePassword', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
      const sut = new DbChangePassword(checkAccountByEmailRepositorySpy)
      await sut.change(email, newPassword)
      expect(checkAccountByEmailRepositorySpy.email).toBe(email)
    })
  })
})
