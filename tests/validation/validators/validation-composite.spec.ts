import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): Sut => {
  const validationSpies = [new ValidationSpy(), new ValidationSpy()]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new ValidationError(faker.word.words())
    const error = sut.validate({ username: faker.word.words() })
    expect(error).toBe(validationSpies[0].error)
  })

  test('Should return only 1 error if more than 1 validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new ValidationError(faker.word.words())
    validationSpies[1].error = new ValidationError(faker.word.words())
    const error = sut.validate({ username: faker.word.words() })
    expect(error).toBe(validationSpies[0].error)
  })

  test('Should return null if all validations succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ username: faker.word.words() })
    expect(error).toBeNull()
  })
})
