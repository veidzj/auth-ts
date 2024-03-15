import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { ActivateAccountMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): ActivateAccountMongoRepository => {
  return new ActivateAccountMongoRepository()
}

describe('ActivateAccountMongoRepository', () => {
  beforeAll(async() => {
    MockDate.set(new Date())
    await connectToDatabase()
  })

  afterAll(async() => {
    MockDate.reset()
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should activate an account on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne({ ...mockAddAccountRepositoryInput(), isActive: false })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount.isActive).toBe(false)
      expect(fakeAccount.updatedAt).toBeFalsy()

      const result = await sut.activate(fakeAccount._id.toHexString())

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(result).toBe(true)
      expect(account?.isActive).toBe(true)
      expect(account?.updatedAt).toEqual(new Date())
    }
  })

  test('Should not activate an account if is already activated', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne({ ...mockAddAccountRepositoryInput(), isActive: true })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount.isActive).toBe(true)
      expect(fakeAccount.updatedAt).toBeFalsy()

      const result = await sut.activate(fakeAccount._id.toString())

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(result).toBe(false)
      expect(account?.isActive).toBe(true)
      expect(account?.updatedAt).toBeFalsy()
    }
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.activate(faker.string.uuid())

    await expect(promise).rejects.toThrow()
  })
})
