import { faker } from '@faker-js/faker'

import { type GetAccountIdByTokenRepository } from '@/application/protocols/queries'
import { DbGetAccountIdByToken } from '@/application/usecases/queries'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'

const mockGetAccountIdByTokenInput = (): GetAccountIdByToken.Input => ({
  accessToken: faker.string.uuid(),
  role: faker.word.words()
})

describe('DbGetAccountIdByToken', () => {
  test('Should call GetAccountIdByTokenRepository with correct values', async() => {
    class GetAccountIdByTokenRepositorySpy implements GetAccountIdByTokenRepository {
      public input: GetAccountIdByTokenRepository.Input
      public output: GetAccountIdByTokenRepository.Output

      public async get(input: GetAccountIdByTokenRepository.Input): Promise<GetAccountIdByTokenRepository.Output> {
        this.input = input
        return this.output
      }
    }
    const getAccountIdByTokenRepositorySpy = new GetAccountIdByTokenRepositorySpy()
    const sut = new DbGetAccountIdByToken(getAccountIdByTokenRepositorySpy)
    const getAccountIdByTokenInput = mockGetAccountIdByTokenInput()
    await sut.get(getAccountIdByTokenInput)
    expect(getAccountIdByTokenRepositorySpy.input).toEqual(getAccountIdByTokenInput)
  })
})
