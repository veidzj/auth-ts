import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { ChangeEmailMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): ChangeEmailMongoRepository => {
  return new ChangeEmailMongoRepository()
}

describe('ChangeEmailMongoRepository', () => {
  beforeAll(async() => {
    MockDate.set(new Date())
    await connectToDatabase()
  })

  afterAll(async() => {
    MockDate.reset()
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    accountCollection = await getCollection('accounts')
    await clearCollection(accountCollection)
  })

  test('Should change an account email on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    const insertResult = await accountCollection.insertOne({ ...addAccountRepositoryInput })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount.email).toBe(addAccountRepositoryInput.email)
      const currentEmail: string = fakeAccount.email
      const newEmail: string = faker.internet.email()
      await sut.change(currentEmail, newEmail)
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.email).toBe(newEmail)
      expect(account?.updatedAt).toEqual(new Date())
    }
  })

  test('Should not change an account email if there is no account with current email', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    const insertResult = await accountCollection.insertOne({ ...addAccountRepositoryInput })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount.email).toBe(addAccountRepositoryInput.email)
      const newEmail: string = faker.internet.email()
      await sut.change(faker.internet.email(), newEmail)
      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.email).toBe(fakeAccount.email)
      expect(account?.updatedAt).toBeFalsy()
    }
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.change(faker.internet.email(), faker.internet.email())
    await expect(promise).rejects.toThrow()
  })
})
