import { Collection } from 'mongodb'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { GetAccountIdByTokenMongoRepository } from '@/infra/db/mongodb/queries'
import { faker } from '@faker-js/faker'

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

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'findOne').mockRejectedValueOnce(new Error())
    const promise = sut.get({
      accessToken: faker.word.words(),
      role: faker.word.words()
    })
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if there is no account with the given accessToken', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = { ...mockAddAccountRepositoryInput(), accessToken: faker.word.words() }
    await accountCollection.insertOne(addAccountRepositoryInput)
    const account = await sut.get({
      accessToken: faker.word.words(),
      role: addAccountRepositoryInput.roles[0]
    })
    expect(account).toBeNull()
  })

  test('Should return null if there is no account with the given role', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = { ...mockAddAccountRepositoryInput(), accessToken: faker.word.words() }
    await accountCollection.insertOne(addAccountRepositoryInput)
    const account = await sut.get({
      accessToken: addAccountRepositoryInput.accessToken,
      role: faker.word.words()
    })
    expect(account).toBeNull()
  })

  test('Should return an accountId on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = { ...mockAddAccountRepositoryInput(), accessToken: faker.word.words() }
    await accountCollection.insertOne(addAccountRepositoryInput)
    const account = await sut.get({
      accessToken: addAccountRepositoryInput.accessToken,
      role: addAccountRepositoryInput.roles[0]
    })
    expect(account?.accountId).toBe(addAccountRepositoryInput.id)
  })
})
