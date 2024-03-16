import { faker } from '@faker-js/faker'

import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

const mockRequest = (): object => ({
  field: faker.word.words()
})

describe('LogControllerDecorator', () => {
  describe('Controller', () => {
    test('Should call Controller with correct values', async() => {
      class ControllerSpy implements Controller {
        public request: object
        public httpResponse = HttpHelper.ok({ message: faker.word.words() })

        async handle(request: object): Promise<HttpResponse> {
          this.request = request
          return this.httpResponse
        }
      }
      const controllerSpy = new ControllerSpy()
      const sut = new LogControllerDecorator(controllerSpy)
      const request = mockRequest()
      await sut.handle(request)
      expect(controllerSpy.request).toEqual(request)
    })
  })
})
