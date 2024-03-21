import { Collection } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { mockAddAccountRepositoryInput } from '@/tests/application/mocks/inputs'
import { ChangeProfileImageMongoRepository } from '@/infra/db/mongodb/commands'

let accountCollection: Collection

const makeSut = (): ChangeProfileImageMongoRepository => {
  return new ChangeProfileImageMongoRepository()
}

const newProfileImage: string = faker.internet.url()

describe('ChangeProfileImageMongoRepository', () => {
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

  test('Should change an account profile image on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    const insertResult = await accountCollection.insertOne(addAccountRepositoryInput)
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount?.profileImage).toBe(addAccountRepositoryInput.profileImage)
      const accountId: string = fakeAccount._id.toString()

      await sut.change(accountId, newProfileImage)

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.profileImage).toBe(newProfileImage)
      expect(account?.updatedAt).toEqual(new Date())
    }
  })

  test('Should add an account profile image if it has not been defined yet', async() => {
    const sut = makeSut()
    const { profileImage, ...accountDataWithoutProfileImage } = mockAddAccountRepositoryInput()
    const insertResult = await accountCollection.insertOne(accountDataWithoutProfileImage)
    const fakeAccount = await accountCollection.findOne({ _id: insertResult.insertedId })
    if (fakeAccount) {
      expect(fakeAccount?.profileImage).toBeUndefined()
      const accountId: string = fakeAccount._id.toString()

      await sut.change(accountId, newProfileImage)

      const account = await accountCollection.findOne({ _id: fakeAccount._id })
      expect(account?.profileImage).toBe(newProfileImage)
      expect(account?.updatedAt).toEqual(new Date())
    }
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.change(faker.database.mongodbObjectId(), newProfileImage)

    await expect(promise).rejects.toThrow()
  })
})
