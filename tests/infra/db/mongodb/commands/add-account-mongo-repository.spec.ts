import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/commands'
import { type AddAccountRepository } from '@/application/protocols/commands'

let accountCollection: Collection

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

const mockAddAccountRepositoryInput = (): AddAccountRepository.Input => ({
  id: faker.string.uuid(),
  username: faker.internet.userName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.anytime(),
  isActive: faker.datatype.boolean(),
  profileImage: faker.internet.url(),
  createdAt: faker.date.anytime()
})

describe('AddAccountMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'insertOne').mockRejectedValueOnce(new Error())
    const promise = sut.add(mockAddAccountRepositoryInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should add an account on success', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await sut.add(addAccountRepositoryInput)
    const count = await accountCollection.countDocuments()
    const account = await accountCollection.findOne({ id: addAccountRepositoryInput.id })
    expect(count).toBe(1)
    expect(account?.id).toBe(addAccountRepositoryInput.id)
    expect(account?.username).toBe(addAccountRepositoryInput.username)
    expect(account?.fullName).toBe(addAccountRepositoryInput.fullName)
    expect(account?.email).toBe(addAccountRepositoryInput.email)
    expect(account?.password).toBe(addAccountRepositoryInput.password)
    expect(account?.birthdate).toEqual(addAccountRepositoryInput.birthdate)
    expect(account?.isActive).toBe(addAccountRepositoryInput.isActive)
    expect(account?.profileImage).toBe(addAccountRepositoryInput.profileImage)
    expect(account?.createdAt).toEqual(addAccountRepositoryInput.createdAt)
  })
})
