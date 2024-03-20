import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { CheckAccountByIdMongoRepository } from '@/infra/db/mongodb/queries'

let accountCollection: Collection

const makeSut = (): CheckAccountByIdMongoRepository => {
  return new CheckAccountByIdMongoRepository()
}

describe('CheckAccountByIdMongoRepository', () => {
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

  test('Should return false if there is no account with the given id', async() => {
    const sut = makeSut()

    const accountExists = await sut.check(faker.database.mongodbObjectId())

    expect(accountExists).toBe(false)
  })

  test('Should return true if account exists', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    const insertResult = await accountCollection.insertOne(addAccountRepositoryInput)

    const accountExists = await sut.check(insertResult.insertedId.toString())

    expect(accountExists).toBe(true)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'countDocuments').mockRejectedValueOnce(new Error())

    const promise = sut.check(faker.database.mongodbObjectId())

    await expect(promise).rejects.toThrow()
  })
})
