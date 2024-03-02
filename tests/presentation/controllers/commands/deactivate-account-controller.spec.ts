import { faker } from '@faker-js/faker'

import { DeactivateAccountSpy } from '@/tests/domain/mocks/commands'
import { DeactivateAccountController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: DeactivateAccountController
  deactivateAccountSpy: DeactivateAccountSpy
}

const makeSut = (): Sut => {
  const deactivateAccountSpy = new DeactivateAccountSpy()
  const sut = new DeactivateAccountController(deactivateAccountSpy)
  return {
    sut,
    deactivateAccountSpy
  }
}

const mockRequest = (): DeactivateAccountController.Request => ({
  accountId: faker.string.uuid()
})

describe('DeactivateAccountController', () => {
  test('Should call DeactivateAccount with correct value', async() => {
    const { sut, deactivateAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(deactivateAccountSpy.input).toEqual(request)
  })

  test('Should return notFound if DeactivateAccount throws AccountNotFoundError', async() => {
    const { sut, deactivateAccountSpy } = makeSut()
    jest.spyOn(deactivateAccountSpy, 'deactivate').mockRejectedValueOnce(new AccountNotFoundError())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
  })
})
