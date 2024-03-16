import { faker } from '@faker-js/faker'

import { HttpHelper } from '@/presentation/helpers'
import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class ControllerSpy implements Controller {
  public request: object
  public httpResponse = HttpHelper.ok({ message: faker.word.words() })

  async handle(request: object): Promise<HttpResponse> {
    this.request = request
    return this.httpResponse
  }
}
