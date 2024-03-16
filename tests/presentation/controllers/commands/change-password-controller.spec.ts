import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { ChangePasswordController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

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

    test('Should return badRequest if Validation throws ValidationError', async() => {
      const validationSpy = new ValidationSpy()
      const sut = new ChangePasswordController(validationSpy)
      const errorMessage = faker.word.words()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
    })
  })
})
