import { faker } from '@faker-js/faker'

import { DbChangeEmail } from '@/application/usecases/commands'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { ChangeEmailRepositorySpy } from '@/tests/application/mocks/commands'
import { AccountNotFoundError, AccountAlreadyExistsError } from '@/domain/errors'

interface Sut {
  sut: DbChangeEmail
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  changeEmailRepositorySpy: ChangeEmailRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const changeEmailRepositorySpy = new ChangeEmailRepositorySpy()
  const sut = new DbChangeEmail(checkAccountByEmailRepositorySpy, changeEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    changeEmailRepositorySpy
  }
}

const currentEmail: string = faker.internet.email()
const newEmail: string = faker.internet.email()

describe('DbChangeEmail', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)

      await sut.change(currentEmail, newEmail)

      expect(checkAccountByEmailRepositorySpy.check).toHaveBeenNthCalledWith(1, currentEmail)
      expect(checkAccountByEmailRepositorySpy.check).toHaveBeenNthCalledWith(2, newEmail)
    })

    test('Should throw AccountNotFoundError if first CheckAccountByEmailRepository call returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockResolvedValueOnce(false)
        .mockResolvedValueOnce(false)

      const promise = sut.change(currentEmail, newEmail)

      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw AccountAlreadyExistsError if second CheckAccountByEmailRepository call returns true', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(true)

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

  describe('ChangeEmailRepository', () => {
    test('Should call ChangeEmailRepository with correct emails', async() => {
      const { sut, checkAccountByEmailRepositorySpy, changeEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)
      jest.spyOn(changeEmailRepositorySpy, 'change')

      await sut.change(currentEmail, newEmail)

      expect(changeEmailRepositorySpy.change).toHaveBeenCalledWith(currentEmail, newEmail)
    })

    test('Should throw if ChangeEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy, changeEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)
      jest.spyOn(changeEmailRepositorySpy, 'change').mockRejectedValueOnce(new Error())

      const promise = sut.change(currentEmail, newEmail)

      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false)

      const promise = sut.change(currentEmail, newEmail)

      await expect(promise).resolves.not.toThrow()
    })
  })
})
