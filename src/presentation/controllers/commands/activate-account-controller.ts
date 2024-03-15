import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type ActivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyActivatedError } from '@/domain/errors'

export class ActivateAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly activateAccount: ActivateAccount
  ) {}

  public async handle(request: ActivateAccountController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.activateAccount.activate(request.accountId)
      return HttpHelper.noContent()
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      if (error instanceof AccountAlreadyActivatedError) {
        return HttpHelper.conflict(error)
      }
      return HttpHelper.serverError()
    }
  }
}

export namespace ActivateAccountController {
  export interface Request {
    accountId: string
  }
}
