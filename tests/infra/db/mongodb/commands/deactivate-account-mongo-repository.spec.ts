import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { DeactivateAccountMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): DeactivateAccountMongoRepository => {
  return new DeactivateAccountMongoRepository()
}

describe('DeactivateAccountMongoRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should deactivate an account on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne({ ...mockAddAccountRepositoryInput(), isActive: true })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount.isActive).toBe(true)
      const result = await sut.deactivate(fakeAccount._id.toString())
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account?.isActive).toBe(false)
      expect(result).toBe(true)
    }
  })

  test('Should not deactivate an account if is already deactivated', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne({ ...mockAddAccountRepositoryInput(), isActive: false })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount.isActive).toBe(false)
      const result = await sut.deactivate(fakeAccount._id.toString())
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account).toBeTruthy()
      expect(account?.isActive).toBe(false)
      expect(result).toBe(false)
    }
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.deactivate(faker.string.uuid())
    await expect(promise).rejects.toThrow()
  })
})
