import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { type ChangeEmail } from '@/domain/usecases/commands'
import { AccountNotFoundError, AccountAlreadyExistsError } from '@/domain/errors'

export class ChangeEmailController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly changeEmail: ChangeEmail
  ) {}

  public async handle(request: ChangeEmailController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.changeEmail.change(request.currentEmail, request.newEmail)
      return HttpHelper.ok({ message: 'Email successfully changed' })
    } catch (error) {
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      if (error instanceof AccountAlreadyExistsError) {
        return HttpHelper.conflict(error)
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
