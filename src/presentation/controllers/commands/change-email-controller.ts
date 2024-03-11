import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeEmail } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class ChangeEmailController implements Controller {
  constructor(private readonly changeEmail: ChangeEmail) {}

  public async handle(request: ChangeEmailController.Request): Promise<HttpResponse> {
    try {
      await this.changeEmail.change(request.currentEmail, request.newEmail)
      return HttpHelper.ok({})
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      return HttpHelper.serverError()
    }
  }
}

export namespace ChangeEmailController {
  export interface Request {
    currentEmail: string
    newEmail: string
  }
}
