import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type DeactivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyDeactivatedError } from '@/domain/errors'

export class DeactivateAccountController implements Controller {
  constructor(private readonly deactivateAccount: DeactivateAccount) {}

  public async handle(request: DeactivateAccountController.Request): Promise<HttpResponse> {
    try {
      await this.deactivateAccount.deactivate(request)
      return HttpHelper.ok({})
    } catch (error) {
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
