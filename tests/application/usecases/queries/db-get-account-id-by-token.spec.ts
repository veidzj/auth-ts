import { faker } from '@faker-js/faker'

import { DecrypterSpy } from '@/tests/application/mocks/cryptography'
import { GetAccountIdByTokenRepositorySpy } from '@/tests/application/mocks/queries'
import { DbGetAccountIdByToken } from '@/application/usecases/queries'
import { type GetAccountIdByToken } from '@/domain/usecases/queries'
import { AccessDeniedError, InvalidCredentialsError } from '@/domain/errors'

interface Sut {
  sut: DbGetAccountIdByToken
  decrypterSpy: DecrypterSpy
  getAccountIdByTokenRepositorySpy: GetAccountIdByTokenRepositorySpy
}

const makeSut = (): Sut => {
  const decrypterSpy = new DecrypterSpy()
  const getAccountIdByTokenRepositorySpy = new GetAccountIdByTokenRepositorySpy()
  const sut = new DbGetAccountIdByToken(decrypterSpy, getAccountIdByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    getAccountIdByTokenRepositorySpy
  }
}

const mockGetAccountIdByTokenInput = (): GetAccountIdByToken.Input => ({
  accessToken: faker.string.uuid(),
  role: faker.word.words()
})

describe('DbGetAccountIdByToken', () => {
  describe('Decrypter', () => {
    test('Should call Decrypter with correct value', async() => {
      const { sut, decrypterSpy } = makeSut()
      const getAccountIdByTokenInput = mockGetAccountIdByTokenInput()
      await sut.get(getAccountIdByTokenInput)
      expect(decrypterSpy.cipherText).toBe(getAccountIdByTokenInput.accessToken)
    })

    test('Should throw InvalidCredentialsError if Decrypter throws', async() => {
      const { sut, decrypterSpy } = makeSut()
      jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(new Error())
      const promise = sut.get(mockGetAccountIdByTokenInput())
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
  })

  describe('GetAccountIdByTokenRepository', () => {
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

    test('Should return accountId on success', async() => {
      const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
      const accountId = await sut.get(mockGetAccountIdByTokenInput())
      expect(accountId).toEqual(getAccountIdByTokenRepositorySpy.output)
    })
  })
})
