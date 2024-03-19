import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { ChangePasswordMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): ChangePasswordMongoRepository => {
  return new ChangePasswordMongoRepository()
}

const newPassword: string = faker.internet.password()

describe('ChangePasswordMongoRepository', () => {
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

  test('Should change an account password on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAddAccountRepositoryInput())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      const accountId: string = fakeAccount._id.toString()

      await sut.change(accountId, newPassword)

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.password).toBe(newPassword)
      expect(account?.updatedAt).toEqual(new Date())
    }
  })

  test('Should not change an account password if there is no account with the given email', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAddAccountRepositoryInput())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      await sut.change(faker.database.mongodbObjectId(), newPassword)

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.password).toBe(fakeAccount.password)
      expect(account?.updatedAt).toBeFalsy()
    }
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.change(faker.database.mongodbObjectId(), faker.internet.email())

    await expect(promise).rejects.toThrow()
  })
})
