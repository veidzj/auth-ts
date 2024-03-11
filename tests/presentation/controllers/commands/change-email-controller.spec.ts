import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { ChangeEmailSpy } from '@/tests/domain/mocks/commands'
import { ChangeEmailController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { AccountNotFoundError, AccountAlreadyExistsError } from '@/domain/errors'

interface Sut {
  sut: ChangeEmailController
  validationSpy: ValidationSpy
  changeEmailSpy: ChangeEmailSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const changeEmailSpy = new ChangeEmailSpy()
  const sut = new ChangeEmailController(validationSpy, changeEmailSpy)
  return {
    sut,
    validationSpy,
    changeEmailSpy
  }
}

const mockRequest = (): ChangeEmailController.Request => ({
  currentEmail: faker.internet.email(),
  newEmail: faker.internet.email()
})

describe('ChangeEmailController', () => {
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
  })

  describe('ChangeEmail', () => {
    test('Should call ChangeEmail with correct values', async() => {
      const { sut, changeEmailSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(changeEmailSpy.currentEmail).toBe(request.currentEmail)
      expect(changeEmailSpy.newEmail).toBe(request.newEmail)
    })

    test('Should return notFound if ChangeEmail throws AccountNotFoundError', async() => {
      const { sut, changeEmailSpy } = makeSut()
      jest.spyOn(changeEmailSpy, 'change').mockRejectedValueOnce(new AccountNotFoundError())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
    })

    test('Should return conflict if ChangeEmail throws AccountAlreadyExistsError', async() => {
      const { sut, changeEmailSpy } = makeSut()
      jest.spyOn(changeEmailSpy, 'change').mockRejectedValueOnce(new AccountAlreadyExistsError())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.conflict(new AccountAlreadyExistsError()))
    })

    test('Should return serverError if ChangeEmail throws', async() => {
      const { sut, changeEmailSpy } = makeSut()
      jest.spyOn(changeEmailSpy, 'change').mockRejectedValueOnce(new Error())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.serverError())
    })

    test('Should return ok on success', async() => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.ok({ message: 'Email successfully changed' }))
    })
  })
})
