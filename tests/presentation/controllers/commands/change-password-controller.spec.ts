import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { ChangePasswordSpy } from '@/tests/domain/mocks/commands'
import { ChangePasswordController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

interface Sut {
  sut: ChangePasswordController
  validationSpy: ValidationSpy
  changePasswordSpy: ChangePasswordSpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const changePasswordSpy = new ChangePasswordSpy()
  const sut = new ChangePasswordController(validationSpy, changePasswordSpy)
  return {
    sut,
    validationSpy,
    changePasswordSpy
  }
}

const mockRequest = (): ChangePasswordController.Request => ({
  email: faker.internet.email(),
  newPassword: faker.internet.password()
})

describe('ChangePasswordController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })

    test('Should return badRequest if Validation throws ValidationError', async() => {
      const { sut, validationSpy } = makeSut()
      const errorMessage = faker.word.words()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new ValidationError(errorMessage) })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
    })

    test('Should return serverError if Validation throws', async() => {
      const { sut, validationSpy } = makeSut()
      jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
    })
  })

  describe('ChangePassword', () => {
    test('Should call ChangePassword with correct values', async() => {
      const { sut, changePasswordSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(changePasswordSpy.email).toBe(request.email)
      expect(changePasswordSpy.newPassword).toBe(request.newPassword)
    })
  })
})
