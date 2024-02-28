import { faker } from '@faker-js/faker'

import { GetAccountIdByTokenSpy } from '@/tests/domain/mocks/queries'
import { AuthMiddleware } from '@/presentation/middlewares'

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
  test('Should call GetAccountIdByToken with correct values', async() => {
    const role = faker.word.words()
    const { sut, getAccountIdByTokenSpy } = makeSut(role)
    const request = mockRequest()
    await sut.handle(request)
    expect(getAccountIdByTokenSpy.input.accessToken).toBe(request.accessToken)
    expect(getAccountIdByTokenSpy.input.role).toBe(role)
  })
})
