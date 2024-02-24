import { type Validation, type Controller, type HttpResponse } from '@/presentation/protocols'
import { HttpHelper } from '@/presentation/helpers'
import { ValidationError } from '@/validation/errors'
import { type AddAccount } from '@/domain/usecases/commands'
import { type Authentication } from '@/domain/usecases/queries'
import { AccountAlreadyExists } from '@/domain/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  public async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.validation.validate(request)
      await this.addAccount.add(request)
      await this.authentication.auth({ email: request.email, password: request.password })
      return HttpHelper.ok({})
    } catch (error) {
      if (error instanceof ValidationError) {
        return HttpHelper.badRequest(error)
      }
      if (error instanceof AccountAlreadyExists) {
        return HttpHelper.conflict(error)
      }
      return HttpHelper.serverError()
    }
  }
}

export namespace SignUpController {
  export interface Request {
    username: string
    fullName: string
    email: string
    password: string
    birthdate: string
    profileImage?: string
  }
}
