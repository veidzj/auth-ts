import { type Controller, type HttpResponse } from '@/presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor(private readonly controller: Controller) {}

  public async handle(request: object): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request)
    return httpResponse
  }
}
