import { faker } from '@faker-js/faker'

import { DecrypterSpy } from '@/tests/application/mocks/cryptography'
import { GetAccountIdByTokenRepositorySpy } from '@/tests/application/mocks/queries'
import { DbGetAccountIdByToken } from '@/application/usecases/queries'
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

const accessToken: string = faker.string.uuid()
const role: string = faker.word.words()

describe('DbGetAccountIdByToken', () => {
  describe('Decrypter', () => {
    test('Should call Decrypter with correct value', async() => {
      const { sut, decrypterSpy } = makeSut()
      await sut.get(accessToken, role)
      expect(decrypterSpy.cipherText).toBe(accessToken)
    })

    test('Should throw InvalidCredentialsError if Decrypter throws', async() => {
      const { sut, decrypterSpy } = makeSut()
      jest.spyOn(decrypterSpy, 'decrypt').mockRejectedValueOnce(new Error())
      const promise = sut.get(accessToken, role)
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
  })

  describe('GetAccountIdByTokenRepository', () => {
    test('Should call GetAccountIdByTokenRepository with correct values', async() => {
      const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
      await sut.get(accessToken, role)
      expect(getAccountIdByTokenRepositorySpy.accessToken).toBe(accessToken)
      expect(getAccountIdByTokenRepositorySpy.role).toBe(role)
    })

    test('Should throw AccessDeniedError if GetAccountIdByTokenRepository returns null', async() => {
      const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
      getAccountIdByTokenRepositorySpy.accountId = null
      const promise = sut.get(accessToken, role)
      await expect(promise).rejects.toThrow(new AccessDeniedError())
    })

    test('Should throw if GetAccountIdByTokenRepository throws', async() => {
      const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
      jest.spyOn(getAccountIdByTokenRepositorySpy, 'get').mockRejectedValueOnce(new Error())
      const promise = sut.get(accessToken, role)
      await expect(promise).rejects.toThrow()
    })

    test('Should return accountId on success', async() => {
      const { sut, getAccountIdByTokenRepositorySpy } = makeSut()
      const accountId = await sut.get(accessToken, role)
      expect(accountId).toBe(getAccountIdByTokenRepositorySpy.accountId)
    })
  })
})
