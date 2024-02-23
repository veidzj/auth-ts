import { faker } from '@faker-js/faker'

import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { HashComparerSpy, EncrypterSpy } from '@/tests/application/mocks/cryptography'
import { DbAuthentication } from '@/application/usecases/queries'
import { type Authentication } from '@/domain/usecases/queries'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
  }
}

const mockAuthenticationInput = (): Authentication.Input => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('DbAuthentication', () => {
  describe('GetAccountByEmailRepository', () => {
    test('Should call GetAccountByEmailRepository with correct email', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(getAccountByEmailRepositorySpy.email).toBe(authenticationInput.email)
    })

    test('Should throw AccountNotFoundError if GetAccountByEmailRepository returns null', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      getAccountByEmailRepositorySpy.output = null
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if GetAccountByEmailRepository throws', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(getAccountByEmailRepositorySpy, 'get').mockRejectedValueOnce(new Error())
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('HashComparer', () => {
    test('Should call HashComparer with correct values', async() => {
      const { sut, getAccountByEmailRepositorySpy, hashComparerSpy } = makeSut()
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(hashComparerSpy.plainText).toBe(authenticationInput.password)
      expect(hashComparerSpy.digest).toBe(getAccountByEmailRepositorySpy.output?.password)
    })

    test('Should throw InvalidCredentialsError if HashComparer returns false', async() => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.output = false
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw if HashComparer throws', async() => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockRejectedValueOnce(new Error())
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Encrypter', () => {
    test('Should call Encrypter with correct value', async() => {
      const { sut, getAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
      await sut.auth(mockAuthenticationInput())
      expect(encrypterSpy.plainText).toBe(getAccountByEmailRepositorySpy.output?.id)
    })

    test('Should throw if Encrypter throws', async() => {
      const { sut, encrypterSpy } = makeSut()
      jest.spyOn(encrypterSpy, 'encrypt').mockRejectedValueOnce(new Error())
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
