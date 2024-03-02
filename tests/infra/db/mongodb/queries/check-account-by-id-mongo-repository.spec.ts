import { type Collection } from 'mongodb'

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

  test('Should return true if account exists', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await accountCollection.insertOne(addAccountRepositoryInput)
    const accountExists = await sut.check(addAccountRepositoryInput.id)
    expect(accountExists).toBe(true)
  })
})
