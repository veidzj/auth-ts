import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type Authentication } from '@/domain/usecases/queries'
import { AccountNotFoundError } from '@/domain/errors'

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  public async handle(request: SignInController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.authentication.auth(request)
      return HttpHelper.ok({})
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      return HttpHelper.serverError()
    }
  }
}

export namespace SignInController {
  export interface Request {
    email: string
    password: string
  }
}
