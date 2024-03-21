import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { HasherSpy } from '@/tests/application/mocks/cryptography'
import { ChangePasswordRepositorySpy } from '@/tests/application/mocks/commands'
import { DbChangePassword } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DbChangePassword
  checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
  hasherSpy: HasherSpy
  changePasswordRepositorySpy: ChangePasswordRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
  const hasherSpy = new HasherSpy()
  const changePasswordRepositorySpy = new ChangePasswordRepositorySpy()
  const sut = new DbChangePassword(checkAccountByIdRepositorySpy, hasherSpy, changePasswordRepositorySpy)
  return {
    sut,
    checkAccountByIdRepositorySpy,
    hasherSpy,
    changePasswordRepositorySpy
  }
}

const accountId: string = faker.string.uuid()
const newPassword: string = faker.internet.password()

describe('DbChangePassword', () => {
  describe('CheckAccountByIdRepository', () => {
    test('Should call CheckAccountByIdRepository with correct id', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()

      await sut.change(accountId, newPassword)

      expect(checkAccountByIdRepositorySpy.id).toBe(accountId)
    })

    test('Should throw AccountNotFoundError if CheckAccountByIdRepository returns false', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      checkAccountByIdRepositorySpy.output = false

      const promise = sut.change(accountId, newPassword)

      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByIdRepository throws', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByIdRepositorySpy, 'check').mockRejectedValue(new Error())

      const promise = sut.change(accountId, newPassword)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('Hasher', () => {
    test('Should call Hasher with correct password', async() => {
      const { sut, hasherSpy } = makeSut()

      await sut.change(accountId, newPassword)

      expect(hasherSpy.plainText).toBe(newPassword)
    })

    test('Should throw if Hasher throws', async() => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(new Error())

      const promise = sut.change(accountId, newPassword)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('ChangePasswordRepository', () => {
    test('Should call ChangePasswordRepository with correct values', async() => {
      const { sut, hasherSpy, changePasswordRepositorySpy } = makeSut()

      await sut.change(accountId, newPassword)

      expect(changePasswordRepositorySpy.accountId).toBe(accountId)
      expect(changePasswordRepositorySpy.newPassword).toBe(hasherSpy.digest)
    })

    test('Should throw if ChangePasswordRepository throws', async() => {
      const { sut, changePasswordRepositorySpy } = makeSut()
      jest.spyOn(changePasswordRepositorySpy, 'change').mockRejectedValueOnce(new Error())

      const promise = sut.change(accountId, newPassword)

      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()

      const promise = sut.change(accountId, newPassword)

      await expect(promise).resolves.not.toThrow()
    })
  })
})
