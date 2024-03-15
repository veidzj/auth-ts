import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { UpdateAccessTokenMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): UpdateAccessTokenMongoRepository => {
  return new UpdateAccessTokenMongoRepository()
}

const accessToken: string = faker.string.uuid()

describe('UpdateAccessTokenMongoRepository', () => {
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

  test('Should update accessToken on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAddAccountRepositoryInput())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount.accessToken).toBeFalsy()
      expect(fakeAccount.updatedAt).toBeFalsy()

      await sut.update(fakeAccount._id.toString(), accessToken)

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.accessToken).toBe(accessToken)
      expect(account?.updatedAt).toEqual(new Date())
    }
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.update(faker.string.uuid(), faker.string.uuid())

    await expect(promise).rejects.toThrow()
  })
})
