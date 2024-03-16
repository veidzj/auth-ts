import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { DbChangePassword } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DbChangePassword
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const sut = new DbChangePassword(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

const email: string = faker.internet.email()
const newPassword: string = faker.internet.password()

describe('DbChangePassword', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()

      await sut.change(email, newPassword)

      expect(checkAccountByEmailRepositorySpy.email).toBe(email)
    })

    test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = false

      const promise = sut.change(email, newPassword)

      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockRejectedValue(new Error())

      const promise = sut.change(email, newPassword)
      
      await expect(promise).rejects.toThrow()
    })
  })
})
