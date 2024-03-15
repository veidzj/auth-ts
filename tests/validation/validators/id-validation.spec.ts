import { faker } from '@faker-js/faker'

import { IdValidatorSpy } from '@/tests/validation/mocks'
import { IdValidation } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

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

  test('Should throw ValidationError if IdValidator returns false', () => {
    const { sut, idValidatorSpy } = makeSut()
    idValidatorSpy.isIdValid = false
    expect(() => {
      sut.validate({ [fieldName]: faker.string.uuid() })
    }).toThrow(new ValidationError(`${fieldName} must be a valid id`))
  })

  test('Should throw if IdValidator throws', () => {
    const { sut, idValidatorSpy } = makeSut()
    jest.spyOn(idValidatorSpy, 'isValid').mockImplementationOnce(() => { throw new Error() })
    expect(() => {
      sut.validate({ [fieldName]: faker.string.uuid() })
    }).toThrow()
  })
})
