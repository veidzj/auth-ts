import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { DbChangeProfileImage } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

const accountId: string = faker.string.uuid()
const newProfileImage: string = faker.internet.url()

describe('DbChangeProfileImage', () => {
  describe('CheckAccountByIdRepository', () => {
    test('Should call CheckAccountByIdRepository with correct id', async() => {
      const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
      const sut = new DbChangeProfileImage(checkAccountByIdRepositorySpy)

      await sut.change(accountId, newProfileImage)

      expect(checkAccountByIdRepositorySpy.id).toBe(accountId)
    })

    test('Should throw AccountNotFoundError if CheckAccountByIdRepository returns false', async() => {
      const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
      checkAccountByIdRepositorySpy.output = false
      const sut = new DbChangeProfileImage(checkAccountByIdRepositorySpy)

      const promise = sut.change(accountId, newProfileImage)

      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByIdRepository throws', async() => {
      const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
      jest.spyOn(checkAccountByIdRepositorySpy, 'check').mockRejectedValueOnce(new Error())
      const sut = new DbChangeProfileImage(checkAccountByIdRepositorySpy)

      const promise = sut.change(accountId, newProfileImage)

      await expect(promise).rejects.toThrow()
    })
  })
})
