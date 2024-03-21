import { type Collection } from 'mongodb'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
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

  test('Should return false if there is no account with the given email', async() => {
    const sut = makeSut()

    const accountExists = await sut.check(mockAddAccountRepositoryInput().email)

    expect(accountExists).toBe(false)
  })

  test('Should return true if account exists', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await accountCollection.insertOne(addAccountRepositoryInput)

    const accountExists = await sut.check(addAccountRepositoryInput.email)

    expect(accountExists).toBe(true)
  })
})
