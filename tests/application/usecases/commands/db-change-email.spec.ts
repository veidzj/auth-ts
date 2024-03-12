import { faker } from '@faker-js/faker'

import { DbChangeEmail } from '@/application/usecases/commands'
import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { ChangeEmailRepositorySpy } from '@/tests/application/mocks/commands'
import { AccountAlreadyExistsError } from '@/domain/errors'

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
      await sut.change(currentEmail, newEmail)
      expect(checkAccountByEmailRepositorySpy.check).toHaveBeenCalledWith(newEmail)
    })

    test('Should throw AccountAlreadyExistsError if CheckAccountByEmailRepository returns true', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockReturnValueOnce(Promise.resolve(true))
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
      jest.spyOn(changeEmailRepositorySpy, 'change')
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
      await sut.change(currentEmail, newEmail)
      expect(changeEmailRepositorySpy.change).toHaveBeenCalledWith(currentEmail, newEmail)
    })

    test('Should throw if ChangeEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy, changeEmailRepositorySpy } = makeSut()
      jest.spyOn(changeEmailRepositorySpy, 'change').mockRejectedValueOnce(new Error())
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check')
      const promise = sut.change(currentEmail, newEmail)
      await expect(promise).resolves.not.toThrow()
    })
  })
})
