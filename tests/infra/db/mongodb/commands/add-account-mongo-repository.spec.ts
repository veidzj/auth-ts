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
})
