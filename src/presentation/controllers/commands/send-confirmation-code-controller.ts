import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

export class SendConfirmationCodeController implements Controller {
  constructor(private readonly validation: Validation) {}

  public async handle(request: object): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      return HttpHelper.ok({})
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      return HttpHelper.serverError()
    }
  }
}
