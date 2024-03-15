import { Collection, ObjectId } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { AddConfirmationCodeMongoRepository } from '@/infra/db/mongodb/commands'

let codeCollection: Collection

const makeSut = (): AddConfirmationCodeMongoRepository => {
  return new AddConfirmationCodeMongoRepository()
}

const confirmationCode = faker.string.alphanumeric(6)
const accountId = faker.string.uuid()

describe('AddConfirmationCodeMongoRepository', () => {
  beforeAll(async() => {
    MockDate.set(new Date())
    await connectToDatabase()
  })

  afterAll(async() => {
    MockDate.reset()
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    codeCollection = await getCollection('codes')
    await clearCollection(codeCollection)
  })

  test('Should add a confirmation code on success', async() => {
    const sut = makeSut()
    const insertedId = await sut.add(confirmationCode, accountId)
    const count = await codeCollection.countDocuments()
    const code = await codeCollection.findOne({ _id: new ObjectId(insertedId) })
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10)

    expect(count).toBe(1)
    expect(code?.confirmationCode).toBe(confirmationCode)
    expect(code?.accountId).toBe(accountId)
    expect(code?.expirationDate).toEqual(expirationDate)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'insertOne').mockRejectedValueOnce(new Error())
    const sut = makeSut()

    const promise = sut.add(confirmationCode, accountId)

    await expect(promise).rejects.toThrow()
  })
})
