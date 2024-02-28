import { faker } from '@faker-js/faker'

import { GetAccountIdByTokenSpy } from '@/tests/domain/mocks/queries'
import { AuthMiddleware } from '@/presentation/middlewares'
import { HttpHelper } from '@/presentation/helpers'
import { InvalidCredentialsError } from '@/domain/errors'

interface Sut {
  sut: AuthMiddleware
  getAccountIdByTokenSpy: GetAccountIdByTokenSpy
}

const makeSut = (role: string = faker.word.words()): Sut => {
  const getAccountIdByTokenSpy = new GetAccountIdByTokenSpy()
  const sut = new AuthMiddleware(getAccountIdByTokenSpy, role)
  return {
    sut,
    getAccountIdByTokenSpy
  }
}

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.string.uuid()
})

describe('AuthMiddleware', () => {
  test('Should return unauthorized if accessToken is not provided', async() => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })

  test('Should call GetAccountIdByToken with correct values', async() => {
    const role = faker.word.words()
    const { sut, getAccountIdByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(getAccountIdByTokenSpy.input.accessToken).toBe(request.accessToken)
    expect(getAccountIdByTokenSpy.input.role).toBe(role)
  })

  test('Should return unauthorized if GetAccountIdByToken throws InvalidCredentialsError', async() => {
    const { sut, getAccountIdByTokenSpy } = makeSut()
    jest.spyOn(getAccountIdByTokenSpy, 'get').mockRejectedValueOnce(new InvalidCredentialsError())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.unauthorized(new InvalidCredentialsError()))
  })

  test('Should return serverError if GetAccountIdByToken throws', async() => {
    const { sut, getAccountIdByTokenSpy } = makeSut()
    jest.spyOn(getAccountIdByTokenSpy, 'get').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.serverError())
  })
})
