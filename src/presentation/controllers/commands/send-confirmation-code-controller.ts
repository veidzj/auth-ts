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
      const insertedId = await this.sendConfirmationCode.send(request.email, request.accountId)
      return HttpHelper.ok({
        insertedId,
        message: `Confirmation code successfully sent to ${request.email}`
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      return HttpHelper.serverError(error as Error)
    }
  }
}

export namespace SendConfirmationCodeController {
  export interface Request {
    email: string
    accountId: string
  }
}
