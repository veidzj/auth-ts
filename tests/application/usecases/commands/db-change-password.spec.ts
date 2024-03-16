import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { HasherSpy } from '@/tests/application/mocks/cryptography'
import { ChangePasswordRepositorySpy } from '@/tests/application/mocks/commands'
import { DbChangePassword } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DbChangePassword
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
  changePasswordRepositorySpy: ChangePasswordRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const hasherSpy = new HasherSpy()
  const changePasswordRepositorySpy = new ChangePasswordRepositorySpy()
  const sut = new DbChangePassword(checkAccountByEmailRepositorySpy, hasherSpy, changePasswordRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    changePasswordRepositorySpy
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

  describe('Hasher', () => {
    test('Should call Hasher with correct password', async() => {
      const { sut, hasherSpy } = makeSut()

      await sut.change(email, newPassword)

      expect(hasherSpy.plainText).toBe(newPassword)
    })
  })

  describe('ChangePasswordRepository', () => {
    test('Should call ChangePasswordRepository with correct values', async() => {
      const { sut, changePasswordRepositorySpy } = makeSut()

      await sut.change(email, newPassword)

      expect(changePasswordRepositorySpy.email).toBe(email)
      expect(changePasswordRepositorySpy.newPassword).toBe(newPassword)
    })

    test('Should throw if ChangePasswordRepository throws', async() => {
      const { sut, changePasswordRepositorySpy } = makeSut()
      jest.spyOn(changePasswordRepositorySpy, 'change').mockRejectedValueOnce(new Error())

      const promise = sut.change(email, newPassword)

      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()

      const promise = sut.change(email, newPassword)

      await expect(promise).resolves.not.toThrow()
    })
  })
})
