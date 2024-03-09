import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type Authentication } from '@/domain/usecases/commands'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors'

export class SignInController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  public async handle(request: SignInController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      const accessToken = await this.authentication.auth(request.email, request.password)
      return HttpHelper.ok({ accessToken })
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountNotFoundError) {
        return HttpHelper.notFound(error)
      }
      if (error instanceof InvalidCredentialsError) {
        return HttpHelper.unauthorized(error)
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
