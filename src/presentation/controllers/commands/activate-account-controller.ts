import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ActivateAccount } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class ActivateAccountController implements Controller {
  constructor(private readonly activateAccount: ActivateAccount) {}

  public async handle(request: ActivateAccountController.Request): Promise<HttpResponse> {
    try {
      await this.activateAccount.activate(request.accountId)
      return HttpHelper.ok({ message: 'Account successfully activated' })
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
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
