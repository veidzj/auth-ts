import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'

let accountCollection: Collection

const makeSut = (): CheckAccountByEmailMongoRepository => {
  return new CheckAccountByEmailMongoRepository()
}

describe('CheckAccountByEmailMongoRepository', () => {
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

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'countDocuments').mockRejectedValueOnce(new Error())
    const promise = sut.check(faker.internet.email())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if email does not exists', async() => {
    const sut = makeSut()
    const accountExists = await sut.check(faker.internet.email())
    expect(accountExists).toBe(false)
  })
})
