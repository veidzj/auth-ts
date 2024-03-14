import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { AddConfirmationCodeRepositorySpy } from '@/tests/application/mocks/commands'
import { DbSendConfirmationCode } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'
import { GenerateConfirmationCode } from '@/application/helpers'

interface Sut {
  sut: DbSendConfirmationCode
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  addConfirmationCodeRepositorySpy: AddConfirmationCodeRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const addConfirmationCodeRepositorySpy = new AddConfirmationCodeRepositorySpy()
  const sut = new DbSendConfirmationCode(checkAccountByEmailRepositorySpy, addConfirmationCodeRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    addConfirmationCodeRepositorySpy
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

    test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = false
      const promise = sut.send(email)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockRejectedValueOnce(new Error())
      const promise = sut.send(email)
      await expect(promise).rejects.toThrow(new Error())
    })
  })

  describe('AddConfirmationCodeRepository', () => {
    test('Should call AddConfirmationCodeRepository with correct code', async() => {
      const confirmationCode = faker.string.alphanumeric(6)
      jest.spyOn(GenerateConfirmationCode, 'generate').mockReturnValue(confirmationCode)
      const { sut, addConfirmationCodeRepositorySpy } = makeSut()
      await sut.send(email)
      expect(addConfirmationCodeRepositorySpy.confirmationCode).toBe(confirmationCode)
    })
  })
})
