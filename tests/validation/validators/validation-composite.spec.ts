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
  test('Should throw ValidationError if any validation throws', () => {
    const { sut, validationSpies } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(validationSpies[0], 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
    expect(() => {
      sut.validate({ username: faker.word.words() })
    }).toThrow(new ValidationError(errorMessage))
  })

  test('Should not throw if all validations succeeds', () => {
    const { sut } = makeSut()
    expect(() => {
      sut.validate({ username: faker.word.words() })
    }).not.toThrow()
  })
})
