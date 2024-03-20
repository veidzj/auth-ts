import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { ChangeProfileImageSpy } from '@/tests/domain/mocks/commands'
import { ChangeProfileImageController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { AccountNotFoundError } from '@/domain/errors'

interface Sut {
  sut: ChangeProfileImageController
  validationSpy: ValidationSpy
  changeProfileImageSpy: ChangeProfileImageSpy
}

const makeSut = (): Sut => {
  const changeProfileImageSpy = new ChangeProfileImageSpy()
  const validationSpy = new ValidationSpy()
  const sut = new ChangeProfileImageController(validationSpy, changeProfileImageSpy)
  return {
    sut,
    validationSpy,
    changeProfileImageSpy
  }
}

const mockRequest = (): ChangeProfileImageController.Request => ({
  accountId: faker.string.uuid(),
  newProfileImage: faker.internet.url()
})

describe('ChangeProfileImageController', () => {
  describe('Validation', () => {
    test('Should call Validation with correct values', async() => {
      const { sut, validationSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(validationSpy.input).toEqual(request)
    })
  })

  describe('ChangeProfileImage', () => {
    test('Should call ChangeProfileImage with correct values', async() => {
      const { sut, changeProfileImageSpy } = makeSut()
      const request = mockRequest()
      const httpResponse = await sut.handle(request)
      expect(httpResponse).toEqual(HttpHelper.noContent())
      expect(changeProfileImageSpy.accountId).toBe(request.accountId)
      expect(changeProfileImageSpy.newProfileImage).toBe(request.newProfileImage)
    })

    test('Should return notFound if ChangeProfileImage throws AccountNotFoundError', async() => {
      const { sut, changeProfileImageSpy } = makeSut()
      jest.spyOn(changeProfileImageSpy, 'change').mockRejectedValueOnce(new AccountNotFoundError())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.notFound(new AccountNotFoundError()))
    })

    test('Should return serverError if ChangeProfileImage throws', async() => {
      const { sut, changeProfileImageSpy } = makeSut()
      jest.spyOn(changeProfileImageSpy, 'change').mockRejectedValueOnce(new Error())
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.serverError(new Error()))
    })

    test('Should return noContent on success', async() => {
      const { sut } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(HttpHelper.noContent())
    })
  })
})
