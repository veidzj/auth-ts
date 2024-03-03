import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { ActivateAccountRepositorySpy } from '@/tests/application/mocks/commands'
import { DbActivateAccount } from '@/application/usecases/commands'
import { AccountNotFoundError, AccountAlreadyActivatedError } from '@/domain/errors'

interface Sut {
  sut: DbActivateAccount
  checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
  activateAccountRepositorySpy: ActivateAccountRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
  const activateAccountRepositorySpy = new ActivateAccountRepositorySpy()
  const sut = new DbActivateAccount(checkAccountByIdRepositorySpy, activateAccountRepositorySpy)
  return {
    sut,
    checkAccountByIdRepositorySpy,
    activateAccountRepositorySpy
  }
}

const accountId: string = faker.string.uuid()

describe('DbActivateAccount', () => {
  describe('CheckAccountByIdRepository', () => {
    test('Should call CheckAccountByIdRepository with correct id', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      await sut.activate(accountId)
      expect(checkAccountByIdRepositorySpy.id).toBe(accountId)
    })

    test('Should throw AccountNotFoundError if CheckAccountByIdRepository returns false', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      checkAccountByIdRepositorySpy.output = false
      const promise = sut.activate(accountId)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByIdRepository throws', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByIdRepositorySpy, 'check').mockRejectedValueOnce(new Error())
      const promise = sut.activate(accountId)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('ActivateAccountRepository', () => {
    test('Should call ActivateAccountRepository with correct value', async() => {
      const { sut, activateAccountRepositorySpy } = makeSut()
      await sut.activate(accountId)
      expect(activateAccountRepositorySpy.accountId).toBe(accountId)
    })

    test('Should throw AccountAlreadyDeactivated if ActivateAccountRepository returns false', async() => {
      const { sut, activateAccountRepositorySpy } = makeSut()
      activateAccountRepositorySpy.output = false
      const promise = sut.activate(accountId)
      await expect(promise).rejects.toThrow(new AccountAlreadyActivatedError())
    })

    test('Should throw if ActivateAccountRepository throws', async() => {
      const { sut, activateAccountRepositorySpy } = makeSut()
      jest.spyOn(activateAccountRepositorySpy, 'activate').mockRejectedValueOnce(new Error())
      const promise = sut.activate(accountId)
      await expect(promise).rejects.toThrow()
    })
  })
})
