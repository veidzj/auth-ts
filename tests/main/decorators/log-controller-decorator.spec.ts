import { faker } from '@faker-js/faker'

import { ControllerSpy } from '@/tests/presentation/mocks'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

interface Sut {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
}

const makeSut = (): Sut => {
  const controllerSpy = new ControllerSpy()
  const sut = new LogControllerDecorator(controllerSpy)
  return {
    sut,
    controllerSpy
  }
}

const mockRequest = (): object => ({
  field: faker.word.words()
})

describe('LogControllerDecorator', () => {
  describe('Controller', () => {
    test('Should call Controller with correct values', async() => {
      const { sut, controllerSpy } = makeSut()
      const request = mockRequest()
      await sut.handle(request)
      expect(controllerSpy.request).toEqual(request)
    })

    test('Should return the same result of the controller', async() => {
      const { sut, controllerSpy } = makeSut()
      const httpResponse = await sut.handle(mockRequest())
      expect(httpResponse).toEqual(controllerSpy.httpResponse)
    })
  })
})
