import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { ChangePasswordController } from '@/presentation/controllers/commands'

const mockRequest = (): ChangePasswordController.Request => ({
  email: faker.internet.email(),
  newPassword: faker.internet.password()
})

describe('ChangePasswordController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const validationSpy = new ValidationSpy()
      const sut = new ChangePasswordController(validationSpy)
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })
  })
})
