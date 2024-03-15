import validator from 'validator'
import { faker } from '@faker-js/faker'

import { MongoIdValidatorAdapter } from '@/infra/validators'

jest.mock('validator', () => ({
  isMongoId(): boolean {
    return true
  }
}))

const makeSut = (): MongoIdValidatorAdapter => {
  return new MongoIdValidatorAdapter()
}

describe('MongoIdValidatorAdapter', () => {
  test('Should call validator with correct id', () => {
    const sut = makeSut()
    const isMongoIdSpy = jest.spyOn(validator, 'isMongoId')
    const mongoId = faker.database.mongodbObjectId()

    sut.isValid(mongoId)

    expect(isMongoIdSpy).toHaveBeenCalledWith(mongoId)
  })
})
