import { faker } from '@faker-js/faker'

import { GetAccountIdByTokenRepositorySpy } from '@/tests/application/mocks/queries'
import { DbGetAccountIdByToken } from '@/application/usecases/queries'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'

interface Sut {
  sut: DbGetAccountIdByToken
  getAccountIdByTokenRepositorySpy: GetAccountIdByTokenRepositorySpy
}

const makeSut = (): Sut => {
  const getAccountIdByTokenRepositorySpy = new GetAccountIdByTokenRepositorySpy()
  const sut = new DbGetAccountIdByToken(getAccountIdByTokenRepositorySpy)
  return {
    sut,
    getAccountIdByTokenRepositorySpy
  }
}

const mockGetAccountIdByTokenInput = (): GetAccountIdByToken.Input => ({
  accessToken: faker.string.uuid(),
  role: faker.word.words()
})

describe('DbGetAccountIdByToken', () => {
  test('Should call GetAccountIdByTokenRepository with correct values', async() => {
    const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
    const getAccountIdByTokenInput = mockGetAccountIdByTokenInput()
    await sut.get(getAccountIdByTokenInput)
    expect(getAccountIdByTokenRepositorySpy.input).toEqual(getAccountIdByTokenInput)
  })
})
