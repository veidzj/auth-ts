import { faker } from '@faker-js/faker'

import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { HashComparerSpy, EncrypterSpy } from '@/tests/application/mocks/cryptography'
import { UpdateAccessTokenRepositorySpy } from '@/tests/application/mocks/commands'
import { DbAuthentication } from '@/application/usecases/queries'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

const email: string = faker.internet.email()
const password: string = faker.internet.password()

describe('DbAuthentication', () => {
  describe('GetAccountByEmailRepository', () => {
    test('Should call GetAccountByEmailRepository with correct email', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      await sut.auth(email, password)
      expect(getAccountByEmailRepositorySpy.email).toBe(email)
    })

    test('Should throw AccountNotFoundError if GetAccountByEmailRepository returns null', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      getAccountByEmailRepositorySpy.output = null
      const promise = sut.auth(email, password)
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if GetAccountByEmailRepository throws', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(getAccountByEmailRepositorySpy, 'get').mockRejectedValueOnce(new Error())
      const promise = sut.auth(email, password)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('HashComparer', () => {
    test('Should call HashComparer with correct values', async() => {
      const { sut, getAccountByEmailRepositorySpy, hashComparerSpy } = makeSut()
      await sut.auth(email, password)
      expect(hashComparerSpy.plainText).toBe(password)
      expect(hashComparerSpy.digest).toBe(getAccountByEmailRepositorySpy.output?.password)
    })

    test('Should throw InvalidCredentialsError if HashComparer returns false', async() => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.output = false
      const promise = sut.auth(email, password)
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw if HashComparer throws', async() => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockRejectedValueOnce(new Error())
      const promise = sut.auth(email, password)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Encrypter', () => {
    test('Should call Encrypter with correct value', async() => {
      const { sut, getAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
      await sut.auth(email, password)
      expect(encrypterSpy.plainText).toBe(getAccountByEmailRepositorySpy.output?.id)
    })

    test('Should throw if Encrypter throws', async() => {
      const { sut, encrypterSpy } = makeSut()
      jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())
      const promise = sut.auth(email, password)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('UpdateAccessTokenRepository', () => {
    test('Should call UpdateAccessTokenRepository with correct values', async() => {
      const { sut, getAccountByEmailRepositorySpy, encrypterSpy, updateAccessTokenRepositorySpy } = makeSut()
      await sut.auth(email, password)
      expect(encrypterSpy.plainText).toBe(getAccountByEmailRepositorySpy.output?.id)
      expect(updateAccessTokenRepositorySpy.id).toBe(getAccountByEmailRepositorySpy.output?.id)
      expect(updateAccessTokenRepositorySpy.accessToken).toBe(encrypterSpy.cipherText)
    })

    test('Should throw if UpdateAccessTokenRepository throws', async() => {
      const { sut, updateAccessTokenRepositorySpy } = makeSut()
      jest.spyOn(updateAccessTokenRepositorySpy, 'update').mockRejectedValueOnce(new Error())
      const promise = sut.auth(email, password)
      await expect(promise).rejects.toThrow()
    })

    test('Should return accessToken on success', async() => {
      const { sut, encrypterSpy } = makeSut()
      const accessToken = await sut.auth(email, password)
      expect(accessToken).toBe(encrypterSpy.cipherText)
    })
  })
})
