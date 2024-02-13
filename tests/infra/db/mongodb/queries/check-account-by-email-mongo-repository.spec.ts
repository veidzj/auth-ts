import { Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/queries'
import { type AddAccountRepository } from '@/application/protocols/commands'

let accountCollection: Collection

const makeSut = (): CheckAccountByEmailMongoRepository => {
  return new CheckAccountByEmailMongoRepository()
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

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'countDocuments').mockRejectedValueOnce(new Error())
    const promise = sut.check(faker.internet.email())
    await expect(promise).rejects.toThrow()
  })

  test('Should return false if email does not exists', async() => {
    const sut = makeSut()
    const accountExists = await sut.check(faker.internet.email())
    expect(accountExists).toBe(false)
  })

  test('Should return true if email exists', async() => {
    const sut = makeSut()
    const addAccountRepositoryInput = mockAddAccountRepositoryInput()
    await accountCollection.insertOne(addAccountRepositoryInput)
    const accountExists = await sut.check(addAccountRepositoryInput.email)
    expect(accountExists).toBe(true)
  })
})
