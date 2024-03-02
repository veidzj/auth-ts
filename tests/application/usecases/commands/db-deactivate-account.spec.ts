import { faker } from '@faker-js/faker'

import { DeactivateAccountRepositorySpy } from '@/tests/application/mocks/commands'
import { DbDeactivateAccount } from '@/application/usecases/commands'
import { type DeactivateAccount } from '@/domain/usecases/commands'

interface Sut {
  sut: DbDeactivateAccount
  deactivateAccountRepositorySpy: DeactivateAccountRepositorySpy
}

const makeSut = (): Sut => {
  const deactivateAccountRepositorySpy = new DeactivateAccountRepositorySpy()
  const sut = new DbDeactivateAccount(deactivateAccountRepositorySpy)
  return {
    sut,
    deactivateAccountRepositorySpy
  }
}

const mockInput = (): DeactivateAccount.Input => ({
  accountId: faker.string.uuid()
})

describe('DbDeactivateAccount', () => {
  test('Should call DeactivateAccountRepository with correct value', async() => {
    const { sut, deactivateAccountRepositorySpy } = makeSut()
    const input = mockInput()
    await sut.deactivate(input)
    expect(deactivateAccountRepositorySpy.input).toEqual(input)
  })
})
