import { faker } from '@faker-js/faker'

import { GetAccountIdByTokenRepositorySpy } from '@/tests/application/mocks/queries'
import { DbGetAccountIdByToken } from '@/application/usecases/queries'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'
import { AccessDeniedError } from '@/domain/errors'

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

  test('Should throw AccessDeniedError if GetAccountIdByTokenRepository returns null', async() => {
    const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
    getAccountIdByTokenRepositorySpy.output = null
    const promise = sut.get(mockGetAccountIdByTokenInput())
    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  test('Should throw if GetAccountIdByTokenRepository throws', async() => {
    const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
    jest.spyOn(getAccountIdByTokenRepositorySpy, 'get').mockRejectedValueOnce(new Error())
    const promise = sut.get(mockGetAccountIdByTokenInput())
    await expect(promise).rejects.toThrow()
  })
})
