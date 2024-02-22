import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { SignInController } from '@/presentation/controllers/queries'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: SignInController
  validationSpy: ValidationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const sut = new SignInController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

const mockRequest = (): SignInController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('SignInController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return badRequest if Validation throws ValidationError', async() => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
  })
})
