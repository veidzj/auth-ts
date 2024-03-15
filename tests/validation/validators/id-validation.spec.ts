import { faker } from '@faker-js/faker'

import { IdValidatorSpy } from '@/tests/validation/mocks'
import { IdValidation } from '@/validation/validators'

interface Sut {
  sut: IdValidation
  idValidatorSpy: IdValidatorSpy
}

const makeSut = (): Sut => {
  const idValidatorSpy = new IdValidatorSpy()
  const sut = new IdValidation(idValidatorSpy, fieldName)
  return {
    sut,
    idValidatorSpy
  }
}

const fieldName: string = faker.word.words()

describe('IdValidation', () => {
  test('Should call IdValidator with correct id', () => {
    const { sut, idValidatorSpy } = makeSut()
    const id = faker.string.uuid()
    sut.validate({ [fieldName]: id })
    expect(idValidatorSpy.id).toBe(id)
  })
})
