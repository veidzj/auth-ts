import { Collection, ObjectId } from 'mongodb'
import MockDate from 'mockdate'
import { faker } from '@faker-js/faker'

import { connectToDatabase, disconnectFromDatabase, clearCollection, getCollection } from '@/tests/infra/db/mongodb'
import { LogErrorMongoRepository } from '@/infra/db/mongodb/commands'

let errorCollection: Collection

const makeSut = (): LogErrorMongoRepository => {
  return new LogErrorMongoRepository()
}

describe('LogErrorMongoRepository', () => {
  beforeAll(async() => {
    MockDate.set(new Date())
    await connectToDatabase()
  })

  afterAll(async() => {
    MockDate.reset()
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    errorCollection = await getCollection('errors')
    await clearCollection(errorCollection)
  })

  test('Should add an error log on success', async() => {
    const sut = makeSut()
    const stack = faker.word.words()

    const insertedId = await sut.log(stack)

    const count = await errorCollection.countDocuments()
    const error = await errorCollection.findOne({ _id: new ObjectId(insertedId) })
    expect(count).toBe(1)
    expect(error?.stack).toBe(stack)
    expect(error?.date).toEqual(new Date())
  })

  test('Should throw if mongo throws', async() => {
    const sut = makeSut()
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(() => { throw new Error() })

    const promise = sut.log(faker.word.words())

    await expect(promise).rejects.toThrow()
  })
})
