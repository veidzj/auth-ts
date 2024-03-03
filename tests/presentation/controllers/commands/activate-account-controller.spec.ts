import { faker } from '@faker-js/faker'

import { type ActivateAccount } from '@/domain/usecases/commands'
import { ActivateAccountController } from '@/presentation/controllers/commands'

const mockRequest = (): ActivateAccountController.Request => ({
  accountId: faker.string.uuid()
})

describe('ActivateAccountController', () => {
  test('Should call ActivateAccount with correct value', async() => {
    class ActivateAccountSpy implements ActivateAccount {
      public accountId: string

      public async activate(accountId: string): Promise<void> {
        this.accountId = accountId
      }
    }
    const activateAccountSpy = new ActivateAccountSpy()
    const sut = new ActivateAccountController(activateAccountSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(activateAccountSpy.accountId).toBe(request.accountId)
  })
})
