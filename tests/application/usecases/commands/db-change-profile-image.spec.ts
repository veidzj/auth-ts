import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { ChangeProfileImageRepositorySpy } from '@/tests/application/mocks/commands'
import { DbChangeProfileImage } from '@/application/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DbChangeProfileImage
  checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
  changeProfileImageRepositorySpy: ChangeProfileImageRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
  const changeProfileImageRepositorySpy = new ChangeProfileImageRepositorySpy()
  const sut = new DbChangeProfileImage(checkAccountByIdRepositorySpy, changeProfileImageRepositorySpy)
  return {
    sut,
    checkAccountByIdRepositorySpy,
    changeProfileImageRepositorySpy
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

  describe('ChangeProfileImageRepository', () => {
    test('Should call ChangeProfileImageRepository with correct values', async() => {
      const { sut, changeProfileImageRepositorySpy } = makeSut()

      await sut.change(accountId, newProfileImage)

      expect(changeProfileImageRepositorySpy.accountId).toBe(accountId)
      expect(changeProfileImageRepositorySpy.newProfileImage).toBe(newProfileImage)
    })
  })
})
