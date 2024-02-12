import { faker } from '@faker-js/faker'

import { AddAccountRepositorySpy } from '@/tests/application/mocks/commands'
import { DbAddAccount } from '@/application/usecases/commands'
import { type AddAccount } from '@/domain/usecases/commands'

interface Sut {
  sut: DbAddAccount
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): Sut => {
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(addAccountRepositorySpy)
  return {
    sut,
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
