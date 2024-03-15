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

  test('Should return true if validator returns true', () => {
    const sut = makeSut()

    const isValid = sut.isValid(faker.database.mongodbObjectId())

    expect(isValid).toBe(true)
  })

  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isMongoId').mockReturnValueOnce(false)

    const isValid = sut.isValid(faker.database.mongodbObjectId())

    expect(isValid).toBe(false)
  })

  test('Should throw if validator throws', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isMongoId').mockImplementationOnce(() => { throw new Error() })

    expect(() => {
      sut.isValid(faker.database.mongodbObjectId())
    }).toThrow()
  })
})
