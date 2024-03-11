import { faker } from '@faker-js/faker'

import { DbChangeEmail } from '@/application/usecases/commands'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'

interface Sut {
  sut: DbChangeEmail
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbChangeEmail(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

const currentEmail: string = faker.internet.email()
const newEmail: string = faker.internet.email()

describe('DbChangeEmail', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct emails', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
      await sut.change(currentEmail, newEmail)
      expect(checkAccountByEmailRepositorySpy.check).toHaveBeenNthCalledWith(1, currentEmail)
      expect(checkAccountByEmailRepositorySpy.check).toHaveBeenNthCalledWith(2, newEmail)
    })
  })
})
