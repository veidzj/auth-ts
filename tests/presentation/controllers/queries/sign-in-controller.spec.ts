import { faker } from '@faker-js/faker'

import { ValidationSpy } from '@/tests/presentation/mocks'
import { SignInController } from '@/presentation/controllers/queries'

const mockRequest = (): SignInController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

describe('SignInController', () => {
  test('Should call Validation with correct values', async() => {
    const validationSpy = new ValidationSpy()
    const sut = new SignInController(validationSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
