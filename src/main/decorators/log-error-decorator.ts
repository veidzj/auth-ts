import { type Decorator, type Controller, type Middleware, type HttpResponse } from '@/presentation/protocols'
import { type LogErrorRepository } from '@/application/protocols/commands'

export class LogErrorDecorator implements Decorator {
  constructor(
    private readonly requestHandler: Controller | Middleware,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  public async handle(request: object): Promise<HttpResponse> {
    const httpResponse = await this.requestHandler.handle(request)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.log(httpResponse.body.stack as string)
    }
    return httpResponse
  }
}
