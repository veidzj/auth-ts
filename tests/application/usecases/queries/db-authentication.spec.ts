import { faker } from '@faker-js/faker'

import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { HashComparerSpy } from '@/tests/application/mocks/cryptography'
import { DbAuthentication } from '@/application/usecases/queries'
import { type Authentication } from '@/domain/usecases/queries'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy, hashComparerSpy)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy
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
  })
})
