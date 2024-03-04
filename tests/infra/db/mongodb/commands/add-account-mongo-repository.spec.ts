import { Collection } from 'mongodb'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

describe('AddAccountMongoRepository', () => {
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

  test('Should add an account on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await sut.add(addAccountRepositoryInput)
    const count = await accountCollection.countDocuments()
    expect(count).toBe(1)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'insertOne').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddAccountRepositoryInput())
    await expect(promise).rejects.toThrow()
  })
})
