import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { VerifyConfirmationCodeMongoRepository } from '@/infra/db/mongodb/queries'

let codeCollection: Collection

const makeSut = (): VerifyConfirmationCodeMongoRepository => {
  return new VerifyConfirmationCodeMongoRepository()
}

describe('VerifyConfirmationCodeMongoRepository', () => {
  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    codeCollection = await getCollection('codes')
    await clearCollection(codeCollection)
  })

  test('Should return true if confirmation code is valid, account id is correct and it is not expired', async() => {
    const sut = makeSut()
    const accountId = faker.database.mongodbObjectId()
    const confirmationCode = faker.string.alphanumeric(6)
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10)
    await codeCollection.insertOne({
      accountId,
      confirmationCode,
      expirationDate
    })

    const confirmationCodeIsValid = await sut.verify(accountId, confirmationCode)

    expect(confirmationCodeIsValid).toBe(true)
  })

  test('Should return false if account id is invalid', async() => {
    const sut = makeSut()
    const accountId = faker.database.mongodbObjectId()
    const confirmationCode = faker.string.alphanumeric(6)
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10)
    await codeCollection.insertOne({
      accountId,
      confirmationCode,
      expirationDate
    })

    const confirmationCodeIsValid = await sut.verify(faker.database.mongodbObjectId(), confirmationCode)

    expect(confirmationCodeIsValid).toBe(false)
  })

  test('Should return false if confirmation code is invalid', async() => {
    const sut = makeSut()
    const accountId = faker.database.mongodbObjectId()
    const confirmationCode = faker.string.alphanumeric(6)
    const expirationDate = new Date()
    expirationDate.setMinutes(expirationDate.getMinutes() + 10)
    await codeCollection.insertOne({
      accountId,
      confirmationCode,
      expirationDate
    })

    const confirmationCodeIsValid = await sut.verify(accountId, faker.string.alphanumeric(6))

    expect(confirmationCodeIsValid).toBe(false)
  })
})
