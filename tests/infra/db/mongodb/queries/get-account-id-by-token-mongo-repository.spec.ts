import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { GetAccountIdByTokenMongoRepository } from '@/infra/db/mongodb/queries'

let accountCollection: Collection

const makeSut = (): GetAccountIdByTokenMongoRepository => {
  return new GetAccountIdByTokenMongoRepository()
}

describe('GetAccountIdByTokenMongoRepository', () => {
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

  test('Should return null if there is no account with the given accessToken', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = { ...mockAddAccountRepositoryInput(), accessToken: faker.word.words() }
    await accountCollection.insertOne(addAccountRepositoryInput)

    const accountId = await sut.get(faker.word.words(), addAccountRepositoryInput.roles[0])

    expect(accountId).toBeNull()
  })

  test('Should return null if there is no account with the given role', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = { ...mockAddAccountRepositoryInput(), accessToken: faker.word.words() }
    await accountCollection.insertOne(addAccountRepositoryInput)

    const accountId = await sut.get(addAccountRepositoryInput.accessToken, faker.word.words())

    expect(accountId).toBeNull()
  })

  test('Should return an accountId on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = { ...mockAddAccountRepositoryInput(), accessToken: faker.word.words() }
    const insertResult = await accountCollection.insertOne(addAccountRepositoryInput)

    const accountId = await sut.get(addAccountRepositoryInput.accessToken, addAccountRepositoryInput.roles[0])

    expect(accountId).toBe(insertResult.insertedId.toString())
  })
})
