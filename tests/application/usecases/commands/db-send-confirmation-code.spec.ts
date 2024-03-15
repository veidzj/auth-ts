import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { AddConfirmationCodeRepositorySpy } from '@/tests/application/mocks/commands'
import { SendConfirmationCodeToEmailSpy } from '@/tests/application/mocks/services'
import { DbSendConfirmationCode } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'
import { GenerateConfirmationCode } from '@/application/helpers'

interface Sut {
  sut: DbSendConfirmationCode
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  addConfirmationCodeRepositorySpy: AddConfirmationCodeRepositorySpy
  sendConfirmationCodeToEmailSpy: SendConfirmationCodeToEmailSpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  checkAccountByEmailRepositorySpy.output = true
  const addConfirmationCodeRepositorySpy = new AddConfirmationCodeRepositorySpy()
  const sendConfirmationCodeToEmailSpy = new SendConfirmationCodeToEmailSpy()
  const sut = new DbSendConfirmationCode(checkAccountByEmailRepositorySpy, addConfirmationCodeRepositorySpy, sendConfirmationCodeToEmailSpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    addConfirmationCodeRepositorySpy,
    sendConfirmationCodeToEmailSpy
  }
}

const email: string = faker.internet.email()
const accountId: string = faker.string.uuid()
const confirmationCode: string = faker.string.alphanumeric(6)

describe('DbSendConfirmationCode', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()

      await sut.send(email, accountId)

      expect(checkAccountByEmailRepositorySpy.email).toBe(email)
    })

    test('Should throw AccountNotFoundError if CheckAccountByEmailRepository returns false', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = false

      const promise = sut.send(email, accountId)

      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockRejectedValueOnce(new Error())

      const promise = sut.send(email, accountId)

      await expect(promise).rejects.toThrow(new Error())
    })
  })

  describe('AddConfirmationCodeRepository', () => {
    test('Should call AddConfirmationCodeRepository with correct values', async() => {
      const { sut, addConfirmationCodeRepositorySpy } = makeSut()
      jest.spyOn(GenerateConfirmationCode, 'generate').mockReturnValue(confirmationCode)

      await sut.send(email, accountId)

      expect(addConfirmationCodeRepositorySpy.confirmationCode).toBe(confirmationCode)
      expect(addConfirmationCodeRepositorySpy.accountId).toBe(accountId)
    })

    test('Should return insertedId on success', async() => {
      const { sut, addConfirmationCodeRepositorySpy } = makeSut()

      const insertedId = await sut.send(email, accountId)

      expect(insertedId).toBe(addConfirmationCodeRepositorySpy.insertedId)
    })

    test('Should throw if AddConfirmationCodeRepository throws', async() => {
      const { sut, addConfirmationCodeRepositorySpy } = makeSut()
      jest.spyOn(addConfirmationCodeRepositorySpy, 'add').mockRejectedValueOnce(new Error())

      const promise = sut.send(email, accountId)

      await expect(promise).rejects.toThrow()
    })
  })

  describe('SendConfirmationCodeToEmail', () => {
    test('Should call SendConfirmationCodeToEmail with correct values', async() => {
      const { sut, sendConfirmationCodeToEmailSpy } = makeSut()
      jest.spyOn(GenerateConfirmationCode, 'generate').mockReturnValue(confirmationCode)

      await sut.send(email, accountId)

      expect(sendConfirmationCodeToEmailSpy.confirmationCode).toBe(confirmationCode)
      expect(sendConfirmationCodeToEmailSpy.email).toBe(email)
    })

    test('Should throw if SendConfirmationCodeToEmail throws', async() => {
      const { sut, sendConfirmationCodeToEmailSpy } = makeSut()
      jest.spyOn(sendConfirmationCodeToEmailSpy, 'send').mockRejectedValueOnce(new Error())

      const promise = sut.send(email, accountId)

      await expect(promise).rejects.toThrow()
    })
  })
})
