import { ChangeProfileImageController } from '@/presentation/controllers/commands'
import { HttpHelper } from '@/presentation/helpers'

describe('ChangeProfileImageController', () => {
  test('Should return noContent on success', async() => {
    const sut = new ChangeProfileImageController()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(HttpHelper.noContent())
  })
})
