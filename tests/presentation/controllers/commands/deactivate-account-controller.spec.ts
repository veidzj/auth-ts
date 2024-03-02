import { faker } from '@faker-js/faker'

import { DeactivateAccountController } from '@/presentation/controllers/commands'
import { type DeactivateAccount } from '@/domain/usecases/commands'

const mockRequest = (): DeactivateAccountController.Request => ({
  accountId: faker.string.uuid()
})

describe('DeactivateAccountController', () => {
  test('Should call DeactivateAccount with correct value', async() => {
    class DeactivateAccountSpy implements DeactivateAccount {
      public input: DeactivateAccount.Input

      public async deactivate(input: DeactivateAccount.Input): Promise<void> {
        this.input = input
      }
    }
    const deactivateAccountSpy = new DeactivateAccountSpy()
    const sut = new DeactivateAccountController(deactivateAccountSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(deactivateAccountSpy.input).toEqual(request)
  })
})
