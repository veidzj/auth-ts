import { faker } from '@faker-js/faker'

import { AuthMiddleware } from '@/presentation/middlewares'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: faker.string.uuid()
})

describe('AuthMiddleware', () => {
  test('Should call GetAccountIdByToken with correct values', async() => {
    class GetAccountIdByTokenSpy implements GetAccountIdByToken {
      public input: GetAccountIdByToken.Input
      public output: GetAccountIdByToken.Output

      public async get(input: GetAccountIdByToken.Input): Promise<GetAccountIdByToken.Output> {
        this.input = input
        return this.output
      }
    }
    const getAccountIdByTokenSpy = new GetAccountIdByTokenSpy()
    const role = faker.word.words()
    const sut = new AuthMiddleware(getAccountIdByTokenSpy, role)
    const request = mockRequest()
    await sut.handle(request)
    expect(getAccountIdByTokenSpy.input.accessToken).toBe(request.accessToken)
    expect(getAccountIdByTokenSpy.input.role).toBe(role)
  })
})
