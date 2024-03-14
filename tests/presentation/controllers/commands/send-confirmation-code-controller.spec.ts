import { SendConfirmationCodeController } from '@/presentation/controllers/commands'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { faker } from '@faker-js/faker'

const mockRequest = (): object => ({
  email: faker.internet.email()
})

describe('SendConfirmationCodeController', () => {
  test('Should call Validation with correct values', async() => {
    const validationSpy = new ValidationSpy()
    const sut = new SendConfirmationCodeController(validationSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })
})
