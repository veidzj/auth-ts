import { faker } from '@faker-js/faker'

import { DbChangeEmail } from '@/application/usecases/commands'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { AccountNotFoundError, AccountAlreadyExistsError } from '@/domain/errors'

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
        .mockReturnValueOnce(Promise.resolve(true))
        .mockReturnValueOnce(Promise.resolve(false))
      await sut.change(currentEmail, newEmail)
      expect(checkAccountByEmailRepositorySpy.check).toHaveBeenNthCalledWith(1, currentEmail)
      expect(checkAccountByEmailRepositorySpy.check).toHaveBeenNthCalledWith(2, newEmail)
    })

    test('Should throw AccountNotFoundError if first CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockReturnValueOnce(Promise.resolve(false))
        .mockReturnValueOnce(Promise.resolve(false))
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw AccountAlreadyExistsError if second CheckAccountByEmailRepository returns true', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockReturnValueOnce(Promise.resolve(true))
        .mockReturnValueOnce(Promise.resolve(true))
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow(new AccountAlreadyExistsError())
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockRejectedValueOnce(new Error())
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })
  })
})
