import { faker } from '@faker-js/faker'

import { CheckAccountByEmailRepositorySpy } from '@/tests/application/mocks/queries'
import { HasherSpy } from '@/tests/application/mocks/cryptography/hasher-mock'
import { AddAccountRepositorySpy } from '@/tests/application/mocks/commands'
import { DbAddAccount } from '@/application/usecases/commands'
import { type AddAccount } from '@/domain/usecases/commands'
import { AccountAlreadyExists } from '@/domain/errors'

interface Sut {
  sut: DbAddAccount
  hasherSpy: HasherSpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy, hasherSpy, addAccountRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
  }
}

const mockInput = (): AddAccount.Input => ({
  username: faker.internet.userName(),
  fullName: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  birthdate: faker.date.anytime(),
  profileImage: faker.internet.url()
})

describe('DbAddAccount', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      const input = mockInput()
      await sut.add(input)
      expect(checkAccountByEmailRepositorySpy.email).toEqual(input.email)
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'check').mockRejectedValueOnce(new Error())
      const promise = sut.add(mockInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw AccountAlreadyExists if CheckAccountByEmailRepository returns true', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = true
      const promise = sut.add(mockInput())
      await expect(promise).rejects.toThrow(new AccountAlreadyExists())
    })
  })

  describe('Hasher', () => {
    test('Should call Hasher with correct password', async() => {
      const { sut, hasherSpy } = makeSut()
      const input = mockInput()
      await sut.add(input)
      expect(hasherSpy.plainText).toBe(input.password)
    })

    test('Should throw if Hasher throws', async() => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockRejectedValueOnce(new Error())
      const input = mockInput()
      const promise = sut.add(input)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddAccountRepository', () => {
    test('Should call AddAccountRepository with correct values', async() => {
      const { sut, addAccountRepositorySpy } = makeSut()
      const input = mockInput()
      await sut.add(input)
      expect(addAccountRepositorySpy.input).toEqual(input)
    })

    test('Should throw if AddAccountRepository throws', async() => {
      const { sut, addAccountRepositorySpy } = makeSut()
      jest.spyOn(addAccountRepositorySpy, 'add').mockRejectedValueOnce(new Error())
      const promise = sut.add(mockInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
