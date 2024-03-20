import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { DbChangeProfileImage } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DbChangeProfileImage
  checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
  const sut = new DbChangeProfileImage(checkAccountByIdRepositorySpy)
  return {
    sut,
    checkAccountByIdRepositorySpy
  }
}

const accountId: string = faker.string.uuid()
const newProfileImage: string = faker.internet.url()

describe('DbChangeProfileImage', () => {
  describe('CheckAccountByIdRepository', () => {
    test('Should call CheckAccountByIdRepository with correct id', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()

      await sut.change(accountId, newProfileImage)

      expect(checkAccountByIdRepositorySpy.id).toBe(accountId)
    })

    test('Should throw AccountNotFoundError if CheckAccountByIdRepository returns false', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      checkAccountByIdRepositorySpy.output = false

      const promise = sut.change(accountId, newProfileImage)

      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if CheckAccountByIdRepository throws', async() => {
      const { sut, checkAccountByIdRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByIdRepositorySpy, 'check').mockRejectedValueOnce(new Error())

      const promise = sut.change(accountId, newProfileImage)

      await expect(promise).rejects.toThrow()
    })
  })
})
