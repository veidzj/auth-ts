import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type ChangeEmail } from '@/domain/usecases/commands'
import { AccountAlreadyExistsError } from '@/domain/errors'

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
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
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
