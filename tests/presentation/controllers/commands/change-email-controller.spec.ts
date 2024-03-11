import { faker } from '@faker-js/faker'

import { ChangeEmailSpy } from '@/tests/domain/mocks/commands'
import { ChangeEmailController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { AccountNotFoundError, AccountAlreadyExistsError } from '@/domain/errors'

interface Sut {
  sut: ChangeEmailController
  changeEmailSpy: ChangeEmailSpy
}

const makeSut = (): Sut => {
  const changeEmailSpy = new ChangeEmailSpy()
  const sut = new ChangeEmailController(changeEmailSpy)
  return {
    sut,
    changeEmailSpy
  }
}

const mockRequest = (): ChangeEmailController.Request => ({
  currentEmail: faker.internet.email(),
  newEmail: faker.internet.email()
})

describe('ChangeEmailController', () => {
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
})
