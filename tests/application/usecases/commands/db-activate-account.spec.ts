import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { DbActivateAccount } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DbActivateAccount
  checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
  const sut = new DbActivateAccount(checkAccountByIdRepositorySpy)
  return {
    sut,
    checkAccountByIdRepositorySpy
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
  })
})
