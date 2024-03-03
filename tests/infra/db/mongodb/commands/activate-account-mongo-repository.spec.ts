import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { ActivateAccountMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): ActivateAccountMongoRepository => {
  return new ActivateAccountMongoRepository()
}

describe('ActivateAccountMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.activate(faker.string.uuid())
    await expect(promise).rejects.toThrow()
  })

  test('Should activate an account on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne({ ...mockAddAccountRepositoryInput(), isActive: false })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    expect(fakeAccount?.isActive).toBe(false)
    const accountId: string = fakeAccount?.id.toString()
    const result = await sut.activate(accountId)
    const account = await accountCollection.findOne({ id: fakeAccount?.id })
    expect(account).toBeTruthy()
    expect(account?.isActive).toBe(true)
    expect(result).toBe(true)
  })

  test('Should not activate an account if is already activated', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne({ ...mockAddAccountRepositoryInput(), isActive: true })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    expect(fakeAccount?.isActive).toBe(true)
    const accountId: string = fakeAccount?.id.toString()
    const result = await sut.activate(accountId)
    const account = await accountCollection.findOne({ id: fakeAccount?.id })
    expect(account).toBeTruthy()
    expect(account?.isActive).toBe(true)
    expect(result).toBe(false)
  })
})
