import { faker } from '@faker-js/faker'

import { ChangeProfileImageController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeProfileImage } from '@/domain/usecases/commands'

const mockRequest = (): ChangeProfileImageController.Request => ({
  accountId: faker.string.uuid(),
  newProfileImage: faker.internet.url()
})

describe('ChangeProfileImageController', () => {
  test('Should call ChangeProfileImage with correct values', async() => {
    class ChangeProfileImageSpy implements ChangeProfileImage {
      public accountId: string
      public newProfileImage: string

      public async change(accountId: string, newProfileImage: string): Promise<void> {
        this.accountId = accountId
        this.newProfileImage = newProfileImage
      }
    }
    const changeProfileImageSpy = new ChangeProfileImageSpy()
    const sut = new ChangeProfileImageController(changeProfileImageSpy)
    const request = mockRequest()
    const httpResponse = await sut.handle(request)
    expect(httpResponse).toEqual(HttpHelper.noContent())
    expect(changeProfileImageSpy.accountId).toBe(request.accountId)
    expect(changeProfileImageSpy.newProfileImage).toBe(request.newProfileImage)
  })

  test('Should return noContent on success', async() => {
    class ChangeProfileImageSpy implements ChangeProfileImage {
      public accountId: string
      public newProfileImage: string

      public async change(accountId: string, newProfileImage: string): Promise<void> {
        this.accountId = accountId
        this.newProfileImage = newProfileImage
      }
    }
    const changeProfileImageSpy = new ChangeProfileImageSpy()
    const sut = new ChangeProfileImageController(changeProfileImageSpy)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(HttpHelper.noContent())
  })
})
