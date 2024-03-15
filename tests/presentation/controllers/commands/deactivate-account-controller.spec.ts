import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { DeactivateAccountSpy } from '@/tests/domain/mocks/commands'
import { DeactivateAccountController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { AccountNotFoundError, AccountAlreadyDeactivatedError } from '@/domain/errors'

interface Sut {
  sut: DeactivateAccountController
  validationSpy: ValidationSpy
  deactivateAccountSpy: DeactivateAccountSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const deactivateAccountSpy = new DeactivateAccountSpy()
  const sut = new DeactivateAccountController(validationSpy, deactivateAccountSpy)
  return {
    sut,
    validationSpy,
    deactivateAccountSpy
  }
}

const mockRequest = (): DeactivateAccountController.Request => ({
  accountId: faker.string.uuid()
})

describe('DeactivateAccountController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct value', async() => {
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

  describe('DeactivateAccount', () => {
    test('Should call DeactivateAccount with correct value', async() => {
      const { sut, deactivateAccountSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(deactivateAccountSpy.accountId).toBe(request.accountId)
    })

    test('Should return notFound if DeactivateAccount throws AccountNotFoundError', async() => {
      const { sut, deactivateAccountSpy } = makeSut()
      jest.spyOn(deactivateAccountSpy, 'deactivate').mockRejectedValueOnce(new AccountNotFoundError())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
    })

    test('Should return conflict if DeactivateAccount throws AccountAlreadyDeactivatedError', async() => {
      const { sut, deactivateAccountSpy } = makeSut()
      jest.spyOn(deactivateAccountSpy, 'deactivate').mockRejectedValueOnce(new AccountAlreadyDeactivatedError())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.conflict(new AccountAlreadyDeactivatedError()))
    })

    test('Should return serverError if DeactivateAccount throws', async() => {
      const { sut, deactivateAccountSpy } = makeSut()
      jest.spyOn(deactivateAccountSpy, 'deactivate').mockRejectedValueOnce(new Error())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.serverError())
    })

    test('Should return noContent on success', async() => {
      const { sut } = makeSut()

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.noContent())
    })
  })
})
