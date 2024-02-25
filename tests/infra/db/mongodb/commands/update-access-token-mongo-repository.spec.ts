import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { UpdateAccessTokenMongoRepository } from '@/infra/db/mongodb/commands'
import { type UpdateAccessTokenRepository } from '@/application/protocols/commands'

let accountCollection: Collection

const makeSut = (): UpdateAccessTokenMongoRepository => {
  return new UpdateAccessTokenMongoRepository()
}

const mockUpdateAccessTokenInput = (): UpdateAccessTokenRepository.Input => ({
  id: faker.string.uuid(),
  accessToken: faker.string.uuid()
})

describe('UpdateAccessTokenMongoRepository', () => {
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

  test('Should update accessToken on success', async() => {
    const sut = makeSut()
    const insertResult = await accountCollection.insertOne(mockAddAccountRepositoryInput())
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    expect(fakeAccount?.accessToken).toBeFalsy()
    const accessToken = faker.string.uuid()
    await sut.update({ id: fakeAccount?.id, accessToken })
    const account = await accountCollection.findOne({ id: fakeAccount?.id })
    expect(account).toBeTruthy()
    expect(account?.accessToken).toBe(accessToken)
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.update(mockUpdateAccessTokenInput())
    await expect(promise).rejects.toThrow()
  })
})
