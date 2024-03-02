import { faker } from '@faker-js/faker'

import { DbDeactivateAccount } from '@/application/usecases/commands'
import { type DeactivateAccountRepository } from '@/application/protocols/commands'
import { type DeactivateAccount } from '@/domain/usecases/commands'

const mockInput = (): DeactivateAccount.Input => ({
  accountId: faker.string.uuid()
})

describe('DbDeactivateAccount', () => {
  test('Should call DeactivateAccountRepository with correct value', async() => {
    class DeactivateAccountRepositorySpy implements DeactivateAccountRepository {
      public input: DeactivateAccountRepository.Input

      public async deactivate(input: DeactivateAccountRepository.Input): Promise<void> {
        this.input = input
      }
    }
    const deactivateAccountRepositorySpy = new DeactivateAccountRepositorySpy()
    const sut = new DbDeactivateAccount(deactivateAccountRepositorySpy)
    const input = mockInput()
    await sut.deactivate(input)
    expect(deactivateAccountRepositorySpy.input).toEqual(input)
  })
})
