import { faker } from '@faker-js/faker'

import { ActivateAccountSpy } from '@/tests/domain/mocks/commands'
import { ActivateAccountController } from '@/presentation/controllers/commands'

interface Sut {
  sut: ActivateAccountController
  activateAccountSpy: ActivateAccountSpy
}

const makeSut = (): Sut => {
  const activateAccountSpy = new ActivateAccountSpy()
  const sut = new ActivateAccountController(activateAccountSpy)
  return {
    sut,
    activateAccountSpy
  }
}

const mockRequest = (): ActivateAccountController.Request => ({
  accountId: faker.string.uuid()
})

describe('ActivateAccountController', () => {
  test('Should call ActivateAccount with correct value', async() => {
    const { sut, activateAccountSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(activateAccountSpy.accountId).toBe(request.accountId)
  })
})
