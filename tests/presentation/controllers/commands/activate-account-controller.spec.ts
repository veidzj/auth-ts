import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { ActivateAccountSpy } from '@/tests/domain/mocks/commands'
import { ActivateAccountController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { AccountNotFoundError, AccountAlreadyActivatedError } from '@/domain/errors'

interface Sut {
  sut: ActivateAccountController
  validationSpy: ValidationSpy
  activateAccountSpy: ActivateAccountSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const activateAccountSpy = new ActivateAccountSpy()
  const sut = new ActivateAccountController(validationSpy, activateAccountSpy)
  return {
    sut,
    validationSpy,
    activateAccountSpy
  }
}

const mockRequest = (): ActivateAccountController.Request => ({
  accountId: faker.string.uuid()
})

describe('ActivateAccountController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct value', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(validationSpy.input).toEqual(request)
    })
  })

  describe('ActivateAccount', () => {
    test('Should call ActivateAccount with correct value', async() => {
      const { sut, activateAccountSpy } = makeSut()
      const request = mockRequest()

      await sut.handle(request)

      expect(activateAccountSpy.accountId).toBe(request.accountId)
    })

    test('Should return notFound if ActivateAccount throws AccountNotFoundError', async() => {
      const { sut, activateAccountSpy } = makeSut()
      jest.spyOn(activateAccountSpy, 'activate').mockRejectedValueOnce(new AccountNotFoundError())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
    })

    test('Should return conflict if ActivateAccount throws AccountAlreadyActivatedError', async() => {
      const { sut, activateAccountSpy } = makeSut()
      jest.spyOn(activateAccountSpy, 'activate').mockRejectedValueOnce(new AccountAlreadyActivatedError())

      const httpResponse = await sut.handle(mockRequest())

      expect(httpResponse).toEqual(HttpHelper.conflict(new AccountAlreadyActivatedError()))
    })

    test('Should return serverError if ActivateAccount throws', async() => {
      const { sut, activateAccountSpy } = makeSut()
      jest.spyOn(activateAccountSpy, 'activate').mockRejectedValueOnce(new Error())

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
