import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { GetAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'

let accountCollection: Collection

const makeSut = (): GetAccountByEmailMongoRepository => {
  return new GetAccountByEmailMongoRepository()
}

describe('GetAccountByEmailMongoRepository', () => {
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

  test('Should return an account on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await accountCollection.insertOne(addAccountRepositoryInput)
    const account = await sut.get(addAccountRepositoryInput.email)
    expect(account?.id).toBe(addAccountRepositoryInput.id)
    expect(account?.password).toBe(addAccountRepositoryInput.password)
  })

  test('Should return null if there is no account with the given email', async() => {
    const sut = makeSut()
    const account = await sut.get(faker.internet.email())
    expect(account).toBeNull()
  })
})
