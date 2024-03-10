import { faker } from '@faker-js/faker'

import { ChangeEmailController } from '@/presentation/controllers/commands'
import { type ChangeEmail } from '@/domain/usecases/commands'

const mockRequest = (): ChangeEmailController.Request => ({
  currentEmail: faker.internet.email(),
  newEmail: faker.internet.email()
})

describe('ChangeEmailController', () => {
  test('Should call ChangeEmail with correct values', async() => {
    class ChangeEmailSpy implements ChangeEmail {
      public currentEmail: string
      public newEmail: string

      public async change(currentEmail: string, newEmail: string): Promise<void> {
        this.currentEmail = currentEmail
        this.newEmail = newEmail
      }
    }
    const changeEmailSpy = new ChangeEmailSpy()
    const sut = new ChangeEmailController(changeEmailSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(changeEmailSpy.currentEmail).toBe(request.currentEmail)
    expect(changeEmailSpy.newEmail).toBe(request.newEmail)
  })
})
