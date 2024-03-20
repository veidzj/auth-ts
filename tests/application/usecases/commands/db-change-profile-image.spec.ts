import { faker } from '@faker-js/faker'

import { CheckAccountByIdRepositorySpy } from '@/tests/application/mocks/queries'
import { DbChangeProfileImage } from '@/application/usecases/commands'

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
  })
})
