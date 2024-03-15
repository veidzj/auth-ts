import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type DeactivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyDeactivatedError } from '@/domain/errors'

export class DeactivateAccountController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly deactivateAccount: DeactivateAccount
  ) {}

  public async handle(request: DeactivateAccountController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.deactivateAccount.deactivate(request.accountId)
      return HttpHelper.noContent()
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      if (error instanceof AccountAlreadyDeactivatedError) {
        return HttpHelper.conflict(error)
      }
      return HttpHelper.serverError()
    }
  }
}

export namespace DeactivateAccountController {
  export interface Request {
    accountId: string
  }
}
