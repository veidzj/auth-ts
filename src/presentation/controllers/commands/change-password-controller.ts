import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type ChangePassword } from '@/domain/usecases/commands'
import { AccountNotFoundError } from '@/domain/errors'

export class ChangePasswordController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly changePassword: ChangePassword
  ) {}

  public async handle(request: ChangePasswordController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.changePassword.change(request.email, request.newPassword)
      return HttpHelper.noContent()
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

export namespace ChangePasswordController {
  export interface Request {
    email: string
    newPassword: string
  }
}
