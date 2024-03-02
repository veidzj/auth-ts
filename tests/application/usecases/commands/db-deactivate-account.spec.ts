import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { DeactivateAccountRepositorySpy } from '@/tests/application/mocks/commands'
import { DbDeactivateAccount } from '@/application/usecases/commands'
import { type DeactivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyDeactivatedError } from '@/domain/errors'

interface Sut {
  sut: DbDeactivateAccount
  deactivateAccountRepositorySpy: DeactivateAccountRepositorySpy
  checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
  const deactivateAccountRepositorySpy = new DeactivateAccountRepositorySpy()
  const sut = new DbDeactivateAccount(checkAccountByIdRepositorySpy, deactivateAccountRepositorySpy)
  return {
    sut,
    checkAccountByIdRepositorySpy,
    deactivateAccountRepositorySpy
  }
}

const mockInput = (): DeactivateAccount.Input => ({
  accountId: faker.string.uuid()
})

describe('DbDeactivateAccount', () => {
  describe('CheckAccountByIdRepository', () => {
    test('Should call CheckAccountByIdRepository with correct id', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      const input = mockInput()
      await sut.deactivate(input)
      expect(checkAccountByIdRepositorySpy.id).toEqual(input.accountId)
    })

    test('Should throw AccountNotFoundError if CheckAccountByIdRepository returns false', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      checkAccountByIdRepositorySpy.output = false
      const promise = sut.deactivate(mockInput())
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByIdRepository throws', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByIdRepositorySpy, 'check').mockRejectedValueOnce(new Error())
      const promise = sut.deactivate(mockInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('DeactivateAccountRepository', () => {
    test('Should call DeactivateAccountRepository with correct value', async() => {
      const { sut, deactivateAccountRepositorySpy } = makeSut()
      const input = mockInput()
      await sut.deactivate(input)
      expect(deactivateAccountRepositorySpy.input).toEqual(input)
    })

    test('Should throw AccountAlreadyDeactivated if DeactivateAccountRepository returns false', async() => {
      const { sut, deactivateAccountRepositorySpy } = makeSut()
      deactivateAccountRepositorySpy.output = false
      const promise = sut.deactivate(mockInput())
      await expect(promise).rejects.toThrow(new AccountAlreadyDeactivatedError())
    })

    test('Should throw if DeactivateAccountRepository throws', async() => {
      const { sut, deactivateAccountRepositorySpy } = makeSut()
      jest.spyOn(deactivateAccountRepositorySpy, 'deactivate').mockRejectedValueOnce(new Error())
      const promise = sut.deactivate(mockInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
