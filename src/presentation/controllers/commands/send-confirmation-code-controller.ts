import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type SendConfirmationCode } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class SendConfirmationCodeController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly sendConfirmationCode: SendConfirmationCode
  ) {}

  public async handle(request: SendConfirmationCodeController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.sendConfirmationCode.send(request.email)
      return HttpHelper.ok({ message: `Confirmation code sent to ${request.email}` })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      return HttpHelper.serverError()
    }
  }
}

export namespace SendConfirmationCodeController {
  export interface Request {
    email: string
  }
}
