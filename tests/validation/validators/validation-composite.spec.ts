import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validators'
import { faker } from '@faker-js/faker'

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
  test('Should return an array containing all errors', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].errors = [faker.word.words(), faker.word.words()]
    validationSpies[1].errors = [faker.word.words(), faker.word.words()]
    const errors = sut.validate({ username: faker.word.words() })
    expect(errors).toEqual(validationSpies[0].errors.concat(validationSpies[1].errors))
  })
})
