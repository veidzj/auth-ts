import { type Collection } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { ChangePasswordMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): ChangePasswordMongoRepository => {
  return new ChangePasswordMongoRepository()
}

const newPassword: string = faker.internet.password()

describe('ChangePasswordMongoRepository', () => {
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

  test('Should change an account password on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    const insertResult = await accountCollection.insertOne({ ...addAccountRepositoryInput })
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      const email: string = fakeAccount.email

      await sut.change(email, newPassword)

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.password).toBe(newPassword)
      expect(account?.updatedAt).toEqual(new Date())
    }
  })
})
