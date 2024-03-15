import { Collection, ObjectId } from 'mongodb'

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

    const insertedId = await sut.add(addAccountRepositoryInput)

    const count = await accountCollection.countDocuments()
    const account = await accountCollection.findOne({ _id: new ObjectId(insertedId) })
    expect(count).toBe(1)
    expect(account).toEqual(addAccountRepositoryInput)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'insertOne').mockRejectedValueOnce(new Error())
    const sut = makeSut()

    const promise = sut.add(mockAddAccountRepositoryInput())

    await expect(promise).rejects.toThrow()
  })
})
