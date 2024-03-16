import { type Controller, type HttpResponse, type Validation } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'

export class ChangePasswordController implements Controller {
  constructor(
    private readonly validation: Validation
  ) {}

  public async handle(request: ChangePasswordController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      return HttpHelper.noContent()
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
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
