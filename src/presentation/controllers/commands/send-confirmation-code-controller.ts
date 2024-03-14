import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'

export class SendConfirmationCodeController implements Controller {
  constructor(private readonly validation: Validation) {}

  public async handle(request: object): Promise<HttpResponse> {
    this.validation.validate(request)
    return HttpHelper.ok({})
  }
}
