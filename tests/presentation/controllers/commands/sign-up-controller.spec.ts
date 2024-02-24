import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { AddAccountSpy } from '@/tests/domain/mocks/commands'
import { AuthenticationSpy } from '@/tests/domain/mocks/queries'
import { SignUpController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { AccountAlreadyExists } from '@/domain/errors'

interface Sut {
  sut: SignUpController
  validationSpy: ValidationSpy
  addAccountSpy: AddAccountSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const addAccountSpy = new AddAccountSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new SignUpController(validationSpy, addAccountSpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    addAccountSpy,
    authenticationSpy
  }
}

const mockRequest = (): SignUpController.Request => ({
  username: faker.internet.userName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.anytime().toISOString(),
  profileImage: faker.internet.url()
})

describe('SignUpController', () => {
  describe('Validation', () => {
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

    test('Should return serverError if Validation throws', async() => {
      const { sut, validationSpy } = makeSut()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.serverError())
    })
  })

  describe('AddAccount', () => {
    test('Should call AddAccount with correct values', async() => {
      const { sut, addAccountSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(addAccountSpy.input).toEqual(request)
    })

    test('Should return conflict if AddAccount throws AccountAlreadyExists', async() => {
      const { sut, addAccountSpy } = makeSut()
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new AccountAlreadyExists() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.conflict(new AccountAlreadyExists()))
    })

    test('Should return serverError if AddAccount throws an unexpected error', async() => {
      const { sut, addAccountSpy } = makeSut()
      jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(() => { throw new Error() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.serverError())
    })
  })

  describe('Authentication', () => {
    test('Should call Authentication with correct values', async() => {
      const { sut, authenticationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(authenticationSpy.input).toEqual({ email: request.email, password: request.password })
    })

    test('Should return serverError if Authentication throws an unexpected error', async() => {
      const { sut, authenticationSpy } = makeSut()
      jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(() => { throw new Error() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.serverError())
    })

    test('Should return accessToken on success', async() => {
      const { sut, authenticationSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.ok(authenticationSpy.output))
    })
  })
})
