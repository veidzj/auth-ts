import { faker } from '@faker-js/faker'

import { ActivateAccountSpy } from '@/tests/domain/mocks/commands'
import { ActivateAccountController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: ActivateAccountController
  activateAccountSpy: ActivateAccountSpy
}

const makeSut = (): Sut => {
  const activateAccountSpy = new ActivateAccountSpy()
  const sut = new ActivateAccountController(activateAccountSpy)
  return {
    sut,
    activateAccountSpy
  }
}

const mockRequest = (): ActivateAccountController.Request => ({
  accountId: faker.string.uuid()
})

describe('ActivateAccountController', () => {
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

  test('Should return serverError if ActivateAccount throws', async() => {
    const { sut, activateAccountSpy } = makeSut()
    jest.spyOn(activateAccountSpy, 'activate').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })
})
